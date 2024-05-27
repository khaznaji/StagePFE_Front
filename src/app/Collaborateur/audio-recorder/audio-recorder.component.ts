import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.css'],
})
export class AudioRecorderComponent {
  mediaRecorder: any;
  audioChunks: Blob[] = [];

  constructor(private http: HttpClient) {}

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event: any) => {
        this.audioChunks.push(event.data);
      };
      this.mediaRecorder.start();
    });
  }

  stopRecording() {
    if (this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  saveRecording() {
    // Convertir les chunks audio en PCM AIFF
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/aiff' });

    // Créer un nouvel objet FormData
    const formData = new FormData();

    // Ajouter le fichier audio avec le bon encodage PCM AIFF
    formData.append('file', audioBlob, 'audio.pcm.aiff');

    // Effectuer la requête HTTP POST pour enregistrer le fichier audio
    this.http
      .post<any>('http://localhost:8080/api/audio/upload', formData)
      .subscribe(
        (response) => {
          console.log('Audio enregistré avec succès:', response);
          // Traiter la réponse et afficher le rapport d'analyse dans Angular
        },
        (error) => {
          console.error("Erreur lors de l'enregistrement de l'audio:", error);
        }
      );
  }
}
