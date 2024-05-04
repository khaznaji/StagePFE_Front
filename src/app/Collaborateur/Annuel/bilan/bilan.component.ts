import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class MesBilanComponent implements OnInit {

  bilansAnnuel!: any[];

  constructor(private bilanAnnuelService: BilanService ,     private router: Router
  ) { }

  ngOnInit(): void {
    this.getBilansAnnuel();
  }
  redirigerVersMiseAJourBilan(bilanId: number) {
    // Redirigez l'utilisateur vers la page de mise à jour du bilan avec l'ID du bilan en paramètre
    this.router.navigate(['/collaborateur/updateBilan', bilanId]);
  }
  redirigerVersBilan(bilanId: number) {
    // Redirigez l'utilisateur vers la page de mise à jour du bilan avec l'ID du bilan en paramètre
    this.router.navigate(['/collaborateur/bilan', bilanId]);
  }

  getBilansAnnuel() {
    this.bilanAnnuelService.mesBilansAnnuel().subscribe(
      (data) => {
        this.bilansAnnuel = data;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des bilans annuels : ', error);
      }
    );
  }}