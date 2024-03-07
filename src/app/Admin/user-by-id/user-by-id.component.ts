import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.css']
})
export class UserByIdComponent implements OnInit {
  userId!: number;
  userDetails: any; // Adjust the type based on your actual data structure

  constructor(private route: ActivatedRoute, private userService: UserService ,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.userService.getById(this.userId).subscribe(
      (response: any) => {
        this.userDetails = response;
        console.log(this.userDetails);  // Check the console for debugging
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  // Dans le composant TypeScript
redirectToUserDetail(userId: number) {
  console.log('Redirecting to user detail with ID:', userId);

  // Utilisez le service Router pour naviguer vers la route managerRh/user-detail/:id
  this.router.navigate(['/managerRh/user-detail', userId]);
}

}