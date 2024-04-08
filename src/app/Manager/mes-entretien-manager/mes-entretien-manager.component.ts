import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntretienService } from 'src/app/service/entretien.service';

@Component({
  selector: 'app-mes-entretien-manager',
  templateUrl: './mes-entretien-manager.component.html',
  styleUrls: ['./mes-entretien-manager.component.css'],
})
export class MesEntretienManagerComponent {
  entretiens: any[] = [];

  constructor(private service: EntretienService, private router: Router) {}

  ngOnInit(): void {
    this.getEntretiens();
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
    this.router.navigate(['/managerService/interview', roomId, candidatureId]);
  }
}
