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
}
