import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css']
})
export class UpdateFormationComponent implements OnInit {
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
  thumbnails: string[] = []; 

  constructor(private formationService: FormationService, private modalRef: BsModalRef) { }
  imagePreview: string | undefined;

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.formationId = this.modalRef.content.formationId;
    }
    this.loadFormationDetails(this.formationId);
  }

  loadFormationDetails(formationId: number): void {
    this.formationService.getFormationById(formationId).subscribe(
      (food: Formation) => {
        this.project = food;

        // Réponse réussie, remplissez le formulaire avec les détails de la formation
        this.project.title = food.title;
        this.project.chapitre = food.chapitre;
        this.project.description = food.description;
        this.project.duree = food.duree;
        this.project.disponibilite = food.disponibilite;
        this.project.department = food.department;
        this.imagePreview = 'assets/images/Formations/' + food.image;

     
      },
      (error: any) => {
        // Gérer les erreurs
        console.error('Erreur lors du chargement des détails de la formation', error);
      }
    );
  }
  onFileSelectedz(event: any) {
    this.selectedFile = event.target.files[0];
    this.imagePreview != null;

    const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(this.selectedFile);
  }
  onFileChange(event: any) {
    this.files = event.target.files;
    this.thumbnails = [];

    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnails.push(e.target.result);
      };
      reader.readAsDataURL(this.files[i]);
    }
  }

  update() {
    this.projectData.append('title', this.project.title);
    this.projectData.append('chapitre', this.project.chapitre.toString());
    this.projectData.append('duree', this.project.duree.toString());
    this.projectData.append('disponibilite', this.project.disponibilite.toString());
    this.projectData.append('description', this.project.description);
    this.projectData.append('departement', this.project.department.toString());

    // Ajoutez les images à la FormData
    for (let i = 0; i < this.files.length; i++) {
      this.projectData.append('image', this.files[i]);
    }

    // Appelez le service pour ajouter le projet
    this.formationService.update(this.formationId, this.projectData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Formation modifiée avec succès'
        });        console.log('Formation modifiée avec succès', response);
        this.project = new Formation();
      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }
}
