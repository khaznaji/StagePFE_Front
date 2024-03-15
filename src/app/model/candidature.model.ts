import { Collaborateur } from "./collaborateur.model";
import { EtatPostulation } from "./etatpostulation.model";
import { Poste } from "./poste.model";

export class Candidature {
    id!: number;
    poste!: Poste;
    collaborateur!: Collaborateur;
    etatPostulation!: EtatPostulation;
    dateCandidature!: string; // Vous pouvez utiliser le format de date que vous préférez
  }