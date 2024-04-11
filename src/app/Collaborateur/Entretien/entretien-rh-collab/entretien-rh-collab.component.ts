import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntretienRhService } from 'src/app/service/entretien-rh.service';

@Component({
  selector: 'app-entretien-rh-collab',
  templateUrl: './entretien-rh-collab.component.html',
  styleUrls: ['./entretien-rh-collab.component.css']
})
export class EntretienRhCollabComponent {
  entretiens: any[] = [];

  constructor(private service: EntretienRhService, private router: Router) {}

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
}

