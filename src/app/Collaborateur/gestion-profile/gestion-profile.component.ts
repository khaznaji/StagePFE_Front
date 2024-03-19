  import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { Collaborateur } from 'src/app/model/collaborateur.model';
  import { Competence } from 'src/app/model/competence.model';
  import { CollaborateurService } from 'src/app/service/collaborateur.service';
  import { CompetenceService } from 'src/app/service/competence.service';
  import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chart, RadialLinearScale, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-gestion-profile',
    templateUrl: './gestion-profile.component.html',
    styleUrls: ['./gestion-profile.component.css']
  })
  export class GestionProfileComponent implements OnInit , AfterViewInit {
    collaborateurInfo: any;
    @ViewChild('radarChart') radarChart!: ElementRef;
    showPopup = false;

    closePopup(): void {
       this.showPopup = false;
    }
    constructor(private collaborateurService: CollaborateurService,private competenceService: CompetenceService,  private sanitizer: DomSanitizer , private router: Router)
     {     Chart.register(...registerables);

     }
     bio!: string;
     competences: Competence[] = [];
     resume!: File;
     project: Collaborateur = new Collaborateur();
    ngOnInit(): void {
       this.getCollaborateurInfo();
       this.competenceService.getAll().subscribe(
        (competences) => {
          this.project.competences = competences;
        },
        (error) => {
          console.error('Error fetching competences', error);
        }
      ); 
    }
    showRatingContainer =false ; 
    showCompetencesList= true;
    selectExistingCompetence(competenceName: string): void {
      // Trouver la compétence dans la liste des compétences
      const competence = this.collaborateurInfo.evaluations.find((evaluation: { competenceName: string; }) => evaluation.competenceName === competenceName);
      if (competence) {
         // Sélectionner la compétence
         this.isCompetenceSelected = true;
         this.selectedCompetence = competence;
         // Afficher le conteneur de notation
         this.showRatingContainer = true;
      }
     }
     
     
     
     
    searchText = '';
    filteredCompetencies = [];
    competencies = [];
    searchErrorMessage: string = '';
    onSearchTextChange(event: any): void {
      this.searchText = event.target.value;
      this.searchErrorMessage = ''; // Réinitialiser le message d'erreur
      this.filterCompetencies();
   }
    filterCompetencies(): void {
      if (this.searchText.length >= 3) {
         // Filtrer les compétences en excluant celles déjà évaluées par le collaborateur
         this.competences = this.project.competences.filter(competency =>
           competency.nom.toLowerCase().includes(this.searchText.toLowerCase()) &&
           !this.collaborateurInfo.evaluations.some((evaluation: { competenceName: string; }) => evaluation.competenceName.toLowerCase() === competency.nom.toLowerCase())
         );
         if (this.competences.length === 0) {
          this.searchErrorMessage = 'Pas de compétence trouvée. Veuillez entrer des termes de recherche différents.';
        }
      } else {
         // Si la recherche est trop courte, réinitialiser la liste des compétences filtrées
         this.competences = [];
         this.searchErrorMessage = 'La recherche doit contenir au moins 3 caractères.';

      }
     }
     
     
     isCompetenceSelected = false;
     selectedCompetence: Competence | null = null;
     evaluations: { [key: number]: number } = {}; // Modifiez cette ligne pour utiliser un objet
     selectedCompetencies: any[] = []; // Tableau pour stocker les compétences sélectionnées

     selectCompetency(competence: Competence): void {
      this.selectedCompetencies.push(competence); // Ajoute la compétence sélectionnée au tableau

         this.isCompetenceSelected = true;
         this.selectedCompetence = competence;
         // Logique pour sélectionner une compétence
         console.log('Compétence sélectionnée:', competence.nom);
         // Initialiser la note de la compétence sélectionnée à 1 si elle n'a pas encore de note
         if (!this.evaluations[competence.id]) {
             this.evaluations[competence.id] = 1;
         }
         // Fermez le pop-up ou effectuez d'autres actions
     }
 
     addAnotherCompetence(): void {
         this.isCompetenceSelected = false;
         this.selectedCompetence = null;
         // Réinitialiser le champ de recherche et afficher à nouveau le pop-up
         this.showPopup = true;
     }
     updateProfile() {
    const formData = new FormData();
    
      this.competences.forEach(competence => {
        // Ajoutez l'ID de la compétence
        formData.append('competences', competence.id.toString());
        // Ajoutez l'évaluation associée
        formData.append('evaluations', this.evaluations[competence.id].toString());
      });
    // Itérez sur les compétences sélectionnées
    
   
      // Appelez le service pour mettre à jour le profil
      this.collaborateurService.updateCompetence(formData)
        .subscribe(
          response => {
            console.log('Profile updated successfully:', response);
            // Mettez à jour les compétences dans votre modèle Angular si elles sont renvoyées par le backend
            if (response && response.competences) {
              // Réinitialisez les compétences locales avec les compétences mises à jour depuis le backend
              this.competences = response.competences;
            }
            // Mettez à jour les évaluations dans votre modèle Angular si elles sont renvoyées par le backend
            if (response && response.evaluations) {
              // Réinitialisez les évaluations locales avec les évaluations mises à jour depuis le backend
              this.evaluations = response.evaluations;
            }
            console.log('comp', this.competences);
  
          },
          error => {
            console.error('Failed to update profile:', error);
            // Ajoutez ici la logique pour gérer les erreurs
          }
        );
    }
   
    selectRating(competenceId: number, rate: number): void {
        this.evaluations[competenceId] = rate;
        // Logique supplémentaire pour traiter la note sélectionnée
    }
     
 
    ngAfterViewInit(): void {
       if (this.collaborateurInfo) {
         this.createRadarChart();
       }
    }
    getEvaluationColor(evaluation: number): string {
      if (evaluation < 5) {
          return '#dc3545'; // Rouge pour les évaluations inférieures à 5
      } else if (evaluation < 7) {
          return '#ffc107'; // Jaune pour les évaluations entre 5 et 7
      } else {
          return '#28a745'; // Vert pour les évaluations supérieures ou égales à 7
      }
  }
  openPdfFullScreen() {
    const pdfData = '../assets/' + this.collaborateurInfo.resume; // Chemin relatif vers le PDF
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write('<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>');
    } else {
      // Gérer le blocage par le navigateur des pop-ups
      console.error('Le navigateur a bloqué l\'ouverture d\'un nouvel onglet.');
    }
  }
  downloadResume() {
    // Récupérer le nom et le prénom du collaborateur
    const nomCollab = this.collaborateurInfo.nom.replace(/\s+/g, '_');
    const prenomCollab = this.collaborateurInfo.prenom.replace(/\s+/g, '_');
    
    // Générer le nom de fichier avec le format "nom_prenom_CurriculumVitae.pdf"
    const fileName = `${nomCollab}_${prenomCollab}_CurriculumVitae.pdf`;
  
    // Télécharger le fichier avec le nom spécifié
    const resumeUrl = 'assets/images/resume/' + this.collaborateurInfo.resume;
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
 
  
  getSafeUrl(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + path);
  }
 
   
    getCollaborateurInfo(): void {
      this.collaborateurService.getCollaborateurInfo()
        .subscribe((data: any) => {
          this.collaborateurInfo = data;
        });
    }
    createRadarChart(): void {
      const ctx = this.radarChart.nativeElement as HTMLCanvasElement;
      if (ctx) {
        const radarChart = new Chart(ctx, {
          type: 'radar',
          data: this.prepareRadarChartData(),
          options: {
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: '#000',
                  lineWidth: 1
                },
                ticks: {
                  stepSize: 1,
                  color: '#000',
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      }
    }
     
   prepareRadarChartData(): any {
      const labels = this.collaborateurInfo.evaluations.map((evaluation: { competenceName: any; }) => evaluation.competenceName);
      const data = this.collaborateurInfo.evaluations.map((evaluation: { evaluation: any; }) => evaluation.evaluation);
  
      return {
        labels: labels,
        datasets: [{
         label: 'Competences',
         data: data,
         backgroundColor: 'rgba(255, 99, 132, 0.5)', // Changed to a shade of red
         borderColor: 'rgba(255, 99, 132, 1)', // Changed to a solid red
         pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Changed to a solid red
         pointBorderColor: '#fff', // White border for points
         pointHoverBackgroundColor: '#fff', // White background on hover
         pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Red border on hover
        }]
        
      };
   }
   ToEdit(): void {
    this.router.navigate(['/collaborateur/edit-profile']);
}
   exportToPdf() {
    const data = document.getElementById('profile-container');
    if (data) {
        html2canvas(data).then((canvas: HTMLCanvasElement) => {
            const imgWidth = 208; // width of A4 in mm
            const pageHeight = 295; // height of A4 in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            let heightPosition = 0;

            pdf.addImage(imgData, 'PNG', 0, heightPosition, imgWidth, imgHeight);

            // Construire le nom du fichier PDF
            const nomCollab = this.collaborateurInfo.nom.replace(/\s+/g, '_');
            const prenomCollab = this.collaborateurInfo.prenom.replace(/\s+/g, '_');
            const fileName = `${nomCollab}_${prenomCollab}_profile.pdf`;

            // Enregistrer le PDF avec le nom spécifié
            pdf.save(fileName);
        });
    } else {
        console.error('Element with ID "profile-container" not found');
    }
}

   
   }