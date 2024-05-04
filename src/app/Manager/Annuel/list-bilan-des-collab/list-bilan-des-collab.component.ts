import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';

@Component({
  selector: 'app-list-bilan-des-collab',
  templateUrl: './list-bilan-des-collab.component.html',
  styleUrls: ['./list-bilan-des-collab.component.css']
})
export class ListBilanDesCollabComponent implements OnInit {

  collaborateurId!: number;
  bilansAnnuel!: any[];

  constructor(
    private route: ActivatedRoute,
    private bilanService: BilanService ,  private router: Router
  ) { }

  ngOnInit(): void {
    this.collaborateurId = this.route.snapshot.params['id']; // Récupérer l'identifiant du collaborateur à partir du snapshot de l'URL

    this.getBilansCollaborateur(this.collaborateurId);
  }
  redirigerVersBilan(bilanId: number, collaborateurId: number) {
    // Redirigez l'utilisateur vers la page de mise à jour du bilan avec les IDs du bilan et du collaborateur en paramètres
    this.router.navigate(['/managerService/bilan-by-id', bilanId, collaborateurId]);
}

  getBilansCollaborateur(collaborateurId: number): void {
    this.bilanService.getListeBilanDesCollab(collaborateurId).subscribe(
      (data) => {
        this.bilansAnnuel = data;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des bilans du collaborateur : ', error);
      }
    );
  }
}
