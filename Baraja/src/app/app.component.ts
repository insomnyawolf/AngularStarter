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

  dlcPrice: number;
  isHide = false;

  vertical = true;

  //buffer = this.audioCtx.createBuffer(2, 22050, 44100);
  //source=this.audioCtx.createBufferSource();


  ngOnInit(): void {
    this.configSongO();
    setInterval(() => {
         //this.doBuffer();
      }, 1000);
    this.success.subscribe((message) => this.successMessage = message);
    this.success.pipe(
      debounceTime(1000 * 10)
    ).subscribe(() => this.successMessage = null);
  }

  showMenu(){
    this.isHide = !this.isHide;
  }

/*  doBuffer(){
    const decode = ('audio-decode');
    const buffer = require("../assets/Lazerhawk_-_Overdrive.mp3");

    let promisere = decode(this.source, {
      AudioContext = new (window["AudioContext"] || window["webkitAudioContext"])();}?, (err, audioBuffer)=>{
      guess(audioBuffer)
      .then(({ bpm, offset }) => {
          console.log(bpm);
      })
      .catch((err) => {
          console.log(err);
      });
    }?);
    console.log("2");

  }*/

  buyDLC() {

    // this.success.next(`${new Date()} - Message successfully changed.`);
    this.dlcPrice = Math.floor((Math.random() * 50) + 50 );
    this.success.next(this.dlcPrice + '' );
  }

  configSongO(){
    this.setContrast('150%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(2.0);
    this.changeStyle('0deg');
    this.setSong('assets/Lazerhawk_-_Overdrive.webm');
  }

  configSongGND(){
    this.setContrast('170%');
    this.setBright('120%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.6);
    this.changeStyle('24deg');
    this.setSong('assets/REDALiCE_-_Great_Nano_Desu.webm');
  }

  configSongFAM(){
    this.setContrast('190%');
    this.setBright('120%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.3);
    this.changeStyle('90deg');
    this.setSong('assets/DOOM_(2016)_OST_-_Flesh_&_Metal.webm');
  }

  configSongTFAF(){
    this.setContrast('180%');
    this.setBright('110%');
    this.setGrayScale('0%');
    this.setPlaySpeed(3.3);
    this.changeStyle('95deg');
    this.setSong('assets/Dragonforce_-_Through_the_Fire_and_Flames.webm');
  }

  configSongMB(){
    this.setContrast('400%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(2.0);
    this.changeStyle('80deg');
    this.setSong('assets/Berserk_-_My Brother.webm');
  }

  configSongBOM(){
    this.setContrast('160%');
    this.setBright('100%');
    this.setGrayScale('0%');
    this.setPlaySpeed(1.0);
    this.changeStyle('200.34deg');
    this.setSong('assets/Infected_Mushroom_&_Bliss_-_Bliss_on_Mushrooms.webm');
  }

  configSongFTM(){
    this.setContrast('160%');
    this.setBright('150%');
    this.setGrayScale('0%');
    this.setPlaySpeed(3.0);
    this.changeStyle('20deg');
    this.setSong('assets/Feel_The_Melody_-_S3RL.webm');
  }

  configSongGGG(){
    this.setContrast('150%');
    this.setBright('100%');
    this.setGrayScale('20%');
    this.setPlaySpeed(2.5);
    this.changeStyle('-10deg');
    this.setSong('assets/Manuel_-_Gas_Gas_Gas.webm');
  }

  configSongBP(){
    this.setContrast('175%');
    this.setBright('140%');
    this.setGrayScale('0%');
    this.setPlaySpeed(7.0);
    this.changeStyle('-10deg');
    this.setSong('assets/NOMA_-_Brain_Power.webm');
  }

  configSongNS(){
    this.setContrast('180%');
    this.setBright('200%');
    this.setGrayScale('90%');
    this.setPlaySpeed(2.0);
    this.changeStyle('-10deg');
    this.setSong('assets/Pegboard_Nerds_-_New_Style.webm');
  }

  setContrast(percent: string){
    document.documentElement.style.setProperty('--main-contrast', percent);
  }

  setBright(percent: string){
    document.documentElement.style.setProperty('--main-bright', percent);
  }

  setGrayScale(percent: string){
    document.documentElement.style.setProperty('--main-grayscale', percent);
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
