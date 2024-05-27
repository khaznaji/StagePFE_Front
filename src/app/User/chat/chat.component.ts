import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Messaggio } from 'src/app/model/Messaggio.model';
import { User } from 'src/app/model/user.model';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  url = 'http://localhost:8080';
  otherUser?: User;
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  channelName?: string;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  newMessage = new FormControl('');
  messages?: Observable<Array<Messaggio>>;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  pageLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private http: HttpClient,
    private el: ElementRef,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.pageLoaded) {
      this.pageLoaded = true;
      this.userService
        .getUserById(this.route.snapshot.paramMap.get('user')!)
        .subscribe((data: any) => {
          this.otherUser = data;
          this.connectToChat();
          console.log(this.el);
          this.el.nativeElement.querySelector('#chat').scrollIntoView();
        });
      this.getUserByid(localStorage.getItem('id'));
    }
  }
  data: any = [];
  username!: string;
  email!: string;
  role!: string;
  matricule!: string;
  numtel!: number;
  genre!: number;

  image!: string;
  getUserByid(id: any) {
    const headers = {
      Authorization: 'Bearer ' + this.userAuthService.getToken(),
    };
    this.userService.getUserById2(id, headers).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.nom + ' ' + this.data.prenom;
      this.image = this.data.image;
      this.email = this.data.email;
      this.role = this.data.role;
      this.matricule = this.data.matricule;
      this.numtel = this.data.numtel;
      this.genre = this.data.gender;

      console.log('User info:', this.data);
      console.log('User Nom:', this.username);
      this.loadChat(); // Exemple d'appel d'une autre fonction
      this.connectToChat();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown() {
    var container = this.el.nativeElement.querySelector('#chat');
    container.scrollTop = container.scrollHeight;
  }

  connectToChat() {

    console.log('connecting to chat...');
    console.log('userAuthService.getId():', this.userAuthService.getId());
    console.log('userAuthService.getNom():', this.username);

    // Obtenir le jeton d'authentification à partir du service userAuthService
    const authToken = this.userAuthService.getToken();
    console.log('authToken:', authToken);

    // Créer un objet HttpHeaders avec le jeton d'authentification
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    const id1 = this.userAuthService
      .getId()
      .toString()
      .replace('"', '')
      .replace('"', '');
    console.log('id1:', id1);

    const nick1 = this.username.replace('"', '').replace('"', '');
    console.log('nick1:', nick1);

    const id2 = this.otherUser?.id!;
    console.log('id2:', id2);

    const nick2 = this.otherUser?.nom!;
    console.log('nick2:', nick2);

    const id1Str = id1.toString();
    console.log('id1Str:', id1Str);

    const id2Str = id2.toString();
    console.log('id2Str:', id2Str);

    if (id1Str.toLowerCase().localeCompare(id2Str.toLowerCase()) == 1) {
      this.channelName = id1Str + '&' + id2Str;
      console.log('id1 ' + id1Str + ' supérieur à id2 ' + id2Str);
      console.log('channelname ' + this.channelName);
    } else {
      this.channelName = id2 + '&' + id1;
      console.log('channelname ' + this.channelName);
      console.log('id2 ' + id2 + ' superieur à id1' + id1);
    }

    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/chat');

    this.stompClient = Stomp.over(this.socket);
    console.log('connecting to chat...' + this.socket);
    this.stompClient.connect(
      {}, // Utiliser les en-têtes pour l'authentification
      (frame) => {
        // Fonction de rappel lorsque la connexion est établie
        console.log('connected to chat...');
        console.log(
          'Subscribing to topic: ' + '/topic/messages/' + this.channelName
        );

        // Souscrire au topic pour les messages du canal
        this.stompClient!.subscribe(
          '/topic/messages/' + this.channelName,
          (message) => {
            console.log('New message received:', message.body);
            // Mettre à jour les messages avec le nouveau message reçu
            this.loadChat();
          }
        );
      },
      (error?: string | Stomp.Frame) => {
        // Fonction de rappel en cas d'erreur de connexion
        console.error('error connecting: ' + error);
      }
    );
  }

  sendMsg() {
    if (this.newMessage.value !== '' && this.stompClient) {
      // Vérifiez si this.stompClient est défini
      const authToken = this.userAuthService.getToken();

      // Créer un objet HttpHeaders avec le jeton d'authentification
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });

      this.stompClient.send(
        '/app/chat/' + this.channelName,
        { header: headers },
        JSON.stringify({
          sender: this.username,
          id: this.userAuthService.getId(),
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    } else {
      console.error("La connexion au serveur Stomp n'est pas établie.");
    }
  }

  // sendMsg() {
  //   if (this.newMessage.value !== '') {
  //     const authToken = this.userAuthService.getToken();

  //     // Créer un objet HttpHeaders avec le jeton d'authentification
  //     const headers = new HttpHeaders({
  //       Authorization: `Bearer ${authToken}`,
  //     });
  //           this.stompClient!.send(
  //       '/app/chat/' + this.channelName,
  //       { header: headers },
  //       JSON.stringify({
  //         sender: this.data.nom,
  //         id: this.userAuthService.getId(),
  //         t_stamp: 'to be defined in server',
  //         content: this.newMessage.value,
  //       })
  //     );
  //     this.newMessage.setValue('');
  //   }
  // }

  loadChat() {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    this.messages = this.http.post<Array<Messaggio>>(
      this.url + '/getMessages',
      this.channelName,
      { headers }
    );
    this.messages.subscribe((data) => {
      let mgs: Array<Messaggio> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id ? 1 : -1));
      this.messages = of(mgs);
    });
    console.log(this.messages);
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
}
