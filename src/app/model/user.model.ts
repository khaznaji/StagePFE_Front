import { Role } from "./role.model";

export class User{
  id!: number;
  nom!: string;
  prenom!: string;
  numtel!: number;
  matricule!: string;
  role!: Role;
  email!: string;
  password!: string;
  date!: string; // ou LocalDateTime selon votre besoin
  isActivated!: boolean;
}