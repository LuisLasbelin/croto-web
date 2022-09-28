import { Component, OnInit } from '@angular/core';
import { Area } from 'src/defs/area';

@Component({
  selector: 'app-mapa-mundi',
  templateUrl: './mapa-mundi.component.html',
  styleUrls: ['./mapa-mundi.component.scss']
})

export class MapaMundiComponent implements OnInit {

  constructor() { }

  noZoom: boolean = true;

  canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = this.canvas?.getContext('2d');

  // create circles to draw
  areas: Area[] = [
    {
      id: 'Cyria',
      x: 1500,
      y: 600,
      radius: 500,
      color: 'blue'
    },
    {
      id: 'Mar',
      x: 2400,
      y: 1200,
      radius: 500,
      color: 'red'
    }
  ];

  ngOnInit(): void {

    this.noZoom = true;

    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

    this.ctx = this.canvas.getContext("2d");

    let img = new Image();
    img.src = '../../assets/Mapa/Mapa general.png';
    img.onload = () => {
      if(this.ctx != null) {
        this.ctx.imageSmoothingEnabled = false
        this.ctx.drawImage(img, 0, 0);
        // draw circles
        this.areas.forEach(area => {
          this.ctx?.beginPath();
          this.ctx?.arc(area.x, area.y, area.radius, 0, 2 * Math.PI, false);
        }); 
      }
    };

    this.canvas.addEventListener('click', (e: MouseEvent) => {
      let pos = this.getCurrentMousePosition(e, this.canvas);
      this.areas.forEach(area => {
        if (this.isIntersect(pos, area)) {
          console.log('click on circle: ' + area.id);
          this.openArea();
        }
      })
    }) // canvas

    // POINTER MOUSE
    this.canvas.onmousemove = (e: MouseEvent) => {
      if(this.noZoom) {
        let pos = this.getCurrentMousePosition(e, this.canvas);
        let pointing: boolean = false;
        this.areas.forEach(area => {
          if (this.isIntersect(pos, area)) {
            pointing = true;
          }
        })
        if(pointing) {
          this.canvas.style.cursor = "pointer";
        } else {
          this.canvas.style.cursor = "default";
        }
      }
    }
  }

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

  isIntersect(point: {x: number, y: number}, circle: Area) {
    let dx = point.x - circle.x;
    let dy = point.y - circle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle.radius;
  }

  openArea() {
    this.noZoom = false;
    this.canvas.style.cursor = 'default';
    //this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let img = new Image();
    img.src = '../../assets/Mapa/Mapas_zoom-01.jpg';
    img.onload = ()=> {
      this.ctx?.drawImage(img, this.canvas.width/4, 0);
    };
  }
}
