import { Component, OnInit } from '@angular/core';
import { Character, characters } from 'src/defs/characters';

@Component({
  selector: 'app-character-gallery',
  templateUrl: './character-gallery.component.html',
  styleUrls: ['./character-gallery.component.scss']
})
export class CharacterGalleryComponent implements OnInit {

  characters: Character[] = characters;

  currCharacter: Character = characters[0];

  backgroundSrc: string = '../../assets/Personajes/Fondos/' + this.currCharacter.background;
  portraitSrc: string = '../../assets/Personajes/Ilustraciones/' + this.currCharacter.portrait;
  buttonSrc: string = '../../assets/Personajes/Botones/';

  constructor() { }

  ngOnInit(): void {
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
  }

}
