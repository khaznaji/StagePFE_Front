import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntretienService } from 'src/app/service/entretien.service';

@Component({
  selector: 'app-mes-entretiens',
  templateUrl: './mes-entretiens.component.html',
  styleUrls: ['./mes-entretiens.component.css'],
})
export class MesEntretiensComponent implements OnInit {
  entretiens: any[] = [];

  constructor(private service: EntretienService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
  }

  getEntretiens() {
    this.service.getCollaborateurEntretien().subscribe(
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
    this.router.navigate(['/collaborateur/interview', roomId, candidatureId]);
  }

  canJoinInterview(dateEntretien: string, heureDebut: string): boolean {
    const entretienDateTime = new Date(`${dateEntretien}T${heureDebut}`);
    const now = new Date();
    return now >= entretienDateTime;
  }
}
