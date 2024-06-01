import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { EntretienRhService } from 'src/app/service/entretien-rh.service';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { PosteService } from 'src/app/service/poste.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-full-calendar-rh',
  templateUrl: './full-calendar-rh.component.html',
  styleUrls: ['./full-calendar-rh.component.css'],
})
export class FullCalendarRhComponent implements OnInit {
  postId!: number;
  userId!: number;
  id!: number;
  candidatureId!: number;
  dateEntretien!: string;
  heureDebut!: string;
  heureFin!: string;
  constructor(
    private route: ActivatedRoute,
    private entretienService: EntretienRhService,
    public dialog: MatDialog,
    private posteService: PosteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['postId'];
      this.loadCandidatureDates();
    });
    this.loadCandidatureDates();
    this.getCandidatsByPoste();
    this.getManagerByPoste();
  }

  showModal: boolean = false;
  showModal2: boolean = false;

  eventData: any = {}; // To store event data
  preRemplirFormulaire(): void {
    if (this.entretienDetails) {
      this.candidatureId = this.entretienDetails.candidatureId;
      this.dateEntretien = this.entretienDetails.entretien.dateEntretien;
      this.heureDebut = this.entretienDetails.entretien.heureDebut;
      this.heureFin = this.entretienDetails.entretien.heureFin;
    }
    this.editMode = true; // Activer le mode d'édition
  }
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
    const eventId = eventClickInfo.event.id; // Récupérez l'identifiant de l'événement FullCalendar
    this.entretienService.getEntretienById(eventId).subscribe(
      (entretien) => {
        this.entretienDetails = entretien;
        this.preRemplirFormulaire(); // Appeler pour pré-remplir le formulaire

        this.showModal2 = true;
        console.log(
          "// Afficher le second modal avec les détails de l'entretien"
        );
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
      (error) => {
        console.error("Erreur lors de la suppression de l'entretien :", error);
        // Gérer l'erreur ici
      }
    );
  }
  editMode: boolean = false; // Variable pour suivre l'état de l'affichage du formulaire de modification

  updateEntretien(id: number): void {
    this.editMode = true; // Activer le mode d'édition

    this.entretienService
      .updateEntretien(
        id,
        this.candidatureId,
        this.dateEntretien,
        this.heureDebut,
        this.heureFin,
        this.userId
      )
      .subscribe(
        (response) => {
          console.log(response); // Afficher la réponse du serveur après la mise à jour de l'entretien
          // Vous pouvez également rediriger l'utilisateur vers une autre page ou effectuer d'autres actions ici
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'entretien:", error);
          // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
  }
  submitUpdatedEntretien(id: number): void {
    this.entretienService
      .updateEntretien(
        id,
        this.candidatureId,
        this.dateEntretien,
        this.heureDebut,
        this.heureFin,
        this.userId
      )
      .subscribe(
        (response) => {
          console.log(response); // Afficher la réponse du serveur après la mise à jour de l'entretien
          // Réinitialiser le mode d'édition et recharger les données si nécessaire
          this.editMode = false;
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'entretien:", error);
          // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
  }
  candidats: any[] = [];
  manager: any[] = [];
  getCandidatsByPoste(): void {
    this.posteService
      .getCandidatsByPosteIdEnAttenteEntretienRh(this.postId)
      .subscribe(
        (candidats) => {
          this.candidats = candidats;
          console.log('Candidats:', this.candidats);
        },
        (error) => {
          console.error('Erreur lors de la récupération des candidats:', error);
        }
      );
  }
  getManagerByPoste(): void {
    this.userService.getAllManagerRh().subscribe(
      (manager) => {
        this.manager = manager;
        console.log('manager:', this.manager);
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidats:', error);
      }
    );
  }
  addEvent() {
    if (!this.candidatureId) {
      console.error('Veuillez sélectionner un candidat.');
      return;
    }

    // Trouver le candidat sélectionné dans la liste des candidats
    const candidatSelectionne = this.candidats.find(
      (candidat) => candidat.id === this.candidatureId
    );

    if (!candidatSelectionne) {
      console.error('Candidat sélectionné introuvable.');
      return;
    }
    const newEvent: EventInput = {
      title: `${candidatSelectionne.nom} ${candidatSelectionne.prenom}`, // Utiliser le nom et le prénom du candidat sélectionné comme titre de l'événement
      start: this.eventData.start,
      end: this.eventData.end,
    };
    this.createEntretien(
      this.postId,
      this.userId,

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
    userId: number,
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
        heureFin,
        userId
      )
      .subscribe(
        (response) => {
          console.log('Entretien created successfully:', response);
        },
        (error) => {
          console.error('Error creating entretien:', error);
          console.log(userId);
        }
      );
  }

  onSubmit(): void {
    this.createEntretien(
      this.postId,
      this.userId,
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
  checkHeureFin(): boolean {
    return (
      new Date('1970-01-01T' + this.heureFin) >
      new Date('1970-01-01T' + this.heureDebut)
    );
  }
}
