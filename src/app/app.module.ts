import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './User/Dialog/success-dialog/success-dialog.component';
import { SigninComponent } from './User/signin/signin.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecaptchaModule } from "ng-recaptcha";

import { RequestPasswordComponent } from './User/request-password/request-password.component';
import { EmailSuccessComponent } from './User/Dialog/email-success/email-success.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ActivationCompteComponent } from './User/activation-compte/activation-compte.component';
import { ActivationreussieComponent } from './User/Dialog/activationreussie/activationreussie.component';
import { MotdepasseComponent } from './User/Dialog/motdepasse/motdepasse.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { CollabMenuComponent } from './menu/collab-menu/collab-menu.component';
import { ManagerMenuComponent } from './menu/manager-menu/manager-menu.component';
import { AddCompteComponent } from './Admin/ManagerService/add-compte/add-compte.component';
import { AddCompteCollabComponent } from './Admin/Collaborateur/add-compte-collab/add-compte-collab.component';
import { GestionCompetenceComponent } from './Admin/Competence/gestion-competence/gestion-competence.component';
import {MatInputModule} from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
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
import { EditProfileComponent } from './Collaborateur/edit-profile/edit-profile.component';
import { EvaluationPopUpComponent } from './Collaborateur/gestion-profile/evaluation-pop-up/evaluation-pop-up.component';
import { BioPopUpComponent } from './Collaborateur/gestion-profile/bio-pop-up/bio-pop-up.component';
import { AddCompetenceModalComponent } from './Manager/edit-fiche/add-competence-modal/add-competence-modal.component';
import { AjouterCompetenceModalComponent } from './Manager/add-fiche-de-poste/ajouter-competence-modal/ajouter-competence-modal.component';
import { GestionPosteByIdComponent } from './Manager/gestion-poste-by-id/gestion-poste-by-id.component';
import { ViewCandidateByIdComponent } from './Manager/gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { FilterPipe } from './Manager/gestion-poste-by-id/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CandidatureComponent } from './Admin/Poste/candidature/candidature.component';
import { AppouvedPosteComponent } from './Manager/display-mes-postes/DemandeApprouve/appouved-poste/appouved-poste.component';
import { PostApprouvedIdComponent } from './Manager/display-mes-postes/PostApprouvedId/post-approuved-id/post-approuved-id.component';
import { AddQuizComponent } from './Manager/quiz/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './Manager/quiz/update-quiz/update-quiz.component';
import { ViewQuizComponent } from './Manager/quiz/view-quiz/view-quiz.component';
import { AddQuestionComponent } from './Manager/quizQuestions/add-question/add-question.component';
import { UpdateQuestionComponent } from './Manager/quizQuestions/update-question/update-question.component';
import { ViewQuestionComponent } from './Manager/quizQuestions/view-question/view-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DisplayDemandePublieComponent } from './Manager/DemandePublie/display-demande-publie/display-demande-publie.component';
import { PostByIdComponent } from './Manager/display-mes-postes/PostEncours/post-by-id/post-by-id.component';
import { GetpostebyidComponent } from './Admin/Poste/getpostebyid/getpostebyid.component';
import { MestesttechniqueComponent } from './Collaborateur/poste/mestesttechnique/mestesttechnique.component';
import { StartTestComponent } from './Collaborateur/poste/start-test/start-test.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmbedVideoService } from 'ngx-embed-video';
import { InterviewOnlineComponent } from './Collaborateur/Entretien/interview-online/interview-online.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from './Admin/Poste/getpostebyid/full-calendar/full-calendar.component';
import { MesEntretiensComponent } from './Collaborateur/Entretien/mes-entretiens/mes-entretiens.component';
import { MesEntretienManagerComponent } from './Manager/mes-entretien-manager/mes-entretien-manager.component';
import { EvaluateInterviewComponent } from './Manager/mes-entretien-manager/evaluate-interview/evaluate-interview.component';
import { ThankYouComponent } from './Collaborateur/Entretien/thank-you/thank-you.component';
import { EntretienRhComponent } from './Manager/gestion-poste-by-id/entretien-rh/entretien-rh.component';

@NgModule({
  declarations: [
    AppComponent, SignupComponent, SuccessDialogComponent, SigninComponent,
    AllUsersComponent, MenuloginComponent, RequestPasswordComponent, 
    EmailSuccessComponent, ResetPasswordComponent, ActivationCompteComponent,
    ActivationreussieComponent,MotdepasseComponent, ProfileComponent,
    AdminMenuComponent, CollabMenuComponent,ManagerMenuComponent, AddCompteComponent, 
    AddCompteCollabComponent, GestionCompetenceComponent, AllcollabComponent, UserByIdComponent, 
    DashboardAdminComponent, AddFicheDePosteComponent, GetallposteComponent, GetAllPosteCollabComponent,
    MespostulationsComponent, DisplayMesPostesComponent, EditFicheComponent, GestionProfileComponent,
    EditProfileComponent,
    EvaluationPopUpComponent,
    BioPopUpComponent,
    AddCompetenceModalComponent,
    AjouterCompetenceModalComponent,
    GestionPosteByIdComponent,
    ViewCandidateByIdComponent,FilterPipe, CandidatureComponent, AppouvedPosteComponent,
    PostApprouvedIdComponent, AddQuizComponent, UpdateQuizComponent, ViewQuizComponent,
    AddQuestionComponent, UpdateQuestionComponent, ViewQuestionComponent, DisplayDemandePublieComponent, PostByIdComponent, GetpostebyidComponent, MestesttechniqueComponent, StartTestComponent, InterviewOnlineComponent, FullCalendarComponent, MesEntretiensComponent, MesEntretienManagerComponent, EvaluateInterviewComponent, ThankYouComponent, EntretienRhComponent

  ],
  imports: [
    FullCalendarModule ,
    MatProgressSpinnerModule,
    MatProgressBarModule, // Importez MatProgressSpinnerModule ici
    MatRadioModule,
    MatCardModule, // Importez MatCardModule ici
    MatDividerModule,
    BrowserModule , 
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,MatInputModule, MatButtonModule,
    NgxPaginationModule,
    AppRoutingModule,    
    HttpClientModule, FormsModule, MatDialogModule, BrowserAnimationsModule,
    ModalModule.forRoot(),  
    RecaptchaModule, 
    MatPaginatorModule,
        ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      // Ajoutez d'autres options de personnalisation de style ici
    }),BrowserAnimationsModule,
    ButtonsModule.forRoot(),

    BsDropdownModule.forRoot(),     DragDropModule,

    CKEditorModule,
    FullCalendarModule 

    
 
  ],
  providers: [
    EmbedVideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
