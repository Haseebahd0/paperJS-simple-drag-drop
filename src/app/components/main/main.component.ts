import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import * as paper from 'paper';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Initialize Paper.js canvas
    paper.setup('myCanvas');

    let img = new Image();
    var self =this;
    img.onload = function () {
      const backgroundImage = new paper.Raster('https://img.freepik.com/free-vector/nature-scene-background-with-rainbow-sky_1308-67727.jpg?w=1380&t=st=1693573141~exp=1693573741~hmac=a5605f084b889f45ac15d9c5ff73f5bf0ff650f01f921dc9e56b025fc4bac004');
      backgroundImage.position = paper.view.center;
      const canvasContainer = document.querySelector('.paper-canvas');
      const canvasWidth = canvasContainer?.clientWidth;
      const canvasHeight = canvasContainer?.clientHeight;
      paper.view.viewSize = new paper.Size(canvasWidth?canvasWidth:800, canvasHeight?canvasHeight:800);

      // Optional: Scale the image to fit the canvas
      backgroundImage.fitBounds(paper.view.bounds);
      const canvas = document.getElementById('myCanvas');
    canvas?.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    canvas?.addEventListener('drop', (e) => {
      e.preventDefault();
      const { offsetX, offsetY } = e;
      console.log('creating circle',e);
      
      if (
        offsetX >= backgroundImage.bounds.left &&
        offsetX <= backgroundImage.bounds.right &&
        offsetY >= backgroundImage.bounds.top &&
        offsetY <= backgroundImage.bounds.bottom
      ) {
        self.createCircle(offsetX, offsetY);
      }
    });
    }
    img.src= 'https://img.freepik.com/free-vector/nature-scene-background-with-rainbow-sky_1308-67727.jpg?w=1380&t=st=1693573141~exp=1693573741~hmac=a5605f084b889f45ac15d9c5ff73f5bf0ff650f01f921dc9e56b025fc4bac004'
    // Load and set the background image
    

    // Define your Paper.js drawing logic here
    // For example:
    // const circle = new paper.Path.Circle({
    //   center: paper.view.center,
    //   radius: 50,
    //   fillColor: 'red'
    // });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Update canvas dimensions when the window is resized
    this.setCanvasDimensions();
  }

  private setCanvasDimensions(): void {
    // Get the parent container's dimensions
    const canvasContainer = document.querySelector('.paper-canvas');
    const canvasWidth = canvasContainer?.clientWidth;
    const canvasHeight = canvasContainer?.clientHeight;

    // Update Paper.js canvas dimensions
    paper.view.viewSize = new paper.Size(canvasWidth?canvasWidth:800, canvasHeight?canvasHeight:800);
  }
  createCircle(x: number, y: number): void {
    const circle = new paper.Path.Circle({
      center: new paper.Point(x, y),
      radius: 5,
      fillColor: 'red'
    });
  }
}