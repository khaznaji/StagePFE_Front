import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionFormationService } from 'src/app/service/session-formation.service';

@Component({
  selector: 'app-sessions-formations-collab',
  templateUrl: './sessions-formations-collab.component.html',
  styleUrls: ['./sessions-formations-collab.component.css']
})
export class SessionsFormationsCollabComponent {
  entretiens: any[] = [];

  constructor(private service: SessionFormationService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
  }

  getEntretiens() {
    this.service.mesSessionsCollab().subscribe(
      (data: any) => {
        // Filtrer les entretiens dont la date de fin n'est pas encore passée
        this.entretiens = data.filter((entretien: any) => {
          const dateFin = new Date(entretien.dateFin);
          return dateFin >= new Date(); // Retourne true si la date de fin n'est pas passée
        });
        console.log(this.entretiens); // pour le débogage, vérifiez les données filtrées
      },
      (error) => {
        console.error("Une erreur s'est produite : ", error);
      }
    );
  }

  joinInterview(roomId: string, candidatureId: string) {
    this.router.navigate(['/collaborateur/interview', roomId, candidatureId]);
  }

  canJoinInterview(dateDebut: string): boolean {
    const entretienDateTime = new Date(dateDebut);
    const now = new Date();
    return now >= entretienDateTime;
  }
}
