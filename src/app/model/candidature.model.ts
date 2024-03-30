import { Collaborateur } from "./collaborateur.model";
import { EtatPostulation } from "./etatpostulation.model";
import { Poste } from "./poste.model";
import { Quiz } from "./quiz.model";

export class Candidature {
    id!: number;
    poste!: Poste;
    collaborateur!: Collaborateur;
    etatPostulation!: EtatPostulation;
    dateCandidature!: string;
    quiz!:Quiz;  // Vous pouvez utiliser le format de date que vous préférez
  }