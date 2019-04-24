import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, timer, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { guess } from 'web-audio-beat-detector';
declare function require(path: string);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Baraja';
  private success = new Subject<string>();
  @ViewChild('myVideo') video: ElementRef;
  @ViewChild('myAudio') audio: ElementRef;
  successMessage: string;

  dragOff = false;
  dlcPrice: number;
  isHide = false;
  volume = 0;
  vertical = true;

  offset = 0.0;

  isPlaying = false;
  loadingSample = false;
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
  bufferSource: any;
  gainNode: any;

  ngOnInit(): void {
    this.audioContext = new AudioContext();
    this.bufferSource = this.audioContext.createBufferSource();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0;
    this.loadingSample = true;
    this.setSong('assets/Dragonforce_-_Through_the_Fire_and_Flames.webm')
        .then(audioBuffer => {
            this.loadingSample = false;
            this.audioBuffer = audioBuffer;
            this.playSample();
        })
        .catch(error => {throw error; });


    setInterval(() => {

      this.doBuffer();
    }, 1000);
    this.success.subscribe((message) => this.successMessage = message);
    this.success.pipe(
      debounceTime(1000 * 10)
    ).subscribe(() => this.successMessage = null);
  }

  showMenu() {
    this.isHide = !this.isHide;
  }

  muteAudio() {
    if (this.volume === 0) {
      this.gainNode.gain.value = 1;
      this.volume = 1;
    } else {
      this.gainNode.gain.value = 0;
      this.volume = 0;
    }
  }

  disableDrag() {
    this.dragOff = true;
  }

  enableDrag() {
    this.dragOff = false;
    this.gainNode.gain.value = this.volume;
  }

  setSong(url: string): Promise<any> {
      return fetch(url)
          .then(response => response.arrayBuffer())
          .then(buffer => {
              return new Promise((resolve, reject) => {
                  this.audioContext.decodeAudioData(
                      buffer,
                      resolve,
                      reject
                  );
              });
          });
  }

  playSample() {
    if (!this.loadingSample) {
      if (this.isPlaying) {
        this.bufferSource.stop();
        this.isPlaying = false;
        this.bufferSource = this.audioContext.createBufferSource();
      }
      this.bufferSource.buffer = this.audioBuffer;
      this.bufferSource.connect(this.gainNode);
      // this.bufferSource.connect(this.audioContext.destination);
      this.bufferSource.start(0);
      this.isPlaying = true;
      this.offset = 0.0;
  }
}

  doBuffer() {
    if (!this.loadingSample) {
      guess(this.audioBuffer, this.offset, 1.0)
      .then(({ bpm,  offset}) => {
          // console.log("bpm: " + bpm);
          let speedo = bpm * 3.5 / 120;
          if (speedo < 0.8) {
            speedo = 0.8;
          } else if (speedo > 6.0) {
            speedo = 6.0;
               }
          // console.log("speed: " + speedo);
          this.setPlaySpeed(speedo);
      })
      .catch((err) => {
          console.log(err);
      });
      this.offset += 1.0;
    }
    }

  buyDLC() {
    // this.success.next(`${new Date()} - Message successfully changed.`);
    this.dlcPrice = Math.floor((Math.random() * 50) + 50 );
    this.success.next(this.dlcPrice + '' );
  }

  configSongO() {
    this.setContrast('150%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(2.0);
    this.setHue('0deg');
    this.setSong('assets/Lazerhawk_-_Overdrive.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongGND() {
    this.setContrast('170%');
    this.setBright('120%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.6);
    this.setHue('24deg');
    this.setSong('assets/REDALiCE_-_Great_Nano_Desu.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongFAM() {
    this.setContrast('190%');
    this.setBright('120%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.3);
    this.setHue('90deg');
    this.setSong('assets/DOOM_(2016)_OST_-_Flesh_&_Metal.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongTFAF() {
    this.setContrast('180%');
    this.setBright('110%');
    this.setGrayScale('0%');
    this.setPlaySpeed(3.3);
    this.setHue('115deg');
    this.setSong('assets/Dragonforce_-_Through_the_Fire_and_Flames.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => { throw error; });
  }

  configSongMB() {
    this.setContrast('400%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(2.0);
    this.setHue('80deg');
    this.setSong('assets/Berserk_-_My Brother.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongBOM() {
    this.setContrast('160%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.0);
    this.setHue('200.34deg');
    this.setSong('assets/Infected_Mushroom_&_Bliss_-_Bliss_on_Mushrooms.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongFTM() {
    this.setContrast('160%');
    this.setBright('150%');
    this.setGrayScale('0%');
    this.setPlaySpeed(3.0);
    this.setHue('20deg');
    this.setSong('assets/Feel_The_Melody_-_S3RL.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongGGG() {
    this.setContrast('150%');
    this.setBright('100%');
    this.setGrayScale('20%');
    this.setPlaySpeed(2.5);
    this.setHue('-10deg');
    this.setSong('assets/Manuel_-_Gas_Gas_Gas.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongBP() {
    this.setContrast('175%');
    this.setBright('140%');
    this.setGrayScale('0%');
    this.setPlaySpeed(7.0);
    this.setHue('-20deg');
    this.setSong('assets/NOMA_-_Brain_Power.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  configSongNS() {
    this.setContrast('180%');
    this.setBright('200%');
    this.setGrayScale('90%');
    this.setPlaySpeed(2.0);
    this.setHue('-10deg');
    this.setSong('assets/Pegboard_Nerds_-_New_Style.webm')
    .then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
        this.playSample();
    })
    .catch(error => {throw error; });
  }

  setContrast(percent: string) {
    document.documentElement.style.setProperty('--main-contrast', percent);
  }

  setBright(percent: string) {
    document.documentElement.style.setProperty('--main-bright', percent);
  }

  setGrayScale(percent: string) {
    document.documentElement.style.setProperty('--main-grayscale', percent);
  }

  deprecatedsetSong(url: string) {
    this.audio.nativeElement.src = url;
  }

  setPlaySpeed(rate: number) {
    this.video.nativeElement.playbackRate = rate;
  }

  setHue(deg: string) {
    document.documentElement.style.setProperty('--main-hue-color', deg);
  }
}
