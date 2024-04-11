import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PosteService } from 'src/app/service/poste.service';

@Component({
  selector: 'app-candidats-entretien-rh',
  templateUrl: './candidats-entretien-rh.component.html',
  styleUrls: ['./candidats-entretien-rh.component.css']
})
export class CandidatsEntretienRhComponent {
constructor(
  private posteService: PosteService,
  private modalRef: BsModalRef
) {}

@Input() postId!: number;
filteredPostes: any[] = [];
entretien: any[] = [];
searchTerm: string = '';
candidats: any[] = [];
ngOnInit(): void {
  if (this.modalRef.content) {
    this.postId = this.modalRef.content.postId;
  }
  this.EntretiensSpecifiques();
}
filterCandidats(): void {
  this.filteredPostes = this.candidats.filter((poste) =>
    poste.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
EntretiensSpecifiques(): void {
  this.posteService.CandidatsEntretienRh(this.postId).subscribe(
    (entretien) => {
      this.candidats = entretien; // Mettre à jour candidats au lieu d'entretien
      console.log('entretien:', this.entretien);
      this.filterCandidats();
      // Utiliser setTimeout pour retarder l'appel de createBarChart()
    },
    (error) => {
      console.error(
        'Erreur lors de la récupération des candidatures:',
        error
      );
    }
  );
}


accepterCandidats(): void {
  // Filtrer les candidats sélectionnés
  const candidatureIds = this.filteredPostes
  .filter((candidat) => candidat.selected)
  .map((candidat) => candidat.candidature_id);

// Appeler le service pour mettre à jour l'état des candidatures
this.posteService
  .accepterCandidature(candidatureIds)
  .subscribe(
    () => {
      console.log('Les candidatures ont été mises à jour avec succès.');
      // Mettre à jour les candidats dans le composant après la mise à jour
      this.EntretiensSpecifiques();
    },
    (error) => {
      console.error(
        'Erreur lors de la mise à jour des candidatures :',
        error
      );
    }
  );
}
// Méthode pour récupérer les candidats (à adapter selon votre implémentation)
}
