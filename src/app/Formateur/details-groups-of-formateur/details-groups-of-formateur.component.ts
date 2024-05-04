import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Certificat } from 'src/app/model/Certificat';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { CertificatService } from 'src/app/service/certificat.service';
import { GroupsService } from 'src/app/service/groups.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-groups-of-formateur',
  templateUrl: './details-groups-of-formateur.component.html',
  styleUrls: ['./details-groups-of-formateur.component.css']
})
export class DetailsGroupsOfFormateurComponent  implements OnInit {
  constructor(
    private groupsService: GroupsService, private certificateService: CertificatService,
    public dialog: MatDialog,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private participationFormation: ParticapationFormationService,
    private route: ActivatedRoute // Ajout de ActivatedRoute pour récupérer le paramètre formationId


  ) {}
  @Input() id!: number; // Définir une propriété d'entrée pour recevoir l'ID de la route
  groupId!: number;
  groupForm!: FormGroup;
  collaborateursConfirme: any[] = [];
  showAddParticipantFormFlag: boolean = false;
  certificateForm!: FormGroup;

  ngOnInit(): void {
    
    if (this.modalRef.content) {
      this.id = this.modalRef.content.id;
    }
    this.groupForm = this.formBuilder.group({
      collaborateursId: this.formBuilder.array([]) // Utilisation d'un FormArray
   });
   {
    this.certificateForm = this.formBuilder.group({
      month: '',
    });
  }

    this.getGroupesDetails(); 
    this.participationFormation.getFormationsConfirme(this.id).subscribe(
      (data: Collaborateur[]) => {
        console.log('Données des collaborateurs confirmés :', data); // Ajoutez cette ligne pour afficher les données récupérées

        this.collaborateursConfirme = data;
        // Ajout des contrôles de checkbox pour chaque collaborateur
        data.forEach(collaborateur => {
          const control = new FormControl(false); // Initialisé à false
          (this.groupForm.get('collaborateursId') as FormArray).push(control);
        });
      },
      error => {
        console.error('Erreur lors de la récupération des collaborateurs confirmés : ', error);
      }
   );
   }
   nom!: string;
   editing: boolean = false;
   editGroup() {
    this.groupsService.editGroupName(this.groupId, this.nom)
      .subscribe(
        response => {
          console.log('Le nom du groupe a été modifié avec succès : ', response);
          // Réinitialiser les valeurs après la modification réussie
          this.nom = '';
          this.editing = false;
          this.contextModal = true;
          this.getGroupesDetails();

        },
        error => {
          console.error('Une erreur est survenue lors de la modification du nom du groupe : ', error);
          // Gérer l'erreur ici, afficher un message à l'utilisateur, etc.
        }
      );
  }
  showEditForm(groupId: number, currentName: string) {
    this.groupId = groupId;
    this.nom = currentName;
    this.editing = true;
    this.contextModal=false ; 

  }
   showAddParticipantForm(): void {
    this.showAddParticipantFormFlag = true;
    this.contextModal = false
  }
   groupes: any;
   removeUserFromGroup(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur du groupe?')) {
      this.groupsService.removeUserFromGroup(this.groupId, userId)
        .subscribe(
          response => {
            console.log(response);
            // Rafraîchir les détails du groupe après la suppression de l'utilisateur
            this.getGroupesDetails();
          },
          error => {
            console.error('Erreur lors de la suppression de l\'utilisateur du groupe :', error);
            // Traiter l'erreur en conséquence
          }
        );
    }
  }

  getGroupesDetails(): void {
    this.groupsService.getGroupesDetails(this.groupId)
      .subscribe(
        (data: any[]) => {
          this.groupes = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  ajouterGroupe(): void {
    const collaborateursId = (this.groupForm?.get('collaborateursId') as FormArray).controls
       .map((control, index) => control.value ? this.collaborateursConfirme[index].idC : null)
       .filter(id => id !== null); // Filtrer les valeurs null
   
    if ( collaborateursId.length > 0) {
       this.groupsService.addCollaborateursToGroup(this.id,this.groupId, collaborateursId)
         .subscribe(
           response => {
             console.log('Groupe ajouté avec succès' ,collaborateursId);
             this.showAddParticipantFormFlag = false;
             this.contextModal=true ; 
             this.getGroupesDetails();
             this.groupForm.reset();
           },
           error => {
             console.error('Erreur lors de l\'ajout du groupe :', error);
           }
         );
    } else {
       console.error("Le formulaire n'est pas initialisé correctement.");
    }
   }
   isLoading = false;
   certif: Certificat = new Certificat();

   saveCertif() {
    this.isLoading = true;
  
    const formData = new FormData();
    formData.append('periode', this.certif.periode);
    formData.append('month', this.certif.month);
  
    this.certificateService.create(this.groupId, formData).subscribe(
      (data) => {
        console.log(data);
  
        this.certif = new Certificat();
        this.getGroupesDetails();

        this.isLoading = false; // Désactive l'état de chargement après la fin du traitement
  
        // Affiche une boîte de dialogue de confirmation après la création réussie du certificat
        Swal.fire({
          title: 'Success',
          text: 'Certificates have been generated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
this.certificatesGenerated=false ; 
this.showFormGenererCertif=false ; 

        });
      },
      (error) => {
        console.log(error);
        this.isLoading = false; // Désactive l'état de chargement en cas d'erreur
      }
    );
  }
 
  group!: any;
showFormGenererCertif : boolean = false
certificatesGenerated : boolean = false
contextModal : boolean = true

nouser : boolean = false
  openAddCertifDialog(groupId: number): void {
    if (this.groupes.collaborateurs?.length === 0) {
      this.openBottomSheet();
    }
    else if (this.groupes.group.certificatesGenerated) {
      this.certificatesGenerated = true;
    } else {
    this.groupId = groupId;
    this.showFormGenererCertif = true;
  }}
 
  openBottomSheet(): void {
    this.nouser = true;
  }
  showAddCertifNoDialog: boolean = false;     

 

  openModifyCertifDialog(): void {
    this.modifyCertificatesModal= true ;   }

 
deleteCertificates(groupId: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete certificates for this group. This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // L'utilisateur a cliqué sur "OK", appeler la méthode pour supprimer les certificats
      this.certificateService.deleteCertificatesForGroup(groupId).subscribe(
        () => {
          console.log('Certificates deleted successfully');
this.getGroupesDetails();
this. certificatesGenerated= false ; 
         Swal.fire(
            'Deleted!',
            'Certificates have been deleted.',
            'success'
          );
        },
        (error) => {
          console.error('Error deleting certificates:', error);
          // Gérer l'erreur, afficher un message d'erreur, etc.
          Swal.fire(
            'Error!',
            'Failed to delete certificates.',
            'error'
          );
        }
      );
    }
  });
}
modifyCertificatesModal :boolean =false ; 

modifyCertificates(): void {
  if (this.certificateForm.valid) {
    const formData = new FormData();
    formData.append('month', this.certificateForm.value.month);     // Use form value
    this.certificateService.update(this.groupId, formData).subscribe(
      (response) => {
        console.log('Certificates modified successfully:', response);

        // Afficher une notification de succès avec Swal
        Swal.fire({
          title: 'Success',
          text: 'Certificates have been modified successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Fermer le dialogue de modification des certificats
          this.modifyCertificatesModal = false;
          this.certificatesGenerated = false;

          
          // Recharger les détails du groupe
          this.getGroupesDetails();
        });
      },
      (error) => {
        console.error('Error modifying certificates:', error);
      }
    );
  }
}

  
  isValidCertif(): boolean {
    return this.certif.month !== undefined ;
  }
}
