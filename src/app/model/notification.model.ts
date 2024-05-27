// notification.model.ts

import { User } from "./user.model";

export interface Notifications {
    id: number;
    message: string;
    dateTime: string;
    expirationDateTime: string;
    receiver: User;
    sender: User;
    notifType: NotifType;
  }
  
  export enum NotifType {
    // Définissez les différents types de notification selon vos besoins
    Poste = "Poste",
    AutreType = "AutreType"
  }
  