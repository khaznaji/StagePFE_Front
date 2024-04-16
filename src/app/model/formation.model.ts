import { Departement } from "./departement.model";
import { Formateur } from "./formateur.model";

export class Formation {
    id!: number;
    title!: string;
    description!: string;
    image!: string;
    chapitre!: number;
    duree!: number;
    disponibilite!: boolean;
    createdAt!: Date;
    formateur!: Formateur;
    departement!: Departement;}