import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Notifications } from 'src/app/model/notification.model';
import { ManagerserviceService } from 'src/app/service/managerservice.service';
import { NotificationsService } from 'src/app/service/notifications.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-manager-service',
  templateUrl: './dashboard-manager-service.component.html',
  styleUrls: ['./dashboard-manager-service.component.css'],
})
export class DashboardManagerServiceComponent implements OnInit {
  nombreCollaborateurs: number = 0;
  nombrePostesPublies: number = 0;
  nombreDemandesFormation: number = 0;
  nombrePostesApprouves: number = 0;
  topThreeHardSkills!: string[];
  topThreeSoftSkills!: string[];
  constructor(
    private userService: UserService,
    private router: Router,
    private managerService: ManagerserviceService,
    private Auth: UserAuthService
  ) {     Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    this.createBarChart();
      

  }
  @ViewChild('barChart') barChart!: ElementRef;
  createBarChart(): void {
    const ctx = this.barChart.nativeElement as HTMLCanvasElement;
    console.log('barChart:', this.barChart); // Ajouter un log ici
    if (ctx) {
      if (this.postesWithCandidatureCount && this.postesWithCandidatureCount.length > 0) {
        const labels = this.postesWithCandidatureCount.map((poste: any) => poste.titre );
        const nbr = this.postesWithCandidatureCount.map(
          (candidat: any) => candidat.nbr
        ); 
        if (labels.length === nbr.length) {
          const barChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'nbr des candidats',
                  data: nbr,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  // Rouge
                    'rgba(54, 162, 235, 0.2)',  // Bleu
                    'rgba(255, 206, 86, 0.2)',  // Jaune
                    'rgba(75, 192, 192, 0.2)',  // Vert
                    'rgba(153, 102, 255, 0.2)', // Violet
                    'rgba(255, 159, 64, 0.2)',  // Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',    // Rouge
                    'rgba(54, 162, 235, 1)',    // Bleu
                    'rgba(255, 206, 86, 1)',    // Jaune
                    'rgba(75, 192, 192, 1)',    // Vert
                    'rgba(153, 102, 255, 1)',   // Violet
                    'rgba(255, 159, 64, 1)',    // Orange
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
  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
    this.userService.getAll().subscribe(
      (response: any) => {
        this.listUsers = response; // Assuming response is an array of user objects
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.managerService.getTopThreeCompetences().subscribe(
      (data: { [key: string]: string[] }) => {
        this.topThreeHardSkills = data['Hard Skills'];
        this.topThreeSoftSkills = data['Soft Skills'];
      },
      (error) => {
        console.log('Erreur lors de la récupération des compétences :', error);
      }
    );
    this.loadStats();
    this.fetchPostesWithCandidatureCount();
  }
  postesWithCandidatureCount!: any[];
 
  fetchPostesWithCandidatureCount(): void {
    this.managerService.getPostesWithCandidatureCount().subscribe(
      (data: any[]) => {
        this.postesWithCandidatureCount = data;
        console.log('poste', data);
                  this.createBarChart();

      },
      (error) => {
        console.error("Une erreur s'est produite : ", error);
      }
    );
  }
  username!: string;
  listUsers: any[] = [];
  data: any = [];

  getUserByid(id: any) {
    const headers = { Authorization: 'Bearer ' + this.Auth.getToken() };
    this.userService.getUserById2(id, headers).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.nom + ' ' + this.data.prenom;
    });
  }
  loadStats(): void {
    this.managerService.getNombreCollaborateurs().subscribe((data) => {
      this.nombreCollaborateurs = data;
    });

    this.managerService.getNombrePostesPublies().subscribe((data) => {
      this.nombrePostesPublies = data;
    });

    this.managerService.getNombreDemandesFormation().subscribe((data) => {
      this.nombreDemandesFormation = data;
    });

    this.managerService.getNombrePostesApprouves().subscribe((data) => {
      this.nombrePostesApprouves = data;
    });
  }
}
