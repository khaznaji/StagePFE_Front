import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { PopUpEvaluateBilanComponent } from '../pop-up-evaluate-bilan/pop-up-evaluate-bilan.component';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-get-bilan-by-id',
  templateUrl: './get-bilan-by-id.component.html',
  styleUrls: ['./get-bilan-by-id.component.css']
})
export class GetBilanByIdComponent  implements OnInit {

  bilanId!: number;
  bilanAnnuel: any;
  idCollab!: number; // Déclaration de la variable idCollab

  constructor(
    private route: ActivatedRoute,
    private bilanService: BilanService,  
    private modalService: BsModalService   ) { }

  ngOnInit(): void {
    this.bilanId = this.route.snapshot.params['id'];
    this.idCollab = this.route.snapshot.params['idCollab']; // Récupération de idCollab depuis l'URL
    this.getBilanAnnuelById(this.bilanId);
  }
  modalRef!: BsModalRef;
  openModalEntretien(): void {
    const initialState = {
      idCollab: this.idCollab,
    };
    this.modalRef = this.modalService.show(PopUpEvaluateBilanComponent, {
      initialState,
    });
  }

  getBilanAnnuelById(bilanAnnuelId: number) {
    this.bilanService.getBilanById(bilanAnnuelId).subscribe(
      (data) => {
        this.bilanAnnuel = data;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération du bilan annuel : ', error);
      }
    );
  }
  showEvaluations: boolean = false;
  showEvaluationSection(): void {
    // Activer ou désactiver l'affichage de la section des évaluations
    this.showEvaluations = !this.showEvaluations;
  }
  showReponse(): void {
    // Activer ou désactiver l'affichage de la section des évaluations
    this.showEvaluations = this.showEvaluations;
  }
  getEvaluationColor(evaluation: number): string {
    if (evaluation < 5) {
        return '#dc3545'; // Rouge pour les évaluations inférieures à 5
    } else if (evaluation < 7) {
        return '#ffc107'; // Jaune pour les évaluations entre 5 et 7
    } else {
        return '#28a745'; // Vert pour les évaluations supérieures ou égales à 7
    }
  }
}
