import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  frames: HTMLImageElement[] = []
  scrollSteps: number[] = []
  loading: boolean = true;

  ngOnInit(): void {
    this.loading = true;
    
    document.addEventListener('scroll', (e: Event) => {
      this.animate();
    })

    this.loadImage(0);
    
    // scroll until 1000 Y subdivided in 151 parts
    let subdivision: number = 1000 / 151;
    let accumulative = 0;
    for (let i = 0; i < 151; i++) {
      accumulative += subdivision;
      this.scrollSteps.push(accumulative);
    }
  }

  loadImage(index: number) {
    if(index > 150) {
      // end loading
      this.loading = false;
      setTimeout(() => {
        document.getElementById('loading')?.classList.add('hide-loader');
      }, 500)
      return;
    }
    let number: string = index.toString();
    // it has to be 4 digits
    while(number.length < 4) {
      number = '0' + number;
    }
    // create new image
    let newImg = new Image();
    newImg.src = `../../assets/Mockup libro girando/Secuencia PNG/Secuencia${number}.png`;
    newImg.onload = () => {
      // add image to array of frames
      this.frames.push(newImg);
      this.loadImage(index + 1);
      console.log("Image loaded " + index)
    }
  }

  animate() {
    let booksAnim = document.getElementsByClassName('animated-book');
    let scroll = document.documentElement.scrollTop;

    //check current frame
    let frame = 150;
    for (let i = 0; i < this.scrollSteps.length; i++) {
      if(this.scrollSteps[i] > scroll) {
        frame = i;
        break;
      }
    }
    for (let i = 0; i < booksAnim.length; i++) {
      // type
      let bookAnim = booksAnim.item(i) as HTMLCanvasElement;
      // set the image src to the next frame based on the scrolling value
      bookAnim.getContext('2d')?.clearRect(0, 0, bookAnim.width, bookAnim.height);
      bookAnim.getContext('2d')?.drawImage(this.frames[frame], 0, 0);  
    }

  }

}
