import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-mundi',
  templateUrl: './mapa-mundi.component.html',
  styleUrls: ['./mapa-mundi.component.scss']
})
export class MapaMundiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, canvas.width, img.height*(canvas.width/img.width));
    };
    img.src = '../../assets/Mapa/Mapa general.jpg';
  }

}
