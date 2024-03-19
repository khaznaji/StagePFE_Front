import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-edit-fiche',
  templateUrl: './edit-fiche.component.html',
  styleUrls: ['./edit-fiche.component.css']
})
export class EditFicheComponent implements OnInit {
  titre!: string;
  description!: string;
  nombrePostesDisponibles!: number;
  competences!: any[];
  poste! : Poste[];
  postId!: number;
  newCategory: Poste = new Poste();

  constructor(private route: ActivatedRoute , private posteService: PosteService, private authService: UserAuthService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.fetchPostDetails(); // Fetch post details when component initializes
    });
  }

  fetchPostDetails(): void {
    this.posteService.getPosteById(this.postId).subscribe(
      (response: any) => {
        this.newCategory = response; // Assign the fetched post details to 'poste'
        // Populate the form fields with the fetched data
        this.titre = this.newCategory.titre;
        this.description = this.newCategory.description;
        this.nombrePostesDisponibles = this.newCategory.nombrePostesDisponibles;
        this.competences = this.newCategory.competences;
      },
      error => {
        console.error(error);
        // Handle error here
      }
    );
  }
 onEditPoste(): void {
  this.posteService.editPoste(this.postId, this.newCategory.titre, this.newCategory.description, this.newCategory.nombrePostesDisponibles, this.newCategory.competences).subscribe(
    response => {
      console.log(response);
      // Gérez la réponse ici, par exemple en affichant un message de succès
    },
    error => {
      console.error(error);
      // Gérez l'erreur ici, par exemple en affichant un message d'erreur
    }
  );
}
}
