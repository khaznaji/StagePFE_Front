import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';

@Component({
  selector: 'app-display-mes-postes',
  templateUrl: './display-mes-postes.component.html',
  styleUrls: ['./display-mes-postes.component.css']
})
export class DisplayMesPostesComponent implements OnInit{
  ngOnInit(): void {
    this.getApprovedPostes();
  }

  approvedPostes!: any[];
  constructor(private posteService: PosteService , private router: Router){}
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  cardStates: boolean[] = []; 
  approuveParManagerRH: boolean = false;
  archive: boolean = false;
  encours: boolean = false;// Tableau pour stocker l'état de chaque carte
  ToList()
  {
    this.router.navigate(['managerService/add-fiche-de-poste']);

  }
filterPostes(): any[] {
    let filteredPostes = this.approvedPostes;

    // Filtrer par état spécifique
    if (this.approuveParManagerRH) {
        filteredPostes = filteredPostes.filter(poste => poste.approuveParManagerRH);
    } else if (this.archive) {
        filteredPostes = filteredPostes.filter(poste => poste.archive);
    } else if (this.encours) {
        filteredPostes = filteredPostes.filter(poste => poste.encours);
    }

    // Supprimer les postes vides
    filteredPostes = filteredPostes.filter(poste => poste.titre);

    return filteredPostes;
}


   
  toggleFormVisibility(index: number): void {
    // Inversion de l'état de la carte à l'index spécifié
    this.cardStates[index] = !this.cardStates[index];
  }
  getApprovedPostes(): void {
    this.posteService.mespostes()
      .subscribe(
        (data) => {
          this.approvedPostes = data;
          this.filterPostes(); 
          console.log('Approved Postes:', this.approvedPostes);
        },
        (error) => {
          console.error('Error fetching approved postes:', error);
        }
      );
  }
 
}
