import { Component, OnInit } from '@angular/core';
import { FormateurService } from 'src/app/service/formateur.service';

@Component({
  selector: 'app-profile-formateur',
  templateUrl: './profile-formateur.component.html',
  styleUrls: ['./profile-formateur.component.css']
})
export class ProfileFormateurComponent implements OnInit {
  constructor( private formateurService : FormateurService){}
  ngOnInit(): void {
    this.getCollaborateurInfo();
  
 }
 userInfo: any;

 getCollaborateurInfo(): void {
  this.formateurService.getCollaborateurInfo()
    .subscribe((data: any) => {
      this.userInfo = data;
      this.updatePagination(); // Ajoutez cette ligne pour initialiser la pagination

      console.log(this.userInfo)
    });
}
paginatedPostes: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 3;
totalPages: number = 1;
getPaginatedFormations() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.userInfo.formationCrees.slice(startIndex, endIndex);
}
previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagination();
  }
}

updatePagination(): void {
  if (this.userInfo && this.userInfo.postesCrees) {
    this.totalPages = Math.ceil(
      this.userInfo.postesCrees.length / this.itemsPerPage
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPostes = this.userInfo.postesCrees.slice(
      startIndex,
      endIndex
    );
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePagination();
  }
}
}
