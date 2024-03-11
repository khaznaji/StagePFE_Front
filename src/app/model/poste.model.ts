import { Competence } from "./competence.model";
import { Departement } from "./departement.model";
import { ManagerService } from "./managerservice.model";

export class Poste{
    id!: number;
    titre!: string;
    managerService!: ManagerService; // Assurez-vous d'avoir une classe ManagerService correspondante
    approuveParManagerRH!: boolean;
    competences!: Competence[]; // Assurez-vous d'avoir une classe Competence correspondante
    departement!: Departement; // Assurez-vous d'avoir une classe Departement correspondante
    description!: string;
    nombrePostesDisponibles!: number;
    dateCreation!: Date;

  }