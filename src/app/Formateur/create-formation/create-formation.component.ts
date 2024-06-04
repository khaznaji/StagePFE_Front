import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent implements OnInit{
  projectData: FormData = new FormData();
  files: File[] = [];
  project: Formation = new Formation();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: Formation[] = [];
  
  adminProjects: Formation[] = [];
  price!: number;
  projectForm: FormGroup;
  selectedFile!: File;
  selectedFiles!: File;
  status: boolean = true;

  constructor(private formBuilder: FormBuilder,private projectService: FormationService , private router : Router  )
   {   this.projectForm = this.formBuilder.group({
    price: ['', Validators.required] // Ajoutez Validators.required pour la validation
  });}
  
  ngOnInit(): void {
  }

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

thumbnails: string[] = []; 




addProject() {
  // Ajoutez les champs du projet à la FormData
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
  this.projectService.addProject(this.projectData).subscribe(
    response => {
      // Réponse réussie, effectuez les actions nécessaires
      console.log('Projet ajouté avec succès', response);

      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Succès',
        text: 'Formation ajoutée avec succès',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        // Redirect to '/formateur/all' if user clicks OK
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
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
