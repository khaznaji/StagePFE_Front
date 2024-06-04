import { Component, OnInit } from '@angular/core';
import { CreateFormationComponent } from '../create-formation/create-formation.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/service/user.service';
import { FormationService } from 'src/app/service/formation.service';
import { GetByIdFormationComponent } from '../get-by-id-formation/get-by-id-formation.component';
import { UpdateFormationComponent } from '../update-formation/update-formation.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-formations',
  templateUrl: './all-formations.component.html',
  styleUrls: ['./all-formations.component.css'],
})
export class AllFormationsComponent implements OnInit {
  ngOnInit() {
    this.reloadData();
    this.getUserByid(localStorage.getItem('id'));
    this.filterOption = 'all'; // Set the default filter option
    this.applyFilter(); // Apply the default filter
    this.applyFilters(); // Apply the default filter

  }

  filterOption: string = 'all'; // Initialisez à la valeur par défaut

  onFilterChange() {
    this.applyFilter();
    this.applyFilters();

  }
  searchTerm: string = '';
  filteredEvents: any[] = [];

  // Ajoutez cette fonction pour détecter le changement de l'option de filtre
  applyFilter() {
    // Copy the main list to avoid modifying it directly
    let filteredEvents = [...this.events];

    // Apply filter based on the selected option
    switch (this.filterOption) {
      case 'activated':
        filteredEvents = filteredEvents.filter(
          (event: { activated: boolean }) => event.activated
        );
        break;
      case 'deactivated':
        filteredEvents = filteredEvents.filter(
          (event: { activated: boolean }) => !event.activated
        );
        break;
      default:
        // If "All" option is selected, reset the list
        break;
    }

    // Apply filter for dynamic search
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter((event: any) =>
        Object.values(event).some(
          (value) =>
            value && value.toString().toLowerCase().includes(searchTermLower)
        )
      );
    }

    // Update the main list with filtered results
    this.filteredEvents = filteredEvents;
    this.p = 1;
  }
  sortOption: string = 'recent';

  applySort() {
    // Copy the main list to avoid modifying it directly
    let sortedEvents = [...this.filteredEvents];

    // Sort based on the selected option
    switch (this.sortOption) {
      case 'recent':
        sortedEvents = sortedEvents.sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        break;
      case 'old':
        sortedEvents = sortedEvents.sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        break;
      default:
        break;
    }
    this.filteredEvents = sortedEvents;
    this.p = 1;
  }

  p: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  events: any;
  data: any = [];
  username!: string;
  constructor(
    private userService: UserService,
    private formationService: FormationService,
    private router: Router,
    private http: HttpClient,
    private modalService: BsModalService
  ) {}
  getUserByid(id: any) {
    this.userService.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
    });
  }
  reloadData() {
    this.events = this.formationService.mesformations().subscribe((res) => {
      this.events = res;
      console.log(res);
      this.applyFilter(); 
      this.applyFilters(); // Apply the filter after loading the data
      // Apply the filter after loading the data
    });
  }
  ToList() {
    this.router.navigate(['managerRh/add-manager-service']);
  }
  modalRef!: BsModalRef;

  openModal() {
    this.modalRef = this.modalService.show(CreateFormationComponent);
  }
  // openModalById(formationId: number): void {
  //   const initialState = {
  //     formationId: formationId,
  //   };
  //   this.modalRef = this.modalService.show(GetByIdFormationComponent, {
  //     initialState,
  //   });
  // }
  openModalUpdate(formationId: number): void {
    const initialState = {
      formationId: formationId,
    };
    this.modalRef = this.modalService.show(UpdateFormationComponent, {
      initialState,
    });
  }
  applyFilters() {
    // Copy the main list to avoid modifying it directly
    let filteredEvents = [...this.events];
  
    // Apply filter based on the selected option
    switch (this.filterOption) {
      case 'disponible':
        filteredEvents = filteredEvents.filter((event: any) => event.disponibilite);
        break;
      case 'non-disponible':
        filteredEvents = filteredEvents.filter((event: any) => !event.disponibilite);
        break;
      default:
        // If "Toutes" option is selected, reset the list
        break;
    }
  
    // Update the main list with filtered results
    this.filteredEvents = filteredEvents;
    this.p = 1;
  }
  
  deleteFormation(quesId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Etes vous sûre de supprimer cette formation ?',
      confirmButtonText: 'Supprimer',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.deleteFormation(quesId).subscribe(
          (data) => {
            this.reloadData();
            Swal.fire('Success!', 'Formation Supprimée', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Une erreur est survenue ', 'error');
          }
        );
      }
    });
  }
}
