import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, timer, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  dlcPrice: number;


  ngOnInit(): void {
    this.configSongDefault();
    this.success.subscribe((message) => this.successMessage = message);
    this.success.pipe(
      debounceTime(1000 * 10)
    ).subscribe(() => this.successMessage = null);
  }

  buyDLC() {

    // this.success.next(`${new Date()} - Message successfully changed.`);
    this.dlcPrice = Math.floor((Math.random() * 50) + 50 );
    this.success.next(this.dlcPrice + '' );
  }

  configSongDefault(){
    this.setPlaySpeed(2.0);
    this.changeStyle('0deg');
    this.setSong('assets/Lazerhawk_-_Overdrive.webm');
  }

  configSongKawaii(){
    this.setPlaySpeed(1.6);
    this.changeStyle('24deg');
    this.setSong('assets/REDALiCE_-_Great_Nano_Desu.webm');
  }

  configSongDoom(){
    this.setPlaySpeed(1.3);
    this.changeStyle('90deg');
    this.setSong('assets/DOOM_(2016)_OST_-_Flesh_&_Metal.webm');
  }

  configSongFireAndFlame(){
    this.setPlaySpeed(3.3);
    this.changeStyle('110deg');
    this.setSong('assets/Dragonforce_-_Through_the_Fire_and_Flames.webm');
  }

  configSongBerserk(){
    this.setPlaySpeed(2.0);
    this.changeStyle('90deg');
    this.setSong('assets/Berserk_-_My Brother.webm');
  }

  configSongInfectedMushroom(){
    this.setPlaySpeed(1.0);
    this.changeStyle('200.34deg');
    this.setSong('assets/Infected_Mushroom_&_Bliss_-_Bliss_on_Mushrooms.webm');
  }

  setSong(url: string){
    this.audio.nativeElement.src = url;
  }

  setPlaySpeed(rate: number) {
    this.video.nativeElement.playbackRate = rate;
  }

  changeStyle(deg: string) {
    document.documentElement.style.setProperty('--main-hue-color', deg);
  }
}
