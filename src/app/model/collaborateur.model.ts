import { Competence } from "./competence.model";
import { Departement } from "./departement.model";
import { Evaluation } from "./evaluation.model";
import { ManagerService } from "./managerservice.model";
import { User } from "./user.model";

export class Collaborateur {
    id!: number;
    managerService!: ManagerService;
    collaborateur!: User;
    department!: Departement;
    poste!: string;
    bio!: string;
    dateEntree!: string; // Vous pouvez utiliser un objet Date si vous préférez
    competences!: Competence[];
    image!: string;
    evaluations!:Evaluation[] ;
  }