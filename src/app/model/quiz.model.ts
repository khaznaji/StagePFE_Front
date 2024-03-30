import { Candidature } from "./candidature.model";
import { Poste } from "./poste.model";

export class Quiz {
  qid:any;
  title: any;
  description: any;
  maxMarks: any;
  numberOfQuestions: any;
  active: any;
  poste: Poste = new Poste();
  candidature: Candidature = new Candidature(); // Utilisation du type Candidature pour la propriété candidature
}
