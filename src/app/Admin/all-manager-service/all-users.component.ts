import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  

  ngOnInit() {
    this.reloadData();
    this.getUserByid(localStorage.getItem('id'));
    this.filterOption = 'all';  // Set the default filter option
    this.applyFilter();         // Apply the default filter

  }
  
filterOption: string = 'all'; // Initialisez à la valeur par défaut

onFilterChange() {
  this.applyFilter();
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
      filteredEvents = filteredEvents.filter((event: { activated: boolean }) => event.activated);
      break;
    case 'deactivated':
      filteredEvents = filteredEvents.filter((event: { activated: boolean }) => !event.activated);
      break;
    default:
      // If "All" option is selected, reset the list
      break;
  }

  // Apply filter for dynamic search
  if (this.searchTerm) {
    const searchTermLower = this.searchTerm.toLowerCase();
    filteredEvents = filteredEvents.filter((event: any) =>
      Object.values(event).some(value => value && value.toString().toLowerCase().includes(searchTermLower))
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
      // No sorting
      break;
  }

  // Update the main list with sorted results
  this.filteredEvents = sortedEvents;
  this.p = 1; // Reset to the first page after applying the sort
}

p: number = 1; // Current page
itemsPerPage: number = 10; // Number of items per page
  pages: number[] = []; // Array to store page numbers
  totalPages: number = 0;
  events:any;
  data: any = [];
  username!:string;
  constructor(private userService: UserService  ,private router: Router,private http: HttpClient){ }
  getUserByid(id: any) {
    this.userService.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
    });
  }
  reloadData() {
    this.events = this.userService.getAllManagerServices().subscribe((res)=>{
      this.events=res;
      console.log(res);
      this.applyFilter(); // Apply the filter after loading the data

     });

  }
  ToList()
  {
    this.router.navigate(['managerRh/add-manager-service']);

  }

}
