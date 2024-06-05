import { Component, OnInit } from '@angular/core';
import { ManagerserviceService } from 'src/app/service/managerservice.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.css'],
})
export class ProfileManagerComponent implements OnInit {
  constructor(private formateurService: ManagerserviceService) {}
  ngOnInit(): void {
    this.getCollaborateurInfo();
  }
  userInfo: any;

  getCollaborateurInfo(): void {
    this.formateurService.getCollaborateurInfo().subscribe((data: any) => {
      this.userInfo = data;
      this.getPaginatedTeam();
      this.updatePagination();


      console.log(this.userInfo);
    });
  }
  paginatedPostes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  previousPageTeam() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedTeam();
    }
  }

  nextPageTeam() {
    if (this.currentPage < this.totalPages) {
      // Utilisez totalPages au lieu de totalPagesTeam
      this.currentPage++;
      this.getPaginatedTeam();
    }
  }
  paginatedTeam: any[] = []; // ou utilisez le type approprié pour vos membres d'équipe

  currentPageTeam: number = 1;
  itemsPerPageTeam: number = 5;
  getPaginatedTeam() {
    const startIndex = (this.currentPageTeam - 1) * this.itemsPerPageTeam;
    const endIndex = Math.min(
      startIndex + this.itemsPerPageTeam,
      this.userInfo.equipe.length
    );
    this.paginatedTeam = this.userInfo.equipe.slice(startIndex, endIndex);
  }
  getContractTypeClass(typeContrat: string): string {
    switch (typeContrat.toLowerCase()) {
      case 'cdi':
        return 'contract-pill cdi';
      case 'cdd':
        return 'contract-pill cdd';
      case 'temporaire':
        return 'contract-pill temporaire';
      case 'professionnalisation':
        return 'contract-pill professionnalisation';
      case 'temps partiel':
        return 'contract-pill temps-partiel';
      case 'consultant':
        return 'contract-pill consultant';
      default:
        return 'contract-pill';
    }
  }
  truncateDescription(description: string): string {
    // Divise la description en un tableau de lignes en utilisant le saut de ligne (\n) comme séparateur
    const lines = description.split('\n');

    // Vérifie s'il y a plus de trois lignes
    if (lines.length > 3) {
      // Si oui, prend uniquement les trois premières lignes et ajoute une ellipse
      return lines.slice(0, 2).join('\n') + '...';
    } else {
      // Si non, retourne simplement la description originale
      return description;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
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
}
