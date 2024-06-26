import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';
import { PosteService } from 'src/app/service/poste.service';
import { jsPDF } from 'jspdf';
import { Chart, RadialLinearScale, registerables } from 'chart.js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-candidate-by-id',
  templateUrl: './view-candidate-by-id.component.html',
  styleUrls: ['./view-candidate-by-id.component.css']
})
export class ViewCandidateByIdComponent implements OnInit {
  @Input() candidatId!: number;
  @ViewChild('radarChart') radarChart!: ElementRef;

  collaborateurId!: number; // Vous pouvez obtenir l'ID dynamiquement depuis une autre source, par exemple l'URL

  collaborateurInfo: any;

  constructor(private posteService: PosteService, private sanitizer: DomSanitizer , private modalRef: BsModalRef) { Chart.register(...registerables);}
  ngAfterViewInit(): void {
    if (this.collaborateurInfo) {
      this.createRadarChart();
    }
 }
  ngOnInit(): void {
    if (this.modalRef.content) {
      this.candidatId = this.modalRef.content.candidatId;
      this.getCollaborateurInfo(); // Appel de la méthode pour récupérer les informations du collaborateur

   }
   this.getCollaborateurInfo(); // Appel de la méthode pour récupérer les informations du collaborateur

  }
  getSafeUrl(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + path);
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
    const seriesData: { [key: string]: any } = {};
   
    // Filter evaluations based on the domain
    const filteredEvaluations = this.collaborateurInfo.evaluations.filter((evaluation: { domaine: string }) => {
       return evaluation.domaine === 'HardSkills' || evaluation.domaine === 'SoftSkills';
    });
   
    // Generate labels based on the competences associated
    const labels: string[] = [];
   
    // Populate labels with the names of the competences
    filteredEvaluations.forEach((evaluation: { competenceName: string }) => {
       if (!labels.includes(evaluation.competenceName)) {
         labels.push(evaluation.competenceName);
       }
    });
   
    // Traverse the filtered evaluations
    filteredEvaluations.forEach((evaluation: { competenceName: any; evaluation: any; domaine: any; }) => {
       const domaineValue = evaluation.domaine;
   
       let backgroundColor, borderColor, pointBackgroundColor, pointHoverBackgroundColor;
   
       switch (domaineValue) {
         case 'SoftSkills':
           backgroundColor = 'rgba(75, 192, 192, 0.5)';
           borderColor = 'rgba(75, 192, 192, 1)';
           pointBackgroundColor = 'rgba(75, 192, 192, 1)';
           pointHoverBackgroundColor = 'rgba(75, 192, 192, 1)';
           break;
         case 'HardSkills':
           backgroundColor = 'rgba(255, 99, 132, 0.5)';
           borderColor = 'rgba(255, 99, 132, 1)';
           pointBackgroundColor = 'rgba(255, 99, 132, 1)';
           pointHoverBackgroundColor = 'rgba(255, 99, 132, 1)';
           break;
         default:
           backgroundColor = 'rgba(255, 255, 255, 0.5)';
           borderColor = 'rgba(255, 255, 255, 1)';
           pointBackgroundColor = 'rgba(255, 255, 255, 1)';
           pointHoverBackgroundColor = 'rgba(255, 255, 255, 1)';
           break;
       }
   
       if (!seriesData[domaineValue]) {
         seriesData[domaineValue] = {
           label: domaineValue,
           data: [],
           backgroundColor: backgroundColor,
           borderColor: borderColor,
           pointBackgroundColor: pointBackgroundColor,
           pointBorderColor: '#fff',
           pointHoverBackgroundColor: pointHoverBackgroundColor,
           pointHoverBorderColor: '#fff'
         };
       }
   
       // Find the index of the competenceName in the labels array
       const index = labels.indexOf(evaluation.competenceName);
       // Ensure the data array for the series has the same length as the labels array
       while (seriesData[domaineValue].data.length <= index) {
         seriesData[domaineValue].data.push(null); // Fill with nulls if the data array is shorter
       }
       // Set the evaluation value at the correct index
       seriesData[domaineValue].data[index] = evaluation.evaluation;
    });
   
    const datasets = Object.values(seriesData);
   
    return {
       labels: labels,
       datasets: datasets
    };
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
   

  getCollaborateurInfo(): void {
    this.posteService.getCollaborateurInfoById(this.candidatId)
       .subscribe(data => {
         this.collaborateurInfo = data; 
         console.log('Données reçues:', data); // Ajoutez cette ligne pour vérifier les données
      console.log(this.collaborateurInfo);// Corrigez cette ligne
       }, error => {
         console.log('Une erreur s\'est produite lors de la récupération des informations du collaborateur:', error);
       });
   }
   
 closeModal(): void {
  this.modalRef.hide();
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
}
