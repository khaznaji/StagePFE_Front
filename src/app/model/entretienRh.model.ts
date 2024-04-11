import { Candidature } from "./candidature.model";
import { User } from "./user.model";

export interface EntretienRh {
    id: number;
    candidature: Candidature;
    user : User ; 
    dateEntretien: string; // Date de l'entretien au format 'YYYY-MM-DD'
    heureDebut: string; // Heure de début de l'entretien au format 'HH:MM'
    heureFin: string;
    nomCollaborateur: string;
    prenomCollaborateur: string; // Heure de fin de l'entretien au format 'HH:MM'
  }