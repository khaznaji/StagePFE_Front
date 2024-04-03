  import { Component, Inject, Input, OnInit } from '@angular/core';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { ActivatedRoute } from '@angular/router';
  import { CalendarOptions, EventInput } from '@fullcalendar/core';
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
  import { PosteService } from 'src/app/service/poste.service';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timeGrid';

  import { EntretienService } from 'src/app/service/entretien.service';
  import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
  import { Entretien } from 'src/app/model/entretien.model';

  @Component({
    selector: 'app-full-calendar',
    templateUrl: './full-calendar.component.html',
    styleUrls: ['./full-calendar.component.css'],
  })
  export class FullCalendarComponent implements OnInit {
    postId!: number;
    candidatureId!: number;
    dateEntretien!: string;
    heureDebut!: string;
    heureFin!: string;
    constructor(
      private route: ActivatedRoute,
      private entretienService: EntretienService,
      public dialog: MatDialog,
      private modalRef: BsModalRef
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.postId = +params['postId'];
        this.loadCandidatureDates();
      });
      this.loadCandidatureDates();
    }

    showModal: boolean = false;
    showModal2: boolean = false;

    eventData: any = {}; // To store event data

    calendarOptions: any = {
      weekends: false, // initial value
      initialView: 'timeGridWeek', // Commencez par afficher la vue semaine
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

    loadCandidatureDates() {
      this.entretienService
        .getEntretiensByPosteId(this.postId)
        .subscribe((entretiens) => {
          console.log('Candidature dates loaded successfully:', entretiens);

          let events = entretiens.map((entretien, index) => ({
            title: `${entretien.prenomCollaborateur} ${entretien.nomCollaborateur}`,
            start: new Date(
              `${entretien.entretien.dateEntretien}T${entretien.entretien.heureDebut}`
            ),
            end: new Date(
              `${entretien.entretien.dateEntretien}T${entretien.entretien.heureFin}`
            ),
            className: index === 0 ? 'highlighted-event' : '',
            id: entretien.entretien.id, // Ajoutez l'ID de l'entretien comme identifiant d'événement
          }));
          this.calendarOptions.events = events;
        });
    }

    handleDateClick(arg: any) {
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
      const eventId = eventClickInfo.event.id; // Récupérez l'identifiant de l'événement FullCalendar
      this.entretienService.getEntretienById(eventId).subscribe(
        (entretien) => {
          this.entretienDetails = entretien;
          this.showModal2 = true; 
          console.log("// Afficher le second modal avec les détails de l'entretien")
        },
        (error) => {
          console.error('Error loading entretien details:', error);
          // Gérer l'erreur
        }
      );
    }
    deleteEntretien(id: number): void {
      this.entretienService.deleteEntretien(id).subscribe(
        () => {
          console.log('Entretien supprimé avec succès.');
          // Ajoutez ici toute logique supplémentaire après la suppression réussie
        },
        error => {
          console.error('Erreur lors de la suppression de l\'entretien :', error);
          // Gérer l'erreur ici
        }
      );
    }
    

    addEvent() {
      const newEvent: EventInput = {
        title: this.eventData.title,
        start: this.eventData.start,
        end: this.eventData.end,
      };
      this.createEntretien(
        this.postId,
        this.candidatureId,
        this.eventData.date, // Utilisez la date de l'événement
        this.heureDebut,
        this.heureFin
      );
      this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
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
      postId: number,

      candidatureId: number,
      dateEntretien: string,
      heureDebut: string,
      heureFin: string
    ): void {
      // Call the createEntretien method from the PosteService to create the Entretien
      this.entretienService
        .createEntretien(
          postId,
          candidatureId,
          dateEntretien,
          heureDebut,
          heureFin
        )
        .subscribe(
          (response) => {
            console.log('Entretien created successfully:', response);
            // Handle success response
          },
          (error) => {
            console.error('Error creating entretien:', error);
            // Handle error response
          }
        );
    }

    onSubmit(): void {
      this.createEntretien(
        this.postId,
        this.candidatureId,
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
