import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Character, characters } from 'src/defs/characters';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-character-gallery',
  templateUrl: './character-gallery.component.html',
  styleUrls: ['./character-gallery.component.scss'],
  animations: [
    trigger('imageBlend', [
      state('active', style({
        opacity: 1,
      })),
      state('start', style({
        opacity: 0,
      })),
      transition('start => active', [
        animate('0.5s')
      ])
    ]),
    trigger('buttonSelected', [
      state('selected', style({
        border: '2px solid yellow',
        borderRadius: '100%',
        width: '70px'
      }))
    ])
  ]
})
export class CharacterGalleryComponent implements OnInit, AfterContentChecked {

  characters: Character[] = characters;

  currCharacter: Character = characters[0];

  buttonSrc: string = '../../assets/Personajes/Botones/';

  animationState: boolean = false;

  currentButtonActiveId: number = 1;

  constructor() { }
  
  ngOnInit(): void {
  }
  
  ngAfterContentChecked(): void {
    this.animate()
  }

  selectCharacter(name: string) {
    for (let i = 0; i < characters.length; i++) {
      if(characters[i].name == name) {
        this.currCharacter = characters[i];
        this.refresh();
        return;
      }
    }
  }

  refresh() {
    this.animate();
  }

  animate() {
    console.log('animating!')
    this.animationState = false;

    // Deactivate new portrait and background
    let pastPortrait = document.getElementById('portrait' + this.currentButtonActiveId.toString());
    pastPortrait?.classList.add('inactive');
    let pastBackground = document.getElementById('background' + this.currentButtonActiveId.toString());
    pastBackground?.classList.add('inactive');
    // Deactivate the past button
    let pastButton = document.getElementById(this.currentButtonActiveId.toString());
    pastButton?.classList.remove('btn-active');
    // Change ID
    this.currentButtonActiveId = this.currCharacter.id;
    // Activate images
    let currPortrait = document.getElementById('portrait' + this.currentButtonActiveId.toString());
    currPortrait?.classList.remove('inactive');
    let currBackground = document.getElementById('background' + this.currentButtonActiveId.toString());
    currBackground?.classList.remove('inactive');
    // Activate new button
    let currButton = document.getElementById(this.currentButtonActiveId.toString());
    currButton?.classList.add('btn-active');
    this.animationState = true;
  }
}
