import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BilanService } from 'src/app/service/bilan.service';
import { ManagerserviceService } from 'src/app/service/managerservice.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css'],
})
export class BilanComponent implements OnInit {
  token: string | null = null;
  members: any[] = [];
  filteredMembers: any[] = [];
  searchTerm: string = '';

  constructor(private authService: UserAuthService, private router: Router, private managerServiceService: ManagerserviceService, private bilanService: BilanService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.reloadData();
  }

  reloadData() {
    this.managerServiceService.getMembers().subscribe((data: any[]) => {
      this.members = data;
      this.filteredMembers = data;
      console.log(data);
      console.log(this.members);
    });
  }

  onSearch() {
    this.filteredMembers = this.members.filter(member =>
      `${member.nom} ${member.prenom}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  redirigerVersBilan(bilanId: number) {
    this.router.navigate(['/managerService/bilan-collab', bilanId]);
  }

  redirigerVersSession() {
    this.router.navigate(['/managerService/entretien-annuel']);
  }

  envoyerBilan(): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment envoyer le bilan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, envoyer!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.bilanService.envoyerBilan().subscribe(
          (response) => {
            console.log('Bilan envoyé avec succès !', response);
            Swal.fire({
              title: 'Succès!',
              text: 'Bilan envoyé avec succès!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de l\'envoi du bilan :', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur s\'est produite lors de l\'envoi du bilan.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'L\'envoi du bilan a été annulé',
          'error'
        );
      }
    });
  }
}
