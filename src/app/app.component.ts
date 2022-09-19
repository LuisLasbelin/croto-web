import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state('topX', style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // hides element when create the X (used in the middle bar)
      state('hide', style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state('bottomX', style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // menu open 
      state('open', style({
        top: '0px'
      })),
      // menu close
      state('closed', style({
        top: "-2000px"
      })),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'Sinfonía de Sombras';

  constructor() { }

  isHamburguer = true;

  toggle() {
    this.isHamburguer = !this.isHamburguer;
  }

  scroll(id: string) {
    let el: HTMLElement | null = document.getElementById(id);

    if(el != null) el?.scrollIntoView({behavior: 'smooth'});

    this.isHamburguer = true;
  }

  ngOnInit(): void {
  }

}
