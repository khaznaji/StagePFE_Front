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
import { CreateGroupsComponent } from './Admin/Formation/create-groups/create-groups.component';
import { CreateSessionComponent } from './Admin/Formation/create-session/create-session.component';
import { GetByIdFormationComponent } from './Formateur/get-by-id-formation/get-by-id-formation.component';
import { BilanComponent } from './Manager/Annuel/bilan/bilan.component';
import { MesBilanComponent } from './Collaborateur/Annuel/bilan/bilan.component';
import { UpdateBilanComponent } from './Collaborateur/Annuel/update-bilan/update-bilan.component';
import { SessionsFormationsCollabComponent } from './Collaborateur/Formation/sessions-formations-collab/sessions-formations-collab.component';
import { MesSessionsFormateurComponent } from './Formateur/mes-sessions-formateur/mes-sessions-formateur.component';
import { MeetFormationsComponent } from './Formateur/meet-formations/meet-formations.component';
import { GetBilanByIdCollabComponent } from './Collaborateur/Annuel/get-bilan-by-id-collab/get-bilan-by-id-collab.component';
import { ListBilanDesCollabComponent } from './Manager/Annuel/list-bilan-des-collab/list-bilan-des-collab.component';
import { GetBilanByIdComponent } from './Manager/Annuel/get-bilan-by-id/get-bilan-by-id.component';
import { EntretienAnnuelCalendarComponent } from './Manager/Annuel/entretien-annuel-calendar/entretien-annuel-calendar.component';
import { MesEntretienAnnuelManagerComponent } from './Manager/Annuel/mes-entretien-annuel-manager/mes-entretien-annuel-manager.component';
import { ChatComponent } from './User/chat/chat.component';
import { DashboardManagerRhComponent } from './Admin/dashboard-manager-rh/dashboard-manager-rh.component';
import { AudioRecorderComponent } from './Collaborateur/audio-recorder/audio-recorder.component';
import { ViewCandidateByIdComponent } from './Manager/gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { AuthGuard } from './service/auth.guard';
import { ProfileUsersComponent } from './User/profile-users/profile-users.component';
import { HistoriqueDesPosteComponent } from './Manager/historique-des-poste/historique-des-poste.component';
import { PosteArchiveByIdComponent } from './Manager/poste-archive-by-id/poste-archive-by-id.component';
import { DashboardManagerServiceComponent } from './Manager/dashboard-manager-service/dashboard-manager-service.component';
import { GetCertificatsComponent } from './Collaborateur/get-certificats/get-certificats.component';
import { MesEntretiensAnnuelCollabComponent } from './Collaborateur/Annuel/mes-entretiens-annuel-collab/mes-entretiens-annuel-collab.component';
import { ViewQuestionsComponent } from './Manager/gestion-poste-by-id/view-questions/view-questions.component';
import { ProfileFormateurComponent } from './Formateur/profile-formateur/profile-formateur.component';
import { ProfileManagerComponent } from './Manager/profile-manager/profile-manager.component';

const routes: Routes = [
  {
    path: '',
    component: MenuloginComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' }, // Redirection vers le sign in par défaut
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },

      { path: 'request-password', component: RequestPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'activate-account', component: ActivationCompteComponent },
      {
        path: 'profile/:id',
        component: GetCertificatsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'managerRh',
    component: AdminMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardManagerRhComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile/:id',
        component: ProfileUsersComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'all-manager-service',
        component: AllUsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-formateurs',
        component: AllFormateurComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-manager-service',
        component: AddCompteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-collaborateur',
        component: AddCompteCollabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'competence',
        component: GestionCompetenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-collaborateur',
        component: AllcollabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-detail/:id',
        component: UserByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'demande-poste',
        component: GetallposteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste-candidats',
        component: CandidatureComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste/:postId',
        component: GetpostebyidComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fullcalendar/:postId',
        component: FullCalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fullcalendarRh/:postId',
        component: FullCalendarRhComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-entretiens-Rh',
        component: MesEntretiensRhComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-group/:formationId',
        component: CreateGroupsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'session/:formationId',
        component: CreateSessionComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'evaluate-interview-Rh/:candidatureId',
        component: EvaluateInterviewRhComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-formations',
        component: ListFormationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formation-byId/:id',
        component: DemandeFormationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat/:user',
        component: ChatComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'collaborateur',
    component: CollabMenuComponent,
    children: [
      {
        path: 'all-poste',
        component: GetAllPosteCollabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-formations',
        component: ListeDesFormationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'audio',
        component: AudioRecorderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-entretiens-annuels',
        component: MesEntretiensAnnuelCollabComponent,
        canActivate: [AuthGuard],
      },

      { path: 'compte', component: ProfileComponent },
      {
        path: 'mes-postulations',
        component: MespostulationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: GestionProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-tests-techniques',
        component: MestesttechniqueComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'start-test/:qid/:candidatureId',
        component: StartTestComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-entretiens',
        component: MesEntretiensComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'thank-you',
        component: ThankYouComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-entretiens-Rh',
        component: EntretienRhCollabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-demandes-formation',
        component: MesDemandesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-sessions',
        component: SessionsFormationsCollabComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'mes-bilans',
        component: MesBilanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bilan/:id',
        component: GetBilanByIdCollabComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'updateBilan/:id',
        component: UpdateBilanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat/:user',
        component: ChatComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile/:id',
        component: ProfileUsersComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'managerService',
    component: ManagerMenuComponent,
    children: [
      {
        path: 'user-profile/:id',
        component: ProfileUsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile-manager',
        component: ProfileManagerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'historiqueposte',
        component: HistoriqueDesPosteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'postearchive/:postId',
        component: PosteArchiveByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardManagerServiceComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'add-fiche-de-poste',
        component: AddFicheDePosteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-postes',
        component: DisplayMesPostesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-postes/:postId',
        component: EditFicheComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste/:postId',
        component: GestionPosteByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'postes-approuve',
        component: AppouvedPosteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste-approuve/:postId',
        component: PostApprouvedIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-test/:postId',
        component: AddQuizComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-test/:id',
        component: UpdateQuizComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all-test',
        component: ViewQuizComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-question/:id',
        component: AddQuestionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view-question/:qid/:qtitle',
        component: ViewQuestionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view-question-poste/:qid/:qtitle',
        component: ViewQuestionsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'update-question/:quesId',
        component: UpdateQuestionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste-publie',
        component: DisplayDemandePublieComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poste-encours/:postId',
        component: PostByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-entretiens',
        component: MesEntretienManagerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mon-equipe',
        component: BilanComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'interview/:roomId/:candidatureId',
        component: InterviewOnlineComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'evaluate-interview/:candidatureId',
        component: EvaluateInterviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'demande-formation',
        component: DemandeDesCollabsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bilan-collab/:id',
        component: ListBilanDesCollabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bilan-by-id/:id/:idCollab',
        component: GetBilanByIdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'entretien-annuel',
        component: EntretienAnnuelCalendarComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'mes-entretien-annuel',
        component: MesEntretienAnnuelManagerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat/:user',
        component: ChatComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'formateur',
    component: FormateurMenuComponent,
    children: [
      {
        path: 'user-profile/:id',
        component: ProfileUsersComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'all',
        component: AllFormationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile-formateur',
        component: ProfileFormateurComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formation-byId/:id',
        component: GetByIdFormationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mes-sessions',
        component: MesSessionsFormateurComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'interview/:roomId/:candidatureId',
        component: MeetFormationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat/:user',
        component: ChatComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
