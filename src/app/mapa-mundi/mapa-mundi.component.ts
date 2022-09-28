import { Component, OnInit } from '@angular/core';
import { Area } from 'src/defs/area';

@Component({
  selector: 'app-mapa-mundi',
  templateUrl: './mapa-mundi.component.html',
  styleUrls: ['./mapa-mundi.component.scss']
})

export class MapaMundiComponent implements OnInit {

  constructor() { }

  pointerLoop: any;

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
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = '../../assets/Mapa/Mapa general.png';
    img.onload = () => {
      if(ctx != null) {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img, 0, 0);
        
        // draw circles
        this.areas.forEach(area => {
          ctx.beginPath();
          ctx.arc(area.x, area.y, area.radius, 0, 2 * Math.PI, false);
        }); 
      }
    };

    canvas.addEventListener('click', (e: MouseEvent) => {
      let pos = this.getCurrentMousePosition(e, canvas);
      this.areas.forEach(area => {
        if (this.isIntersect(pos, area)) {
          console.log('click on circle: ' + area.id);
        }
      })
    }) // canvas

    // POINTER MOUSE
    canvas.onmousemove = (e: MouseEvent) => {
      let pos = this.getCurrentMousePosition(e, canvas);
      let pointing: boolean = false;
      this.areas.forEach(area => {
        if (this.isIntersect(pos, area)) {
          pointing = true;
        }
      })
      if(pointing) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
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
}
