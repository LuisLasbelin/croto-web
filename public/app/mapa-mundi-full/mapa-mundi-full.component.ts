import { Component, OnInit } from '@angular/core';
import { Area } from '../../defs/area'

@Component({
  selector: 'app-mapa-mundi-full',
  templateUrl: './mapa-mundi-full.component.html',
  styleUrls: ['./mapa-mundi-full.component.scss']
})
export class MapaMundiFullComponent implements OnInit {

  constructor() { }

  zoomed: boolean = false;

  canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = this.canvas?.getContext('2d');
  imageBackground: HTMLImageElement = new Image();

  // create circles to draw
  areas: Area[] = [
    {
      id: '01',
      x: 1690,
      y: 242,
      radius: 70,
      color: 'blue'
    },
    {
      id: '02',
      x: 2735,
      y: 655,
      radius: 70,
      color: 'red'
    }
  ];

  ngOnInit(): void {

    window.scrollTo(0,0);

    this.zoomed = false;

    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

    this.ctx = this.canvas.getContext("2d");

    this.drawBackground();

    this.canvas.addEventListener('click', (e: MouseEvent) => {
      // If there is already a zoom done, reset the canvas
      if(this.zoomed) {
        this.drawBackground();
        this.zoomed = false;
      }
      // click on top of an area
      let pos = this.getCurrentMousePosition(e, this.canvas);
      this.areas.forEach(area => {
        if (this.isIntersect(pos, area)) {
          // console.log('click on circle: ' + area.id);
          this.openArea(area);
        }
      })
    }) // canvas

    // POINTER MOUSE
    this.canvas.onmousemove = (e: MouseEvent) => {
      if(!this.zoomed) {
        // hover on top of an area
        let pos = this.getCurrentMousePosition(e, this.canvas);
        let pointing: boolean = false;
        this.areas.forEach(area => {
          if (this.isIntersect(pos, area)) {
            // hovering
            pointing = true;
          }
        })
        if(pointing) {
          this.canvas.style.cursor = "pointer";
        } else {
          this.canvas.style.cursor = "default";
        }
        return;
      }
    }
  }

  /**
   * Draws the background on the canvas
   */
  drawBackground() {
    // clean the canvas
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // load and draw map image for background
    // only if there is no src already
    if(this.imageBackground.src.length < 10) {
      this.imageBackground = new Image();
      this.imageBackground.src = '../../assets/Mapa/General con zooms.png';
      this.imageBackground.onload = () => {
        if(this.ctx != null) {
          this.ctx.imageSmoothingEnabled = false
          this.ctx.drawImage(this.imageBackground, 0, 0);
          // draw circles
          this.drawAreas();
        }
      };
    }
    else {
      // if the iamge is already loaded just draw it
      if(this.ctx != null) {
        this.ctx.imageSmoothingEnabled = false
        this.ctx.drawImage(this.imageBackground, 0, 0);
        // draw circles
        this.drawAreas();
      }
    }
  }

  /**
   * Draw areas in Area local object
   */
  drawAreas() {
    this.areas.forEach(area => {
      this.ctx?.beginPath();
      this.ctx?.arc(area.x, area.y, area.radius, 0, 2 * Math.PI, false);
    }); 
  }

  /**
   * 
   * @param e mouse event
   * @param canvas canvas clicked
   * @returns position of the mouse inside the canvas
   */
  getCurrentMousePosition(e: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()
    const aspect = {
      x: canvas.width / rect.right,
      y: canvas.height / rect.bottom
    }
    const pos = {
      x: e.offsetX * aspect.x,
      y: e.offsetY * aspect.y,
    };
    return pos;
  }

  /**
   * 
   * @param point mouse position
   * @param circle area to click
   * @returns boolean for if the point is inside the circle
   */
  isIntersect(point: {x: number, y: number}, circle: Area) {
    let dx = point.x - circle.x;
    let dy = point.y - circle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle.radius;
  }

  /**
   * 
   * @param a area clicked
   */
  openArea(a: Area) {
    // Can only open of it is not zoomed in already
    if(!this.zoomed) {
      this.zoomed = true;
      this.canvas.style.cursor = 'default';
      //this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let img = new Image();
      img.src = `../../assets/Mapa/Zooms sin fondo/Mapas_zoom-${a.id}.png`;
      img.onload = ()=> {
        this.ctx?.drawImage(img, this.canvas.width/4, 0);
      };
    }
  }
}
