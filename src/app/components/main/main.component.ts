import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import * as paper from 'paper';
import { Subscription, fromEvent } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() {}
  coordinates: { x: number; y: number } = { x: 0, y: 0 };
  containerX = 0;
  containerY = 0;
  ngOnInit() { }

  ngAfterViewInit() {
    // Initialize Paper.js canvas
    paper.setup('myCanvas');

    let img = new Image();
    var self =this;
    img.onload = function () {
      const backgroundImage = new paper.Raster('https://img.freepik.com/free-vector/nature-scene-background-with-rainbow-sky_1308-67727.jpg?w=1380&t=st=1693573141~exp=1693573741~hmac=a5605f084b889f45ac15d9c5ff73f5bf0ff650f01f921dc9e56b025fc4bac004');
      backgroundImage.position = paper.view.center;
      const canvasContainer = document.querySelector('.paper-canvas');
      console.log(canvasContainer?.getBoundingClientRect());
      
      // self.containerX = canvasContainer?.getBoundingClientRect()[0].x;
      // self.containerX = canvasContainer?.getBoundingClientRect()[0].y;
      
      console.log(canvasContainer?.getClientRects()  );
      let noob:any=canvasContainer?.getClientRects()
      console.log(noob.length,noob[0]);
      self.containerX=noob[0].x
      self.containerY=noob[0].y
      const canvasWidth = canvasContainer?.clientWidth;
      const canvasHeight = canvasContainer?.clientHeight;
      paper.view.viewSize = new paper.Size(canvasWidth?400:800, canvasHeight?400:800);

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
      console.log(offsetX,offsetY); 

      // if (
      //   offsetX >= backgroundImage.bounds.left &&
      //   offsetX <= backgroundImage.bounds.right &&
      //   offsetY >= backgroundImage.bounds.top &&
      //   offsetY <= backgroundImage.bounds.bottom
      // ) {        
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log("Coordinate x: " + x, 
                        "Coordinate y: " + y);
        console.log(offsetX,e.offsetY);
        console.log((Math.abs(e.offsetX), Math.abs(e.offsetY)));
        self.createCircle(Math.abs(self.containerX-e.clientX)*0.5, Math.abs((self.containerY-e.clientY))*0.5,'blue');

        // self.createCircle(Math.abs(x), Math.abs(y ));
      // }
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

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event:any)
  {
    console.log(event);
    this.createCircle(Math.abs(event.x), Math.abs(event.y));
    
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
  createCircle(x: number, y: number,color?:string): void {
    const circle = new paper.Path.Circle({
      center: new paper.Point(x, y),
      radius: 5,
      fillColor: color?color:'red'
    });
  }
}