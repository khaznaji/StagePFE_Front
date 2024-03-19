import { Collaborateur } from "./collaborateur.model";
import { Competence } from "./competence.model";

export class Evaluation {
    id!: number;
    collaborateur!: Collaborateur; // ID du collaborateur lié à l'évaluation
    competence!: Competence;    // ID de la compétence liée à l'évaluation
    evaluation!: number;        // Valeur de l'évaluation
  }