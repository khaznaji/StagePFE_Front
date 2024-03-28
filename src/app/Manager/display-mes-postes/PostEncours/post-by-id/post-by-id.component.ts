import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewCandidateByIdComponent } from 'src/app/Manager/gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { Candidature } from 'src/app/model/candidature.model';
import { PosteService } from 'src/app/service/poste.service';

@Component({
  selector: 'app-post-by-id',
  templateUrl: './post-by-id.component.html',
  styleUrls: ['./post-by-id.component.css']
})
export class PostByIdComponent implements OnInit{
  collaborateursEnAttente: number = 0;
  collaborateursAcceptees: number = 0;
  collaborateursRefusees: number = 0;
  filteredPostes: any[] = [];
  searchTerm: string = ''; 
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.loadPosteDetails(); 
      this.getCandidatsByPoste();
      this.getCandidatures();

      this.posteService.countCollaborateursEnAttente(this.postId).subscribe(count => {
        this.collaborateursEnAttente = count;
      });
  
      this.posteService.countCollaborateursAcceptees(this.postId).subscribe(count => {
        this.collaborateursAcceptees = count;
      });
  
      this.posteService.countCollaborateursRefusees(this.postId).subscribe(count => {
        this.collaborateursRefusees = count;
      });
      // Fetch post details when component initializes
    });
  }
  postId!: number;
  poste: any; 

  constructor(private route: ActivatedRoute , private posteService: PosteService ,public dialog: MatDialog ,  private modalService: BsModalService) {}
  private loadPosteDetails() {
    this.posteService.getPosteById(this.postId).subscribe(
      data => {
        this.poste = data;
        console.log('Poste details:', this.poste);
      },
      error => {
        console.error('Error loading poste details:', error);
      }
    );
  }
 
 
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  //gestion candidat 
  filterCandidats(): void {
    this.filteredPostes = this.candidats.filter(poste => poste.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
}
  candidats: any[] = [];
  getCandidatsByPoste(): void {
    this.posteService.getCandidatsByPosteId(this.postId)
      .subscribe(
        candidats => {
          this.candidats = candidats;
          console.log('Candidats:', this.candidats);
          this.filterCandidats();

        },
        error => {
          console.error('Erreur lors de la récupération des candidats:', error);
        }
      );
  }
  modalRef!: BsModalRef;
  openModal(candidatId: number): void {
    const initialState = {
      candidatId: candidatId
    };
    this.modalRef = this.modalService.show(ViewCandidateByIdComponent, { initialState });
  }
  
  openCandidatDetailModal(candidatId: number): void {
    this.posteService.getCollaborateurInfoById(candidatId).subscribe(candidat => {
      this.dialog.open(ViewCandidateByIdComponent, {
        width: '400px',
        data: candidat
      });
    });
  }
  
// pipeline 

//   onDrop(event: CdkDragDrop<string[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(event.previousContainer.data,
//                         event.container.data,
//                         event.previousIndex,
//                         event.currentIndex);
//       // Ici, vous pouvez implémenter la logique pour mettre à jour l'état du candidat
//       // en fonction de la colonne dans laquelle il a été déposé.
//     }
//  }
// onDrop(event: CdkDragDrop<string[]>) {
//   if (event.previousContainer === event.container) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   } else {
//     transferArrayItem(event.previousContainer.data,
//                       event.container.data,
//                       event.previousIndex,
//                       event.currentIndex);
//     // Récupérer l'ID du candidat depuis l'élément déposé
//     const candidatId = event.container.data[event.currentIndex];
//     // Déterminer le nouvel état en fonction de la colonne dans laquelle il a été déposé
//     let nouvelEtat: string;
//     if (event.container.id === 'acceptee') {
//       nouvelEtat = 'acceptee';
//     } else if (event.container.id === 'refusee') {
//       nouvelEtat = 'refusee';
//     } else {
//       nouvelEtat = 'enAttente';
//     }
//     // Appeler le service pour mettre à jour l'état du candidat
//     this.posteService.updateCandidatureState(candidatId, nouvelEtat)
//       .subscribe(
//         (response) => {
//           // Gérer la réponse si nécessaire
//           console.log('État du candidat mis à jour avec succès : ', response);
//         },
//         (error) => {
//           // Gérer les erreurs
//           console.error('Erreur lors de la mise à jour de l\'état du candidat : ', error);
//         }
//       );
//   }

// }

onDrop(event: CdkDragDrop<string[]>, newState: string) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    const candidatId = event.item.element.nativeElement.id; // Obtenez l'ID du candidat
    const posteId = /* Obtenez l'ID du poste */ this.postId;
    this.modifierEtatCandidature(candidatId, newState);
    this.getCandidatures();

    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
modifierEtatCandidature(collaborateurId: string, newState: string) {
  this.posteService.updateCandidatureState(collaborateurId, newState)
    .subscribe(
      (candidature: Candidature) => {
        console.log('État de la candidature mis à jour avec succès : ', candidature);
        this.getCandidatures();

        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions en fonction de la réponse
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'état de la candidature : ', error);
        // Gérer les erreurs
      }
    );
}
candidatures: any[] = [];
getCandidatures(): void {
  this.posteService.getAllCandidatures(this.postId)
    .subscribe(
      candidatures => {
        this.candidatures = candidatures;
        console.log('Candidatures:', this.candidatures);
        
      },
      error => {
        console.error('Erreur lors de la récupération des candidatures:', error);
      }
    );
}
}
