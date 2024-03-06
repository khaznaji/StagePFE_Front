import { Gender } from "./gender.model";
import { Role } from "./role.model";

export class User{
  id!: number;
  nom!: string;
  prenom!: string;
  numtel!: number;
  matricule!: string;
  role!: Role;
  gender!: Gender; 
  email!: string;
  password!: string;
  date!: Date; // ou LocalDateTime selon votre besoin
  isActivated!: boolean;
}