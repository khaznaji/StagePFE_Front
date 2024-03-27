import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './User/signup/signup.component';
import { SigninComponent } from './User/signin/signin.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';
import { RequestPasswordComponent } from './User/request-password/request-password.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ActivationCompteComponent } from './User/activation-compte/activation-compte.component';
import { EditProfileComponent } from './Collaborateur/edit-profile/edit-profile.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AcceuilComponent } from './Collaborateur/acceuil/acceuil.component';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { CollabMenuComponent } from './menu/collab-menu/collab-menu.component';
import { ManagerMenuComponent } from './menu/manager-menu/manager-menu.component';
import { AddCompteComponent } from './Admin/ManagerService/add-compte/add-compte.component';
import { AddCompteCollabComponent } from './Admin/Collaborateur/add-compte-collab/add-compte-collab.component';
import { GestionCompetenceComponent } from './Admin/Competence/gestion-competence/gestion-competence.component';
import { AllcollabComponent } from './Admin/Collaborateur/List/allcollab/allcollab.component';
import { AllUsersComponent } from './Admin/all-manager-service/all-users.component';
import { UserByIdComponent } from './Admin/user-by-id/user-by-id.component';
import { DashboardAdminComponent } from './Admin/dashboard/dashboard-admin/dashboard-admin.component';
import { AddFicheDePosteComponent } from './Manager/add-fiche-de-poste/add-fiche-de-poste.component';
import { GetallposteComponent } from './Admin/Poste/getallposte/getallposte.component';
import { GetAllPosteCollabComponent } from './Collaborateur/poste/get-all-poste-collab/get-all-poste-collab.component';
import { MespostulationsComponent } from './Collaborateur/poste/mespostulations/mespostulations.component';
import { DisplayMesPostesComponent } from './Manager/display-mes-postes/display-mes-postes.component';
import { EditFicheComponent } from './Manager/edit-fiche/edit-fiche.component';
import { GestionProfileComponent } from './Collaborateur/gestion-profile/gestion-profile.component';
import { AddCompetenceModalComponent } from './Manager/edit-fiche/add-competence-modal/add-competence-modal.component';
import { GestionPosteByIdComponent } from './Manager/gestion-poste-by-id/gestion-poste-by-id.component';
import { CandidatureComponent } from './Admin/Poste/candidature/candidature.component';
import { AppouvedPosteComponent } from './Manager/display-mes-postes/DemandeApprouve/appouved-poste/appouved-poste.component';
import { PostApprouvedIdComponent } from './Manager/display-mes-postes/PostApprouvedId/post-approuved-id/post-approuved-id.component';

const routes: Routes = [
  
  {path:"",component:MenuloginComponent,
  children:[
    { path: 'signup', component:SignupComponent  },
    { path: 'signin', component:SigninComponent  }, 
    { path: 'request-password', component:RequestPasswordComponent  }, 
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'activate-account', component: ActivationCompteComponent },
  ]}
 ,
 {  path: 'managerRh', component: AdminMenuComponent ,children: [
  {path:'all-manager-service', component:AllUsersComponent},
  {path:'edit-profile', component:EditProfileComponent},
  {path:'profile', component:ProfileComponent},
  {path:'add-manager-service', component:AddCompteComponent},
  {path:'add-collaborateur', component:AddCompteCollabComponent},
  {path:'competence', component:GestionCompetenceComponent},
  {path:'all-collaborateur', component:AllcollabComponent},
  {path:'user-detail/:id', component:UserByIdComponent},
  {path:'dashboard', component:DashboardAdminComponent},
  {path:'demande-poste', component:GetallposteComponent},
  {path:'poste-candidats', component:CandidatureComponent},

]},

{  path: 'collaborateur', component: CollabMenuComponent ,children: [
  {path:'all-poste', component:GetAllPosteCollabComponent},
  {path:'compte', component:ProfileComponent},
  {path:'mes-postulations', component:MespostulationsComponent},
  {path:'profile', component:GestionProfileComponent},
  {path:'edit-profile', component:EditProfileComponent},


]}, 


{  path: 'managerService', component: ManagerMenuComponent ,children: [
  {path:'add-fiche-de-poste', component:AddFicheDePosteComponent},
  {path:'profile', component:ProfileComponent},
  {path:'mes-postes', component:DisplayMesPostesComponent}, 
  {path:'edit-postes/:postId', component:EditFicheComponent}, 
  {path:'poste/:postId', component: GestionPosteByIdComponent}, 
  {path:'postes-approuve', component:AppouvedPosteComponent}, 
  {path:'poste-approuve/:postId', component:PostApprouvedIdComponent}, 

]}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
