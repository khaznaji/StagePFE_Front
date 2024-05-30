  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { Notifications } from 'src/app/model/notification.model';
  import { NotificationsService } from 'src/app/service/notifications.service';
  import { UserAuthService } from 'src/app/service/user-auth.service';
  import { UserService } from 'src/app/service/user.service';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css']
  })
  export class AdminMenuComponent implements OnInit {
    constructor(private userService: UserService, private router: Router, private notificationService: NotificationsService, private Auth: UserAuthService) { }
    
    data: any = [];
    username!: string;
    email!: string;
    role!: string;
    matricule!: string;
    numtel!: number;
    genre!: number;
    notifications: any[] = [];
    listUsers: any[] = [];
    listUserss: any[] = [];
    filteredUserss: any[] = []; // Propriété pour stocker les utilisateurs filtrés

    filteredUsers: any[] = []; // Propriété pour stocker les utilisateurs filtrés
    searchTerm: string = ''; // Terme de recherche
    image!: string;
    searchTermm: string = '';
    ngOnInit(): void {
      this.getUserByid(localStorage.getItem('id'));
      this.userService.getAll().subscribe(
        (response: any) => {
          this.listUsers = response;
          this.filteredUsers = response; // Initialiser filteredUsers avec tous les utilisateurs
        },
        (error: any) => {
          console.error(error);
        }
      );
      this.userService.getAllUsersByRole().subscribe(
        (response: any) => {
          this.listUserss = response;
          this.filteredUserss = response; // Initialiser filteredUsers avec tous les utilisateurs
        },
        (error: any) => {
          console.error(error);
        }
      );
      this.loadNotifications();
    }

    redirectionChat(id: any) {
      this.router.navigate(['/managerRh/chat/' + id]);
    }
    redirectionProfile(id: any) {
      this.router.navigate(['/managerRh/user-profile/' + id]);
    }

    redirectToPage(notification: Notifications): void {
      this.notificationService.markNotificationAsSeen(notification.id).subscribe(
        response => {
          console.log('Notification marquée comme vue avec succès.');
          // Réalisez toute autre action nécessaire après avoir marqué la notification comme vue
        },
        error => {
          console.error('Erreur lors du marquage de la notification comme vue :', error);
          // Gérez l'erreur en conséquence
        }
      );
      if (notification.notifType === 'Poste') {
        this.router.navigate(['managerRh/demande-poste']);
      } else {
        // Rediriger vers une autre page pour d'autres types de notifications
      }
    }

    loadNotifications(): void {
      this.notificationService.getUserNotifications().subscribe(
        notifications => {
          this.notifications = notifications;
          console.log(' fetching notifications:', notifications);

        },
        error => {
          console.log('Error fetching notifications:', error);
        }
      );
    }

    getUserByid(id: any) {
      const headers = { 'Authorization': 'Bearer ' + this.Auth.getToken() };
      this.userService.getUserById2(id, headers).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        this.username = this.data.nom + ' ' + this.data.prenom;
        this.image = this.data.image;
        this.email = this.data.email;
        this.role = this.data.role;
        this.matricule = this.data.matricule;
        this.numtel = this.data.numtel;
        this.genre = this.data.gender;

        console.log('User info:', this.data);
        console.log('User photo:', this.image);
      });
    }

    logout() {
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: 'Vous êtes sur le point de vous déconnecter.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Se deconnecter!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Auth.clear();
          this.router.navigate(['/signin']);
        }
      });
    }
    onSearchTermmChange() {
      if (this.searchTermm) {
        this.filteredUserss = this.listUserss.filter(user =>
          `${user.nom} ${user.prenom}`.toLowerCase().includes(this.searchTermm.toLowerCase())
        );
      } else {
        this.filteredUserss = this.listUserss;
      }
    }
    onSearchTermChange() {
      if (this.searchTerm) {
        this.filteredUsers = this.listUsers.filter(user =>
          `${user.nom} ${user.prenom}`.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredUsers = this.listUsers;
      }
    }
    get hasUnseenNotifications(): boolean {
      return this.notifications.some(notification => !notification.seen);
    }
  
  }
