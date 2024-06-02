import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntretienRhService } from 'src/app/service/entretien-rh.service';

@Component({
  selector: 'app-mes-entretiens-rh',
  templateUrl: './mes-entretiens-rh.component.html',
  styleUrls: ['./mes-entretiens-rh.component.css'],
})
export class MesEntretiensRhComponent {
  entretiens: any[] = [];

  constructor(private service: EntretienRhService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
  }
  canJoinInterview(dateEntretien: string, heureDebut: string): boolean {
    const entretienDateTime = new Date(`${dateEntretien}T${heureDebut}`);
    const now = new Date();
    return now >= entretienDateTime;
  }
  getEntretiens() {
    this.service.getManagerEntretien().subscribe(
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
    this.router.navigate(['/managerRh/interview', roomId, candidatureId]);
  }
}
