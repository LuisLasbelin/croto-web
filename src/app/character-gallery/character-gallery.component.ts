import { Component, OnInit } from '@angular/core';
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
export class CharacterGalleryComponent implements OnInit {

  characters: Character[] = characters;

  currCharacter: Character = characters[0];

  backgroundSrc: string = '../../assets/Personajes/Fondos/' + this.currCharacter.background;
  portraitSrc: string = '../../assets/Personajes/Ilustraciones/' + this.currCharacter.portrait;
  buttonSrc: string = '../../assets/Personajes/Botones/';

  animationState: boolean = false;

  currentButtonActiveId: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.animate();
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
    this.backgroundSrc = '../../assets/Personajes/Fondos/' + this.currCharacter.background;
    this.portraitSrc = '../../assets/Personajes/Ilustraciones/' + this.currCharacter.portrait;
    this.animate();
  }

  animate() {
    console.log('animating!')
    this.animationState = false;

    // Deactivate the past button
    let pastButton = document.getElementById(this.currentButtonActiveId.toString());
    pastButton?.classList.remove('btn-active');
    setTimeout(() => {
      this.currentButtonActiveId = this.currCharacter.id;
      let currButton = document.getElementById(this.currentButtonActiveId.toString());
      currButton?.classList.add('btn-active');
      this.animationState = true;
    }, 0.5);
  }
}
