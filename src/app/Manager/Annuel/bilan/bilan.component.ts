import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';
import { ManagerserviceService } from 'src/app/service/managerservice.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css'],
})
export class BilanComponent implements OnInit {
  token: string | null = null;

  ngOnInit(): void {
    this.token = this.authService.getToken();

    this.reloadData();
  }
  constructor(private authService: UserAuthService ,private router: Router ,private managerServiceService: ManagerserviceService , private bilanService: BilanService ) {}
  members: any[] = [];

  reloadData() {
    this.managerServiceService.getMembers().subscribe((data: any[]) => {
      this.members = data;
      console.log(data);
      console.log(this.members);

    });
  }
  redirigerVersBilan(bilanId: number) {
    // Redirigez l'utilisateur vers la page de mise à jour du bilan avec l'ID du bilan en paramètre
    this.router.navigate(['/managerService/bilan-collab', bilanId]);
  }
  envoyerBilan(): void {
    this.bilanService.envoyerBilan().subscribe(
      (response) => {
        // Traitement en cas de succès de la requête
        console.log('Bilan envoyé avec succès !', response);
        // Ajoutez ici tout code supplémentaire à exécuter après l'envoi du bilan
      },
      (error) => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite lors de l\'envoi du bilan :', error);
        // Ajoutez ici tout code supplémentaire pour gérer les erreurs
      }
    );
  }
}
