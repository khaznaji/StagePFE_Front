import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionFormationService } from 'src/app/service/session-formation.service';

@Component({
  selector: 'app-mes-sessions-formateur',
  templateUrl: './mes-sessions-formateur.component.html',
  styleUrls: ['./mes-sessions-formateur.component.css']
})
export class MesSessionsFormateurComponent {
  entretiens: any[] = [];

  constructor(private service: SessionFormationService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
  }
  getEntretiens() {
    this.service.mesSessionFormateurs().subscribe(
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
    this.router.navigate(['/formateur/interview', roomId, candidatureId]);
  }
}
