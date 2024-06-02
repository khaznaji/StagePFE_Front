import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';
import { CollaborateurService } from 'src/app/service/collaborateur.service';

@Component({
  selector: 'app-get-bilan-by-id-collab',
  templateUrl: './get-bilan-by-id-collab.component.html',
  styleUrls: ['./get-bilan-by-id-collab.component.css'],
})
export class GetBilanByIdCollabComponent implements OnInit {
  bilanId!: number;
  bilanAnnuel: any;

  constructor(
    private route: ActivatedRoute,
    private bilanService: BilanService,
    private collaborateurService: CollaborateurService
  ) {}

  ngOnInit(): void {
    this.bilanId = this.route.snapshot.params['id'];
    this.getBilanAnnuelById(this.bilanId);
    this.getCollaborateurInfo();
  }
  collaborateurInfo: any;

  getCollaborateurInfo(): void {
    this.collaborateurService.getCollaborateurInfo().subscribe((data: any) => {
      this.collaborateurInfo = data;
      console.log(this.collaborateurInfo);
    });
  }
  getBilanAnnuelById(bilanAnnuelId: number) {
    this.bilanService.getBilanById(bilanAnnuelId).subscribe(
      (data) => {
        this.bilanAnnuel = data;
        console.log('ss', this.bilanAnnuel);
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors de la récupération du bilan annuel : ',
          error
        );
      }
    );
  }
}
