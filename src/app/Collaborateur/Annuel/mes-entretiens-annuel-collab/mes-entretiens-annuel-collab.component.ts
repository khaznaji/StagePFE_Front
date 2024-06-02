import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntretienService } from 'src/app/service/entretien.service';

@Component({
  selector: 'app-mes-entretiens-annuel-collab',
  templateUrl: './mes-entretiens-annuel-collab.component.html',
  styleUrls: ['./mes-entretiens-annuel-collab.component.css'],
})
export class MesEntretiensAnnuelCollabComponent {
  entretiens: any[] = [];

  constructor(private service: EntretienService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
  }
  canJoinInterview(dateEntretien: string, heureDebut: string): boolean {
    const entretienDateTime = new Date(`${dateEntretien}T${heureDebut}`);
    const now = new Date();
    return now >= entretienDateTime;
  }
  getEntretiens() {
    this.service.getEntretiensAnnuelDuCollabConnecte().subscribe(
      (data: any) => {
        this.entretiens = data;
        console.log(data); // pour le débogage, vérifiez les données récupérées
      },
      (error) => {
        console.error("Une erreur s'est produite : ", error);
      }
    );
  }
  joinInterview(roomId: string, candidatureId: string) {
    this.router.navigate(['/managerService/interview', roomId, candidatureId]);
  }
}
