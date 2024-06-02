import { Competence } from './competence.model';
import { Departement } from './departement.model';
import { EtatPoste } from './etatposte.model';
import { ManagerService } from './managerservice.model';
import { TypeContrat } from './typeContrat.model';

export class Poste {
  id!: number;
  titre!: string;
  managerService!: ManagerService; // Assurez-vous d'avoir une classe ManagerService correspondante
  approuveParManagerRH!: boolean;
  competences!: Competence[]; // Assurez-vous d'avoir une classe Competence correspondante
  departement!: Departement; // Assurez-vous d'avoir une classe Departement correspondante
  description!: string;
  typeContrat!: TypeContrat;
  dateCreation!: Date;
  managerNom!: string; // Declare managerNom and managerPrenom properties
  managerPrenom!: string;
  archive!: boolean;
  encours!: boolean;
  poste!: EtatPoste;
  etatPoste!: EtatPoste;
}
