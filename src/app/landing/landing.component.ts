import { AfterContentChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterContentChecked {

  constructor() { }


  frames: HTMLImageElement[] = []
  // WARNING: to animate set totalFrames to 150
  totalFrames: number = -1;
  scrollSteps: number[] = []
  loading: boolean = true;


  ngAfterContentChecked(): void {
    this.loading = false;
    if(this.totalFrames < 0) {
      this.loading = false;
      setTimeout(() => {
        document.getElementById('loading')?.classList.add('hide-loader');
      }, 500);
    }
  }

  ngOnInit(): void {

    // Setup variables
    this.totalFrames = -1;
    this.loading = true;
    // ---------------------
    
    // only if there is animation
    if(this.totalFrames > 0) {
      this.loadImage(0);
      // add scroll event listener to animate
      document.addEventListener('scroll', (e: Event) => {
        this.animate();
      })
      
      // scroll until 1000 Y subdivided in 151 parts
      let subdivision: number = 650 / 151;
      // Start offset
      let accumulative = 100;
      for (let i = 0; i < 151; i++) {
        accumulative += subdivision;
        this.scrollSteps.push(accumulative);
      }
      let subdivisionBack: number = 100 / 151;
      let accumulativeBack = 0;
      for (let i = 0; i < 151; i++) {
        accumulative += subdivision;
        this.scrollSteps.push(accumulative);
      }
    }
    else {
      // if there is no animation only load de last frame of itself
      this.loadImage(150);
    }
  }

  loadImage(index: number) {
    if(index > 150) {
      // set default image
      let booksAnim = document.getElementsByClassName('animated-book');
      let bookAnim = booksAnim.item(0) as HTMLCanvasElement;
        // set the image src to the next frame based on the scrolling value
        let ctx = bookAnim.getContext('2d');
        if(ctx != null) {
          ctx.clearRect(0, 0, bookAnim.width, bookAnim.height);
          // Frame
          ctx.drawImage(this.frames[0], 0, 0);  
      }
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
        // frontward
        if(i < 151) {
          frame = i;
          break;
        }
        // backward
        else {
          frame = 150-(i-150);
          break;
        }
      }
    }
    for (let i = 0; i < booksAnim.length; i++) {
      // type
      let bookAnim = booksAnim.item(i) as HTMLCanvasElement;
      // set the image src to the next frame based on the scrolling value
      let ctx = bookAnim.getContext('2d');
      if(ctx != null) {
        ctx.clearRect(0, 0, bookAnim.width, bookAnim.height);
        // Frame
        ctx.drawImage(this.frames[frame], 0, 0);  
      }
    }

  }

}
