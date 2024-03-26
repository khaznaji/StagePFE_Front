import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/model/competence.model';
import { CompetenceService } from 'src/app/service/competence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-competence',
  templateUrl: './gestion-competence.component.html',
  styleUrls: ['./gestion-competence.component.css']
})
export class GestionCompetenceComponent implements OnInit {
  ngOnInit() {
    this.reloadDatsa();
    this.updatePagedCategories();

  }
  replaceUnderscoreWithSpace(domaine: string): string {
    return domaine.replace(/_/g, ' ');
  }
  domaines: string[] = [
    'HardSkills' ,'SoftSkills'
  ];
  newCategoryName = '';
  id=0;
  categories:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(private categoryService: CompetenceService, private toastr: ToastrService) {}
  
  events:any;

  reloadDatsa() {
    this.events = this.categoryService.getAll().subscribe((res)=>{
      this.events=res;
      console.log(res);
  
     });}
  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.reloadDatsa();
  }
  updatePagedCategories(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCategories = this.categories.slice(startIndex, endIndex);
  }
  filteredCategories: Competence[] = [];
  selectedImage: File | null = null;
  imagePreview: string | undefined;
  newCategory: Competence = new Competence();
  file: File | null = null;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      // Générer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    } 
  }
  createCategory() {
    if (!this.events) {
      console.error('Categories are undefined or null.');
      return;
    }
  
    if (!this.selectedCategory) { 
      if (!this.newCategory || !this.newCategory.nom || !this.newCategory.domaine) {
        console.error('Category or image is undefined.');
        this.toastr.error('Nom and Domaine are required', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
        return;
      }
  
      if (this.events.some((category: Competence) => category.nom === this.newCategory.nom)) {
        this.toastr.error('Competence already exists', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
        return;
      }
    console.log(this.newCategory);
      this.categoryService.addCompetence(this.newCategory).subscribe(
        (data) => {
          console.log('Category created successfully!', data);
          
          this.reloadDatsa();
          this.clearForm();
          window.location.reload();        },
        (error) => {
          console.error('Error creating category:', error);
          console.log(this.newCategory.nom);
        }
       ) 
    } else {
      this.selectedCategory.nom = this.newCategory.nom;
      // Update the selected category
      if (!this.newCategory.nom || !this.newCategory.domaine) {
        console.error(' category or image.');
        this.toastr.error('Nom and Domaine sont obligatoire  ', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
          return;
      }
      // Mettez à jour le domaine de la catégorie sélectionnée
      this.selectedCategory.domaine = this.newCategory.domaine;

      this.categoryService.updateCompetence(this.selectedCategory.id, this.selectedCategory).subscribe(
        () => {
          console.log('Category updated successfully!');
          this.toastr.success('Category updated successfully', '', {
            positionClass: 'toast-top-center', // Positionnez-le en haut au centre
            timeOut: 5000,
            progressBar: true,
            toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
            // Ajoutez d'autres options de personnalisation de style ici
          });
          this.reloadDatsa();
          this.clearForm();
          window.location.reload();
        },
        (error) => {
          console.error('Error updating category:', error);
          console.log('Category ID:', this.selectedCategory.id);
        }
      ); 
    }
  }

  deleteEvents = (id: number) => {
    // Utiliser SweetAlert pour afficher une confirmation
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cette compétence ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer", alors supprimer la compétence
        this.categoryService.deleteCompetence(id).subscribe(() => {
          // Utiliser SweetAlert pour afficher un message de suppression réussie
          Swal.fire({
            title: 'Supprimé !',
            text: 'La compétence a été supprimée avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Recharger la page après la suppression
            window.location.reload();
          });
        });
      }
    });
  }
  selectedCategory!: Competence; // New property to store the selected category for update
  editCategory(category: Competence) {
    // Set the selected category for update
    this.selectedCategory = { ...category };
    this.newCategory.nom = category.nom;
    // Assurez-vous également de copier le domaine
    this.newCategory.domaine = category.domaine;
}

  cancelUpdate() {
    this.clearForm();
  }
  clearForm() {
    // Clear the selected category and form
    this.selectedCategory ;
    this.newCategoryName = '';
  }
  isAddCategoryModalVisible: boolean = false;
  // Méthode pour afficher le modal
  showAddCategoryModal() {
    this.isAddCategoryModalVisible = true;
  }
  closeAddCategoryModal() {
    this.isAddCategoryModalVisible = false;
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback for drag over
    // For example, add a CSS class to the drag-drop-area
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback for drag leave
    // For example, remove the CSS class from the drag-drop-area
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.handleFileSelection();
    }
  }
  isDragOver: boolean = false; // Add this line
  onFileSelected2(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.handleFileSelection();
    }
  }
  handleFileSelection(): void {
    // Your existing logic for handling file selection
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(this.file!);
  }
  removeImage() {
    // Remove the selected image
    this.file = null;
    this.imagePreview = undefined;
    // Reset the file input to allow selecting the same file again
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  openFileInput() {
    // Trigger the file input click event
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  subcategoryIdsToDelete: number[] = [];
  toggleDelete(subcategoryId: number | undefined) {
    if (subcategoryId === undefined) {
      console.error('Invalid Categories  id.');
      return;
    }
    const index = this.subcategoryIdsToDelete.indexOf(subcategoryId);
    if (index !== -1) {
      // Subcategory is already selected, so remove it
      this.subcategoryIdsToDelete.splice(index, 1);
    } else {
      // Subcategory is not selected, so add it
      this.subcategoryIdsToDelete.push(subcategoryId);
    }
  }
  deleteSelectedSubcategories() {
    if (this.subcategoryIdsToDelete.length === 0) {
      console.error('No Categories selected for deletion.');
      this.toastr.error('No Categories selected for deletion', '', {
        positionClass: 'toast-top-center', // Positionnez-le en haut au centre
        timeOut: 5000,
        progressBar: true,
        toastClass: 'ngx-toastre', // Appliquez les styles personnalisés
      });
      return;
    }
    const warningMessage = 'Warning: Deleting selected categories will also delete associated subcategories. Are you sure you want to proceed?';
    const userConfirmed = confirm(warningMessage);
  //   this.categoryService.deleteMultipleSubcategories(this.subcategoryIdsToDelete).subscribe(
  //     () => {
  //       console.log('Categories deleted successfully.');
  //       this.toastr.success('Categories deleted successfully', '', {
  //         positionClass: 'toast-top-center', // Positionnez-le en haut au centre
  //         timeOut: 5000,
  //         progressBar: true,
  //         toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
  //         // Ajoutez d'autres options de personnalisation de style ici
  //       });
  //       window.location.reload();

  //       // Refresh the subcategories list or update the UI as needed
  //     },
  //     error => {
  //       console.error('Error deleting subcategories:', error);
  //     }
  //   );
  // }
 
  // deleteAllSubcategories() {
  //   const warningMessage = 'Warning: Deleting all categories will also delete associated subcategories. Are you sure you want to proceed?';
  //   const userConfirmed = confirm(warningMessage);
  //   if (userConfirmed) {
  //     this.categoryService.deleteAllSubcategories().subscribe(
  //       () => {
  //         console.log('All Categories deleted successfully.');
  //         this.toastr.success('All Categories deleted successfully', '', {
  //           positionClass: 'toast-top-center', // Positionnez-le en haut au centre
  //           timeOut: 5000,
  //           progressBar: true,
  //           toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
  //           // Ajoutez d'autres options de personnalisation de style ici
  //         });      
  //         window.location.reload();
  //       },
  //       error => {
  //         console.error('Error deleting all Categories:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Deletion cancelled by the user.');
  //   }
  // }
  }}