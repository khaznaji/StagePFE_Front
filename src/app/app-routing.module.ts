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
import { AddQuizComponent } from './Manager/quiz/add-quiz/add-quiz.component';
import { ViewQuizComponent } from './Manager/quiz/view-quiz/view-quiz.component';
import { UpdateQuizComponent } from './Manager/quiz/update-quiz/update-quiz.component';
import { AddQuestionComponent } from './Manager/quizQuestions/add-question/add-question.component';
import { ViewQuestionComponent } from './Manager/quizQuestions/view-question/view-question.component';
import { UpdateQuestionComponent } from './Manager/quizQuestions/update-question/update-question.component';
import { DisplayDemandePublieComponent } from './Manager/DemandePublie/display-demande-publie/display-demande-publie.component';
import { PostByIdComponent } from './Manager/display-mes-postes/PostEncours/post-by-id/post-by-id.component';
import { GetpostebyidComponent } from './Admin/Poste/getpostebyid/getpostebyid.component';
import { MestesttechniqueComponent } from './Collaborateur/poste/mestesttechnique/mestesttechnique.component';
import { StartTestComponent } from './Collaborateur/poste/start-test/start-test.component';
import { InterviewOnlineComponent } from './Collaborateur/Entretien/interview-online/interview-online.component';
import { FullCalendarComponent } from './Admin/Poste/getpostebyid/full-calendar/full-calendar.component';
import { MesEntretiensComponent } from './Collaborateur/Entretien/mes-entretiens/mes-entretiens.component';
import { MesEntretienManagerComponent } from './Manager/mes-entretien-manager/mes-entretien-manager.component';
import { EvaluateInterviewComponent } from './Manager/mes-entretien-manager/evaluate-interview/evaluate-interview.component';
import { ThankYouComponent } from './Collaborateur/Entretien/thank-you/thank-you.component';
import { FullCalendarRhComponent } from './Admin/Poste/getpostebyid/full-calendar-rh/full-calendar-rh.component';
import { MesEntretiensRhComponent } from './Admin/Entretiens/mes-entretiens-rh/mes-entretiens-rh.component';
import { EntretienRhCollabComponent } from './Collaborateur/Entretien/entretien-rh-collab/entretien-rh-collab.component';
import { EvaluateInterviewRhComponent } from './Admin/Entretiens/evaluate-interview-rh/evaluate-interview-rh.component';
import { AllFormateurComponent } from './Admin/Formateur/List/all-formateur/all-formateur.component';
import { FormateurMenuComponent } from './menu/formateur-menu/formateur-menu.component';
import { CreateFormationComponent } from './Formateur/create-formation/create-formation.component';
import { AllFormationsComponent } from './Formateur/all-formations/all-formations.component';
import { ListeDesFormationsComponent } from './Collaborateur/Formation/liste-des-formations/liste-des-formations.component';
import { DemandeDesCollabsComponent } from './Manager/Formations/demande-des-collabs/demande-des-collabs.component';
import { MesDemandesComponent } from './Collaborateur/Formation/mes-demandes/mes-demandes.component';
import { ListFormationComponent } from './Admin/Formation/list-formation/list-formation.component';
import { DemandeFormationsComponent } from './Admin/Formation/demande-formations/demande-formations.component';
import { CreateGroupsComponent } from './Manager/Formations/create-groups/create-groups.component';

const routes: Routes = [
  {
    path: '',
    component: MenuloginComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'request-password', component: RequestPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'activate-account', component: ActivationCompteComponent },
    ],
  },
  {
    path: 'managerRh',
    component: AdminMenuComponent,
    children: [
      { path: 'all-manager-service', component: AllUsersComponent },
      { path: 'all-formateurs', component: AllFormateurComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'add-manager-service', component: AddCompteComponent },
      { path: 'add-collaborateur', component: AddCompteCollabComponent },
      { path: 'competence', component: GestionCompetenceComponent },
      { path: 'all-collaborateur', component: AllcollabComponent },
      { path: 'user-detail/:id', component: UserByIdComponent },
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'demande-poste', component: GetallposteComponent },
      { path: 'poste-candidats', component: CandidatureComponent },
      { path: 'poste/:postId', component: GetpostebyidComponent },
      { path: 'fullcalendar/:postId', component: FullCalendarComponent },
      { path: 'fullcalendarRh/:postId', component: FullCalendarRhComponent },
      { path: 'mes-entretiens-Rh', component: MesEntretiensRhComponent },
      { path: 'create-group/:formationId', component: CreateGroupsComponent },
      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
      },
      {
        path: 'evaluate-interview-Rh/:candidatureId',
        component: EvaluateInterviewRhComponent,
      },
      {
        path: 'all-formations',
        component: ListFormationComponent,
      },
      { path: 'formation-byId/:id', component: DemandeFormationsComponent },

    ],
  },

  {
    path: 'collaborateur',
    component: CollabMenuComponent,
    children: [
      { path: 'all-poste', component: GetAllPosteCollabComponent },
      { path: 'all-formations', component: ListeDesFormationsComponent },

      { path: 'compte', component: ProfileComponent },
      { path: 'mes-postulations', component: MespostulationsComponent },
      { path: 'profile', component: GestionProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'mes-tests-techniques', component: MestesttechniqueComponent },
      { path: 'start-test/:qid/:candidatureId', component: StartTestComponent },
      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
      },
      { path: 'mes-entretiens', component: MesEntretiensComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: 'mes-entretiens-Rh', component: EntretienRhCollabComponent },
      { path: 'mes-demandes-formation', component: MesDemandesComponent },

    ],
  },

  {
    path: 'managerService',
    component: ManagerMenuComponent,
    children: [
      { path: 'add-fiche-de-poste', component: AddFicheDePosteComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'mes-postes', component: DisplayMesPostesComponent },
      { path: 'edit-postes/:postId', component: EditFicheComponent },
      { path: 'poste/:postId', component: GestionPosteByIdComponent },
      { path: 'postes-approuve', component: AppouvedPosteComponent },
      { path: 'poste-approuve/:postId', component: PostApprouvedIdComponent },
      { path: 'add-test/:postId', component: AddQuizComponent },
      { path: 'update-test/:id', component: UpdateQuizComponent },
      { path: 'all-test', component: ViewQuizComponent },
      { path: 'add-question/:id', component: AddQuestionComponent },
      { path: 'view-question/:qid/:qtitle', component: ViewQuestionComponent },
      { path: 'update-question/:quesId', component: UpdateQuestionComponent },
      { path: 'poste-publie', component: DisplayDemandePublieComponent },
      { path: 'poste-encours/:postId', component: PostByIdComponent },
      { path: 'mes-entretiens', component: MesEntretienManagerComponent },
      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
      },
      {
        path: 'evaluate-interview/:candidatureId',
        component: EvaluateInterviewComponent,
      },
      { path: 'demande-formation', component: DemandeDesCollabsComponent },

    ],
  },
  {
    path: 'formateur',
    component: FormateurMenuComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'all', component: AllFormationsComponent },

      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
