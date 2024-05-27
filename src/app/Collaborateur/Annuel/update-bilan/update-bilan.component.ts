import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';
import { CollaborateurService } from 'src/app/service/collaborateur.service';

@Component({
  selector: 'app-update-bilan',
  templateUrl: './update-bilan.component.html',
  styleUrls: ['./update-bilan.component.css'],
})
export class UpdateBilanComponent implements OnInit {
  bilanAnnuelId!: number;
  bilanAnnuel: any;
  bilanAnnuelMiseAJour: any = {}; // Objet pour stocker les données mises à jour

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bilanAnnuelService: BilanService,
    private collaborateurService: CollaborateurService
  ) {}
  collaborateurInfo: any;

  ngOnInit(): void {
    this.bilanAnnuelId = this.route.snapshot.params['id'];
    this.getBilanAnnuelById(this.bilanAnnuelId);
    this.getCollaborateurInfo();
  }
  getCollaborateurInfo(): void {
    this.collaborateurService.getCollaborateurInfo().subscribe((data: any) => {
      this.collaborateurInfo = data;
      console.log(this.collaborateurInfo);
    });
  }

  getBilanAnnuelById(bilanAnnuelId: number) {
    this.bilanAnnuelService.getBilanById(bilanAnnuelId).subscribe(
      (data) => {
        this.bilanAnnuel = data;
        this.bilanAnnuelMiseAJour = { ...data }; // Copie les données dans bilanAnnuelMiseAJour

        // Pré-remplir les champs du formulaire avec les données récupérées
        this.bilanAnnuelMiseAJour = {
          objectifAtteints: this.bilanAnnuel.bilanAnnuel.objectifAtteints,
          objectifsFuturs: this.bilanAnnuel.bilanAnnuel.objectifsFuturs,
          projetsAccomplis: this.bilanAnnuel.bilanAnnuel.projetsAccomplis,
          challenges: this.bilanAnnuel.bilanAnnuel.challenges,
        };
        console.log('bilans', this.bilanAnnuel);
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors de la récupération du bilan annuel : ',
          error
        );
      }
    );
  }

  mettreAJourBilanAnnuel() {
    this.bilanAnnuelService
      .mettreAJourBilanAnnuel(this.bilanAnnuelId, this.bilanAnnuelMiseAJour)
      .subscribe(
        (data) => {
          console.log('Bilan annuel mis à jour avec succès : ', data);
          // Redirigez l'utilisateur vers une autre page après la mise à jour, par exemple la liste des bilans
        },
        (error) => {
          console.error(
            'Une erreur est survenue lors de la mise à jour du bilan annuel : ',
            error
          );
        }
      );
  }
  mettreAJouretEnvoyeBilanAnnuel() {
    this.bilanAnnuelService
      .mettreAJouretEnvoyeBilanAnnuel(
        this.bilanAnnuelId,
        this.bilanAnnuelMiseAJour
      )
      .subscribe(
        (data) => {
          console.log('Bilan annuel mis à jour avec succès : ', data);
          // Redirigez l'utilisateur vers une autre pagea après la mise à jour, par exemple la liste des bilans
        },
        (error) => {
          console.error(
            'Une erreur est survenue lors de la mise à jour du bilan annuel : ',
            error
          );
        }
      );
  }
}
