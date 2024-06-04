import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { EntretienService } from 'src/app/service/entretien.service';
import { PosteService } from 'src/app/service/poste.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';

import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ManagerserviceService } from 'src/app/service/managerservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-entretien-annuel-calendar',
  templateUrl: './entretien-annuel-calendar.component.html',
  styleUrls: ['./entretien-annuel-calendar.component.css'],
})
export class EntretienAnnuelCalendarComponent implements OnInit {
  postId!: number;
  id!: number;
  collaborateurId!: number;
  dateEntretien!: string;
  heureDebut!: string;

  heureFin!: string;
  constructor(
    private route: ActivatedRoute,
    private entretienService: EntretienService,
    public dialog: MatDialog,
    private posteService: PosteService,
    private managerServiceService: ManagerserviceService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   this.postId = +params['postId'];
    this.loadCandidatureDates();
    // });
    // this.loadCandidatureDates();
    // this.getCandidatsByPoste();
    this.reloadData();
  }
  checkHeureFin(): boolean {
    return (
      new Date('1970-01-01T' + this.heureFin) >
      new Date('1970-01-01T' + this.heureDebut)
    );
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Les mois commencent à 0
    const day = today.getDate();
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  getMinTime(): string {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    // Si c'est aujourd'hui et l'heure actuelle est avant 18h00
    if (currentHour < 18 || (currentHour === 18 && currentMinute === 0)) {
      // Définir la valeur minimale sur l'heure actuelle
      const formattedHour = currentHour < 10 ? '0' + currentHour : currentHour;
      const formattedMinute =
        currentMinute < 10 ? '0' + currentMinute : currentMinute;
      return `${formattedHour}:${formattedMinute}`;
    } else {
      // Sinon, définir la valeur minimale sur 08h00
      return '08:00';
    }
  }
  showModal: boolean = false;
  showModal2: boolean = false;

  eventData: any = {}; // To store event data

  calendarOptions: any = {
    weekends: false, // initial value
    initialView: 'dayGridMonth', // Commencez par afficher la vue semaine
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: (arg: any) => this.handleDateClick(arg),
    eventClick: (arg: any) => this.handleEventClick(arg),
    events: [],
    views: {
      // Définissez les vues que vous souhaitez inclure
      dayGridMonth: {
        // Vue mois
        type: 'dayGridMonth', // Utilisez le plugin dayGrid pour la vue mois
        buttonText: 'Month', // Texte du bouton pour basculer vers cette vue
      },
      timeGridWeek: {
        // Vue semaine
        type: 'timeGridWeek', // Utilisez le plugin timeGrid pour la vue semaine
        buttonText: 'Week', // Texte du bouton pour basculer vers cette vue
      },
    },
    headerToolbar: {
      // Barre d'outils d'en-tête pour afficher les boutons de navigation entre les vues
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek', // Boutons pour basculer entre la vue mois et la vue semaine
    },
  };
  members: any[] = [];

  reloadData() {
    this.managerServiceService.getMembers().subscribe((data: any[]) => {
      this.members = data;
      console.log(data);
      console.log('members' ,this.members);
      console.log('idUser of each member:');
      this.members.forEach(member => console.log(member.idUser));
    });
  }
  loadCandidatureDates() {
    this.entretienService
      .getEntretiensAnnuelDuManagerConnecte()
      .subscribe((entretiens) => {
        console.log('Candidature dates loaded successfully:', entretiens);

        let events = entretiens.map(
          (
            entretien: {
              prenomCollaborateur: any;
              nomCollaborateur: any;
              entretien: {
                dateEntretien: any;
                heureDebut: any;
                heureFin: any;
                id: any;
              };
            },
            index: number
          ) => ({
            title: `${entretien.prenomCollaborateur} ${entretien.nomCollaborateur}`,
            start: new Date(
              `${entretien.entretien.dateEntretien}T${entretien.entretien.heureDebut}`
            ),
            end: new Date(
              `${entretien.entretien.dateEntretien}T${entretien.entretien.heureFin}`
            ),
            className: index === 0 ? 'highlighted-event' : '',
            id: entretien.entretien.id, // Ajoutez l'ID de l'entretien comme identifiant d'événement
          })
        );
        this.calendarOptions.events = events;
      });
  }

  // Déclarer une variable pour suivre si la date est antérieure à aujourd'hui
  isPastDate: boolean = false;

  handleDateClick(arg: any) {
    const clickedDate = new Date(arg.dateStr);
    const today = new Date(); // Obtenez la date actuelle

    // Vérifiez si la date cliquée est antérieure à aujourd'hui
    if (clickedDate < today) {
      // Si la date est antérieure à aujourd'hui, configurez la variable isPastDate sur true
      this.isPastDate = true;
      console.log(
        "Vous ne pouvez pas sélectionner une date antérieure à aujourd'hui."
      );
      return; // Quittez la fonction sans effectuer d'autres actions
    } else {
      // Si la date n'est pas antérieure à aujourd'hui, configurez isPastDate sur false
      this.isPastDate = false;
    }

    // Si la date est valide, continuez avec votre logique actuelle
    this.showModal = true;
    this.eventData.start = arg.dateStr;
    this.eventData.end = arg.dateStr;
    this.eventData.date = arg.dateStr;
  }

  entretienDetails: any | undefined; // Définissez la propriété entretienDetails de type Entretien | undefined
  closeModal() {
    this.showModal2 = false;
  }
 
  
  handleEventClick(eventClickInfo: any) {
    const eventId = eventClickInfo.event.id;
    this.entretienService.getEntretienannuelbyId(eventId).subscribe(
      (entretien: any) => {
        this.entretienDetails = entretien;
        this.preRemplirFormulaire(); // Appeler pour pré-remplir le formulaire
        this.showModal2 = true;
      },
      (error) => {
        console.error('Error loading entretien details:', error);
        // Gérer l'erreur
      }
    );
  }
  
  deleteEntretien(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entretienService.deleteEntretienAnnuel(id).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              "L'entretien a été supprimé.",
              'success'
            );
            console.log('Entretien supprimé avec succès.');
            // Ajoutez ici toute logique supplémentaire après la suppression réussie
          },
          (error) => {
            Swal.fire(
              'Erreur!',
              "Erreur lors de la suppression de l'entretien: " + error.message,
              'error'
            );
            console.error("Erreur lors de la suppression de l'entretien :", error);
            // Gérer l'erreur ici
          }
        );
      }
    });
  }
  editMode: boolean = false; // Variable pour suivre l'état de l'affichage du formulaire de modification
  preRemplirFormulaire(): void {
    if (this.entretienDetails) {
      this.collaborateurId = this.entretienDetails.collaborateurId;
      this.dateEntretien = this.entretienDetails.entretien.dateEntretien;
      this.heureDebut = this.entretienDetails.entretien.heureDebut;
      this.heureFin = this.entretienDetails.entretien.heureFin;
    }
  }
  

  updateEntretienAnnuel(entretienId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment mettre à jour cet entretien?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettre à jour!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.entretienService
          .updateEntretienAnnuel(entretienId, this.dateEntretien, this.heureDebut, this.heureFin)
          .subscribe(
            (response) => {
              Swal.fire('Succès!', "L'entretien a été mis à jour avec succès.", 'success').then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              });
            },
            (error) => {
              Swal.fire('Erreur!', "Une erreur s'est produite lors de la mise à jour de l'entretien.", 'error');
            }
          );
      }
    });
  }

  submitUpdatedEntretien(entretienId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment mettre à jour cet entretien?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettre à jour!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.entretienService
          .updateEntretienAnnuel(
            entretienId,
            this.dateEntretien,
            this.heureDebut,
            this.heureFin
          )
          .subscribe(
            (response) => {
              console.log('Entretien mis à jour avec succès :', response);
              Swal.fire(
                'Succès!',
                "L'entretien a été mis à jour avec succès.",
                'success'
              ).then(() => {
                setTimeout(() => {
                  window.location.reload(); // Recharge la page après 2 secondes
                }, 2000);
              });
            },
            (error) => {
              console.error(
                "Erreur lors de la mise à jour de l'entretien:",
                error
              );
              Swal.fire(
                'Erreur!',
                "Une erreur s'est produite lors de la mise à jour de l'entretien.",
                'error'
              );
              // Gérer l'erreur, afficher un message à l'utilisateur, etc.
            }
          );
      }
    });
  }

  candidats: any[] = [];
  candidatSelectionne: any; // Ajoutez une variable pour stocker les informations du candidat sélectionné

  addEvent() {
   
  
    this.createEntretien(
      this.collaborateurId,
      this.eventData.date, // Utilisez la date de l'événement
      this.heureDebut,
      this.heureFin
    );
    this.calendarOptions.events = [...this.calendarOptions.events];
    this.resetEventData();
    this.showModal = false;
  }
  

  cancelAddEvent() {
    this.resetEventData();
    this.showModal = false;
  }

  resetEventData() {
    this.eventData = {};
  }

  // Method to handle event creation dynamically based on user interaction
  createEntretien(
    collaborateurId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment créer cet entretien?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, créer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.entretienService
          .createEntretienAnnuel(
            collaborateurId,
            dateEntretien,
            heureDebut,
            heureFin
          )
          .subscribe(
            (response) => {
              console.log('Entretien créé avec succès :', response);
              Swal.fire(
                'Succès!',
                "L'entretien a été créé avec succès.",
                'success'
              ).then(() => {
                window.location.reload(); // Recharge la page après la création de l'entretien
              });
            },
            (error) => {
              console.error(
                "Erreur lors de la création de l'entretien :",
                error
              );

              Swal.fire(
                'Succès!',
                "L'entretien a été créé avec succès.",
                'success'
              ).then(() => {
                setTimeout(() => {
                  window.location.reload(); // Recharge la page après 2 secondes
                }, 2000);
              });
            }
          );
      }
    });
  }

  onSubmit(): void {
    this.createEntretien(
      this.collaborateurId,
      this.dateEntretien,
      this.heureDebut,
      this.heureFin
    );
  }

  handleDayClick(date: Date, jsEvent: MouseEvent) {
    // Your event handling logic here
    console.log('Clicked on day:', date.toLocaleString());
    // Optionally, open a modal, navigate to another view, etc.
  }
}
