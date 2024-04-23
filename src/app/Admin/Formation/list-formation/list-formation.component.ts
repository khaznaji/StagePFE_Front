import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormationDetailComponent } from 'src/app/Collaborateur/Formation/formation-detail/formation-detail.component';
import { FormationService } from 'src/app/service/formation.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent implements OnInit {
  ngOnInit(): void {
    this.reloadData(); 
  }
  constructor(private formationService : FormationService ,    private modalService: BsModalService , private http: HttpClient , private authService: UserAuthService 
  ){}
  reloadData() {
    this.events = this.formationService.FormationDisponible().subscribe((res) => {
      this.events = res;
      console.log(res);
    });
  }
  events: any;
 

  
  }
  