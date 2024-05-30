import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { PosteService } from 'src/app/service/poste.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Candidature } from 'src/app/model/candidature.model';
import { EtatPostulation } from 'src/app/model/etatpostulation.model';
import { Chart, registerables } from 'chart.js/auto';
import { EntretienService } from 'src/app/service/entretien.service';
import { EntretienRhService } from 'src/app/service/entretien-rh.service';
import { ViewCandidateByIdComponent } from '../gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { EntretienRhComponent } from '../gestion-poste-by-id/entretien-rh/entretien-rh.component';

@Component({
  selector: 'app-poste-archive-by-id',
  templateUrl: './poste-archive-by-id.component.html',
  styleUrls: ['./poste-archive-by-id.component.css'],
})
export class PosteArchiveByIdComponent implements OnInit {
  collaborateursEnAttente: number = 0;
  collaborateursAcceptees: number = 0;
  collaborateursRefusees: number = 0;
  filteredPostes: any[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.loadPosteDetails();
      this.getCandidatsByPoste();
      this.getCandidatures();
      this.AllCandidaturePreselectionne();
      this.EntretiensSpecifiques();
      this.EntretiensRhSpecifiques();

      this.posteService
        .countCollaborateursEnAttente(this.postId)
        .subscribe((count) => {
          this.collaborateursEnAttente = count;
        });

      this.posteService
        .countCollaborateursAcceptees(this.postId)
        .subscribe((count) => {
          this.collaborateursAcceptees = count;
        });

      this.posteService
        .countCollaborateursRefusees(this.postId)
        .subscribe((count) => {
          this.collaborateursRefusees = count;
        });
      // Fetch post details when component initializes
    });
  }
  postId!: number;
  poste: any;

  constructor(
    private route: ActivatedRoute,
    private posteService: PosteService,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private entretienService: EntretienService,
    private entretienRhService: EntretienRhService
  ) {
    Chart.register(...registerables);
  }
  private loadPosteDetails() {
    this.posteService.getPosteById(this.postId).subscribe(
      (data) => {
        this.poste = data;
        console.log('Poste details:', this.poste);
      },
      (error) => {
        console.error('Error loading poste details:', error);
      }
    );
  }

  getRandomColor(index: number) {
    const colors = [
      '#3498db',
      '#e74c3c',
      '#2ecc71',
      '#f39c12',
      '#9b59b6',
      '#34495e',
      '#1abc9c',
      '#d35400',
    ];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  //gestion candidat
  filterCandidats(): void {
    this.filteredPostes = this.candidats.filter((poste) =>
      poste.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  candidats: any[] = [];
  getCandidatsByPoste(): void {
    this.posteService.getCandidatsByPosteId(this.postId).subscribe(
      (candidats) => {
        this.candidats = candidats;
        console.log('Candidats:', this.candidats);
        this.filterCandidats();
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidats:', error);
      }
    );
  }
  modalRef!: BsModalRef;
  openModal(candidatId: number): void {
    const initialState = {
      candidatId: candidatId,
    };
    this.modalRef = this.modalService.show(ViewCandidateByIdComponent, {
      initialState,
    });
  }
  openModalEntretien(): void {
    const initialState = {
      postId: this.postId,
    };
    this.modalRef = this.modalService.show(EntretienRhComponent, {
      initialState,
    });
  }

  openCandidatDetailModal(candidatId: number): void {
    this.posteService
      .getCollaborateurInfoById(candidatId)
      .subscribe((candidat) => {
        this.dialog.open(ViewCandidateByIdComponent, {
          width: '400px',
          data: candidat,
        });
      });
  }

  onDrop(event: CdkDragDrop<string[]>, newState: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const candidatId = event.item.element.nativeElement.id; // Obtenez l'ID du candidat
      const posteId = /* Obtenez l'ID du poste */ this.postId;
      this.modifierEtatCandidature(candidatId, newState);
      this.getCandidatures();

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  modifierEtatCandidature(collaborateurId: string, newState: string) {
    this.posteService
      .updateCandidatureState(collaborateurId, newState)
      .subscribe(
        (candidature: Candidature) => {
          console.log(
            'État de la candidature mis à jour avec succès : ',
            candidature
          );
          this.getCandidatures();

          // Mettez à jour votre interface utilisateur ou effectuez d'autres actions en fonction de la réponse
        },
        (error) => {
          console.error(
            "Erreur lors de la mise à jour de l'état de la candidature : ",
            error
          );
          // Gérer les erreurs
        }
      );
  }
  updateStateEntretien(collaborateurId: string) {
    this.posteService.updateStateEntretien(collaborateurId).subscribe(
      (candidature: Candidature) => {
        console.log(
          'État de la candidature mis à jour avec succès : ',
          candidature
        );
        this.AllCandidaturePreselectionne();

        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions en fonction de la réponse
      },
      (error) => {
        console.error(
          "Erreur lors de la mise à jour de l'état de la candidature : ",
          error
        );
        // Gérer les erreurs
      }
    );
  }
  updateStateRefus(collaborateurId: string) {
    this.posteService.updateStateRefus(collaborateurId).subscribe(
      (candidature: Candidature) => {
        console.log(
          'État de la candidature mis à jour avec succès : ',
          candidature
        );
        this.AllCandidaturePreselectionne();

        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions en fonction de la réponse
      },
      (error) => {
        console.error(
          "Erreur lors de la mise à jour de l'état de la candidature : ",
          error
        );
        // Gérer les erreurs
      }
    );
  }
  candidatures: any[] = [];
  preselectionne: any[] = [];
  entretien: any[] = [];
  entretienrh: any[] = [];

  getCandidatures(): void {
    this.posteService.getAllCandidatures(this.postId).subscribe(
      (candidatures) => {
        this.candidatures = candidatures;
        console.log('Candidatures:', this.candidatures);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des candidatures:',
          error
        );
      }
    );
  }

  AllCandidaturePreselectionne(): void {
    this.posteService.AllCandidaturePreselectionne(this.postId).subscribe(
      (preselectionne) => {
        this.preselectionne = preselectionne;
        console.log('preselectionne:', this.preselectionne);
        this.filterCandidats();
        // Utiliser setTimeout pour retarder l'appel de createBarChart()
        setTimeout(() => {
          this.createBarChart();
        }, 0);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des candidatures:',
          error
        );
      }
    );
  }
  EntretiensSpecifiques(): void {
    this.entretienService.EntretiensSpecifiques(this.postId).subscribe(
      (entretien) => {
        this.entretien = entretien;
        console.log('entretien:', this.entretien);
        this.filterCandidats();
        // Utiliser setTimeout pour retarder l'appel de createBarChart()
        setTimeout(() => {
          this.createBarChart2();
        }, 0);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des candidatures:',
          error
        );
      }
    );
  }
  EntretiensRhSpecifiques(): void {
    this.entretienRhService.EntretiensRhSpecifiques(this.postId).subscribe(
      (entretienrh) => {
        this.entretienrh = entretienrh;
        console.log('entretienrh:', this.entretienrh);
        this.filterCandidats();
        // Utiliser setTimeout pour retarder l'appel de createBarChart()
        setTimeout(() => {
          this.createBarChart3();
        }, 0);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des candidatures:',
          error
        );
      }
    );
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createBarChart2();
    this.createBarChart3();
  }

  @ViewChild('barChart') barChart!: ElementRef;
  createBarChart(): void {
    const ctx = this.barChart.nativeElement as HTMLCanvasElement;
    console.log('barChart:', this.barChart); // Ajouter un log ici
    if (ctx) {
      if (this.preselectionne && this.preselectionne.length > 0) {
        const labels = this.preselectionne.map(
          (candidat: any) => candidat.nom + ' ' + candidat.prenom
        );
        const scores = this.preselectionne.map(
          (candidat: any) => candidat.score
        );
        if (labels.length === scores.length) {
          const barChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Score des candidats',
                  data: scores,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Rouge
                    'rgba(54, 162, 235, 0.2)', // Bleu
                    'rgba(255, 206, 86, 0.2)', // Jaune
                    'rgba(75, 192, 192, 0.2)', // Vert
                    'rgba(153, 102, 255, 0.2)', // Violet
                    'rgba(255, 159, 64, 0.2)', // Orange
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)', // Rouge
                    'rgba(54, 162, 235, 1)', // Bleu
                    'rgba(255, 206, 86, 1)', // Jaune
                    'rgba(75, 192, 192, 1)', // Vert
                    'rgba(153, 102, 255, 1)', // Violet
                    'rgba(255, 159, 64, 1)', // Orange
                  ], // Couleur de la bordure des barres
                  borderWidth: 1, // Largeur de la bordure des barres
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true, // Commence l'axe y à zéro
                },
              },
            },
          });
        } else {
          console.error(
            'Les labels et les scores ne correspondent pas en longueur.'
          );
        }
      } else {
        console.error(
          'Aucune donnée de preselectionne pour créer le graphique.'
        );
      }
    } else {
      console.error("L'élément barChart n'est pas disponible.");
    }
  }
  @ViewChild('barChart2') barChart2!: ElementRef;
  createBarChart2(): void {
    const ctx = this.barChart2.nativeElement as HTMLCanvasElement;
    console.log('barChart2:', this.barChart2);
    if (ctx) {
      if (this.entretien && this.entretien.length > 0) {
        const labels = this.entretien.map(
          (candidat: any) =>
            candidat.nomCollaborateur + ' ' + candidat.prenomCollaborateur
        );
        const note = this.entretien.map((candidat: any) => candidat.note);
        if (labels.length === note.length) {
          const barChart2 = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Note des candidats',
                  data: note,
                  backgroundColor: [
                    'rgba(255, 159, 64, 0.2)', // Orange
                    'rgba(255, 99, 132, 0.2)', // Rouge
                    'rgba(54, 162, 235, 0.2)', // Bleu
                    'rgba(255, 206, 86, 0.2)', // Jaune
                    'rgba(75, 192, 192, 0.2)', // Vert
                    'rgba(153, 102, 255, 0.2)', // Violet
                  ],
                  borderColor: [
                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(255, 99, 132, 1)', // Rouge
                    'rgba(54, 162, 235, 1)', // Bleu
                    'rgba(255, 206, 86, 1)', // Jaune
                    'rgba(75, 192, 192, 1)', // Vert
                    'rgba(153, 102, 255, 1)', // Violet
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          console.error(
            'Les labels et les scores ne correspondent pas en longueur.'
          );
        }
      } else {
        console.error(
          'Aucune donnée de preselectionne pour créer le graphique.'
        );
      }
    } else {
      console.error("L'élément barChart n'est pas disponible.");
    }
  }
  @ViewChild('barChart3') barChart3!: ElementRef;
  createBarChart3(): void {
    const ctx = this.barChart3.nativeElement as HTMLCanvasElement;
    console.log('barChart3:', this.barChart3);
    if (ctx) {
      if (this.entretienrh && this.entretienrh.length > 0) {
        const labels = this.entretienrh.map(
          (candidat: any) =>
            candidat.nomCollaborateur + ' ' + candidat.prenomCollaborateur
        );
        const note = this.entretienrh.map((candidat: any) => candidat.salaire);
        if (labels.length === note.length) {
          const barChart3 = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Note des candidats',
                  data: note,
                  backgroundColor: [
                    'rgba(153, 102, 255, 0.2)', // Violet
                    'rgba(75, 192, 192, 0.2)', // Vert
                    'rgba(255, 206, 86, 0.2)', // Jaune

                    'rgba(255, 159, 64, 0.2)', // Orange
                    'rgba(255, 99, 132, 0.2)', // Rouge
                    'rgba(54, 162, 235, 0.2)', // Bleu
                  ],
                  borderColor: [
                    'rgba(153, 102, 255, 1)', // Violet
                    'rgba(75, 192, 192, 1)', // Vert
                    'rgba(255, 206, 86, 1)', // Jaune

                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(255, 99, 132, 1)', // Rouge
                    'rgba(54, 162, 235, 1)', // Bleu
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          console.error(
            'Les labels et les scores ne correspondent pas en longueur.'
          );
        }
      } else {
        console.error(
          'Aucune donnée de preselectionne pour créer le graphique.'
        );
      }
    } else {
      console.error("L'élément barChart n'est pas disponible.");
    }
  }
}
