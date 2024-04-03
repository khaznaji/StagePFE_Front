import { Candidature } from "./candidature.model";

export interface Entretien {
    id: number;
    candidature: Candidature;
    dateEntretien: string; // Date de l'entretien au format 'YYYY-MM-DD'
    heureDebut: string; // Heure de début de l'entretien au format 'HH:MM'
    heureFin: string;
    nomCollaborateur: string;
    prenomCollaborateur: string; // Heure de fin de l'entretien au format 'HH:MM'
  }