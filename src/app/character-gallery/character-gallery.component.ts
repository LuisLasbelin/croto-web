import { Component, OnInit } from '@angular/core';
import { Character, characters } from 'src/defs/characters';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-character-gallery',
  templateUrl: './character-gallery.component.html',
  styleUrls: ['./character-gallery.component.scss'],
  animations: [
    trigger('imageBlend', [
      state('active', style({
        opacity: 1
      })),
      state('start', style({
        opacity: 0
      })),
      transition('start => active', [
        animate('0.5s')
      ])
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
    setTimeout(() => {
      this.animationState = true;
    }, 0.2);
  }

}
