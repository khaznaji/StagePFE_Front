import { Collaborateur } from "./collaborateur.model";
import { Competence } from "./competence.model";
import { Departement } from "./departement.model";
import { User } from "./user.model";

export class ManagerService {
    id!: number;
    manager!: User;
    department!: Departement;
    poste!: string;
    bio!: string;
    dateEntree!: string; // Vous pouvez utiliser un objet Date si vous préférez
    image!: string;
    competences!: Competence[];
    collaborateurs!: Collaborateur[];
  }