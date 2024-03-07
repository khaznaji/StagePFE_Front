import { Collaborateur } from "./collaborateur.model";
import { Domaine } from "./domaine.model";
import { ManagerService } from "./managerservice.model";

export class Competence{
    id!: number;
    nom!: string;
    domaine!: Domaine;
    collaborateurs!: Collaborateur[];
    managers!: ManagerService[];


  }