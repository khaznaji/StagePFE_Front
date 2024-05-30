import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PosteService } from 'src/app/service/poste.service';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.component.html',
  styleUrls: ['./profile-users.component.css'],
})
export class ProfileUsersComponent implements OnInit {
  @ViewChild('radarChart') radarChart!: ElementRef;

  collaborateurId!: number; // Vous pouvez obtenir l'ID dynamiquement depuis une autre source, par exemple l'URL

  userInfo: any;
  paginatedPostes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  constructor(
    private router: Router,
    private posteService: PosteService,
    private sanitizer: DomSanitizer,
    private modalRef: BsModalRef,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    if (this.userInfo) {
      this.createRadarChart();
    }
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.posteService.getUsersInfoById(userId).subscribe(
      (data) => {
        this.userInfo = data;
        console.log('Données reçues:', data); // Ajoutez cette ligne pour vérifier les données
        console.log(this.userInfo);
        this.updatePagination(); // Ajoutez cette ligne pour initialiser la pagination
        this.getPaginatedTeam();
      },
      (error) => {
        console.log(
          "Une erreur s'est produite lors de la récupération des informations du collaborateur:",
          error
        );
      }
    );
  }
  paginatedTeam: any[] = []; // ou utilisez le type approprié pour vos membres d'équipe

  truncateDescription(description: string): string {
    // Divise la description en un tableau de lignes en utilisant le saut de ligne (\n) comme séparateur
    const lines = description.split('\n');

    // Vérifie s'il y a plus de trois lignes
    if (lines.length > 3) {
      // Si oui, prend uniquement les trois premières lignes et ajoute une ellipse
      return lines.slice(0, 2).join('\n') + '...';
    } else {
      // Si non, retourne simplement la description originale
      return description;
    }
  }
  currentPageTeam: number = 1;
itemsPerPageTeam: number = 5; 
// Utilisez totalPages au lieu de totalPagesTeam dans vos méthodes de pagination
previousPageTeam() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getPaginatedTeam();
  }
}

nextPageTeam() {
  if (this.currentPage < this.totalPages) { // Utilisez totalPages au lieu de totalPagesTeam
    this.currentPage++;
    this.getPaginatedTeam();
  }
}
getPaginatedFormations() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.userInfo.formationCrees.slice(startIndex, endIndex);
}


// Méthode pour obtenir les membres de l'équipe sur la page actuelle
getPaginatedTeam() {
  const startIndex = (this.currentPageTeam - 1) * this.itemsPerPageTeam;
  const endIndex = Math.min(startIndex + this.itemsPerPageTeam, this.userInfo.equipe.length);
  this.paginatedTeam = this.userInfo.equipe.slice(startIndex, endIndex);
}

  getContractTypeClass(typeContrat: string): string {
    switch (typeContrat.toLowerCase()) {
      case 'cdi':
        return 'contract-pill cdi';
      case 'cdd':
        return 'contract-pill cdd';
      case 'temporaire':
        return 'contract-pill temporaire';
      case 'professionnalisation':
        return 'contract-pill professionnalisation';
      case 'temps partiel':
        return 'contract-pill temps-partiel';
      case 'consultant':
        return 'contract-pill consultant';
      default:
        return 'contract-pill';
    }
  }
  

  updatePagination(): void {
    if (this.userInfo && this.userInfo.postesCrees) {
      this.totalPages = Math.ceil(
        this.userInfo.postesCrees.length / this.itemsPerPage
      );
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedPostes = this.userInfo.postesCrees.slice(
        startIndex,
        endIndex
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  getSafeUrl(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + path);
  }
  redirectionChat(id: any) {
    this.router.navigate(['/managerRh/chat/' + id]);
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
                lineWidth: 1,
              },
              ticks: {
                stepSize: 1,
                color: '#000',
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
  }

  prepareRadarChartData(): any {
    const seriesData: { [key: string]: any } = {};

    // Filter evaluations based on the domain
    const filteredEvaluations = this.userInfo.evaluations.filter(
      (evaluation: { domaine: string }) => {
        return (
          evaluation.domaine === 'HardSkills' ||
          evaluation.domaine === 'SoftSkills'
        );
      }
    );

    // Generate labels based on the competences associated
    const labels: string[] = [];

    // Populate labels with the names of the competences
    filteredEvaluations.forEach((evaluation: { competenceName: string }) => {
      if (!labels.includes(evaluation.competenceName)) {
        labels.push(evaluation.competenceName);
      }
    });

    // Traverse the filtered evaluations
    filteredEvaluations.forEach(
      (evaluation: { competenceName: any; evaluation: any; domaine: any }) => {
        const domaineValue = evaluation.domaine;

        let backgroundColor,
          borderColor,
          pointBackgroundColor,
          pointHoverBackgroundColor;

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
            pointHoverBorderColor: '#fff',
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
      }
    );

    const datasets = Object.values(seriesData);

    return {
      labels: labels,
      datasets: datasets,
    };
  }

  exportToPdf() {
    const data = document.getElementById('profile-container');
    if (data) {
      html2canvas(data).then((canvas: HTMLCanvasElement) => {
        const imgWidth = 208; // width of A4 in mm
        const pageHeight = 295; // height of A4 in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightPosition = 0;

        pdf.addImage(imgData, 'PNG', 0, heightPosition, imgWidth, imgHeight);

        // Construire le nom du fichier PDF
        const nomCollab = this.userInfo.nom.replace(/\s+/g, '_');
        const prenomCollab = this.userInfo.prenom.replace(/\s+/g, '_');
        const fileName = `${nomCollab}_${prenomCollab}_profile.pdf`;

        // Enregistrer le PDF avec le nom spécifié
        pdf.save(fileName);
      });
    } else {
      console.error('Element with ID "profile-container" not found');
    }
  }

  getuserInfo(): void {}

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
    const pdfData = '../assets/' + this.userInfo.resume; // Chemin relatif vers le PDF
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(
        '<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>'
      );
    } else {
      // Gérer le blocage par le navigateur des pop-ups
      console.error("Le navigateur a bloqué l'ouverture d'un nouvel onglet.");
    }
  }
  downloadResume() {
    // Récupérer le nom et le prénom du collaborateur
    const nomCollab = this.userInfo.nom.replace(/\s+/g, '_');
    const prenomCollab = this.userInfo.prenom.replace(/\s+/g, '_');

    // Générer le nom de fichier avec le format "nom_prenom_CurriculumVitae.pdf"
    const fileName = `${nomCollab}_${prenomCollab}_CurriculumVitae.pdf`;

    // Télécharger le fichier avec le nom spécifié
    const resumeUrl = 'assets/images/resume/' + this.userInfo.resume;
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
