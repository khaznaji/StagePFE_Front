import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css']
})
export class UpdateFormationComponent implements OnInit  {
  @Input() formationId!: number;
  projectData: FormData = new FormData();
  files: File[] = [];
  project: Formation = new Formation();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: Formation[] = [];
  
  adminProjects: Formation[] = [];
  price!: number;
  selectedFile!: File;
  selectedFiles!: File;
  status: boolean = true;
  constructor(private formationService: FormationService , private modalRef: BsModalRef) { }

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.formationId = this.modalRef.content.formationId;
      this.loadFormationDetails(this.formationId);

   }
   this.loadFormationDetails(this.formationId);

  }
  formationInfo: any;
  displaySelectedImages(event: any) {
    const files = event.target.files;
    this.thumbnails = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnails.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
 
  onFileChange(event: any) {
    this.files = event.target.files;
    const files = event.target.files;
    this.thumbnails = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnails.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
  
  selectedVideoUrl: string = '';
selectedThumbnail: string = '';
food!:Formation;

thumbnails: string[] = []; 
loadFormationDetails(formationId: number): void {
  this.formationService.getFormationById(formationId).subscribe(
    (food: Formation) => {
      this.food = food;

      // Réponse réussie, remplissez le formulaire avec les détails de la formation
      this.project.title = this.food.title;
      this.project.chapitre = this.food.chapitre;

      this.project.description = this.food.description;
      this.project.duree = this.food.duree;
      this.project.disponibilite = this.food.disponibilite;
      this.project.departement = this.food.departement;

      // Clear the thumbnails arrayjubh
      this.thumbnails = [];   
      this.food.image.split(',').forEach(image => {
        // Assuming 'image' is the property in 'AdminProjects' class representing the image URLs
        this.thumbnails.push('assets/Formations/'  + image.trim());
      }); },
    (error: any) => {
      // Gérer les erreurs
      console.error('Erreur lors du chargement des détails de la formation', error);
    }
  );
}




  update() {
    this.projectData.append('title', this.project.title);
    this.projectData.append('chapitre', this.project.chapitre.toString());
    this.projectData.append('duree', this.project.duree.toString());

    this.projectData.append('disponibilite', this.project.disponibilite.toString());

    this.projectData.append('description', this.project.description);

    this.projectData.append('departement', this.project.departement.toString());


    // Ajoutez les images à la FormData
    for (let i = 0; i < this.files.length; i++) {
      this.projectData.append('image', this.files[i]);
    }

    // Appelez le service pour ajouter le projet
    this.formationService.update(this.formationId , this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new Formation();


      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }
  
  id!: number;
  isEdit = false;
  submitted = false;

  
 
  
}
