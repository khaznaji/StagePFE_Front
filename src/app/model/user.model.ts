import { Collaborateur } from "./collaborateur.model";
import { Gender } from "./gender.model";
import { ManagerService } from "./managerservice.model";
import { Role } from "./role.model";

export class User{
  id!: number;
  nom!: string;
  prenom!: string;
  numtel!: number;
  matricule!: string;
  role!: Role;
  image!: string;
  gender!: Gender; 
  email!: string;
  password!: string;
  date!: Date; // ou LocalDateTime selon votre besoin
  isActivated!: boolean;
  collaborateur!:Collaborateur; 
  managerService!:ManagerService;
}