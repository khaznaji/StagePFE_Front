import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/model/candidature.model';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';

@Component({
  selector: 'app-mespostulations',
  templateUrl: './mespostulations.component.html',
  styleUrls: ['./mespostulations.component.css']
})
export class MespostulationsComponent implements OnInit{
  postulations: Candidature[] = [];
  constructor(private posteService : PosteService) { }
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  cardStates: boolean[] = []; // Tableau pour stocker l'état de chaque carte

  ngOnInit(): void {
    this.getPostulations();
    this.postulations.forEach(() => this.cardStates.push(false));

  }

  isFormVisible: boolean = false;


  toggleFormVisibility(index: number): void {
    // Inversion de l'état de la carte à l'index spécifié
    this.cardStates[index] = !this.cardStates[index];
  }
 
  getPostulations() {
    this.posteService.getMesPostulations()
      .subscribe(
        (data: Candidature[]) => {
          this.postulations = data;
          console.log('Postulations récupérées:', this.postulations);
        },
        error => {
          console.error('Une erreur s\'est produite:', error);
        }
      );
  }

}
