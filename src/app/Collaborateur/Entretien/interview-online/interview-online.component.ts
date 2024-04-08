import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-interview-online',
  templateUrl: './interview-online.component.html',
  styleUrls: ['./interview-online.component.css'],
})
export class InterviewOnlineComponent implements OnInit, AfterViewInit {
  domain: string = 'jitsi1.geeksec.de'; // For self-hosted use your domain
  room: any;
  options: any;
  api: any;
  users: any = [];
  user: any;
  roomId!: string;
  username!: string;
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private router: Router,
    private sr: UserService,
    private Auth: UserAuthService,
    private route: ActivatedRoute
  ) {}

  handleClose = () => {
    console.log('handleClose');
  };
  data: any = [];

  getUserById(id: any) {
    const headers = { Authorization: 'Bearer ' + this.Auth.getToken() };

    this.sr.getUserById2(id, headers).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.nom + ' ' + this.data.prenom;
      console.log(this.username);

      // Initialize JitsiMeetExternalAPI with the updated username and room ID
    });
  }

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    this.router.navigate(['/thank-you']);
  };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('roomId');
      if (roomId) {
        // Initialiser la réunion Jitsi directement
        this.initializeJitsi(roomId);
      } else {
        console.error("ID de salle manquant dans l'URL");
      }
    });
    this.user = {
      name: this.username, // Set your username
    };

    this.getUserById(localStorage.getItem('id'));
  }

  ngAfterViewInit(): void {
    // Initialization moved to getUserById() method
  }

  initializeJitsi(roomId: string) {
    this.options = {
      roomName: roomId,
      width: 1000,
      height: 600,
      configOverwrite: {
        prejoinPageEnabled: false, // Disable the prejoin page
      },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.username,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  }
}
