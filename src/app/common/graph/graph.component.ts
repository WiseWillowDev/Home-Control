import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;

  context: any;

  @Input() items : number[] = []


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawGraph()
  }

  computeX(x: number) {
    return 300 - x
  }


  computeGraph(xPer: number, item: number): void {
    const itemsCopies = [...this.items]
    let high = itemsCopies.sort()[this.items.length-1];
    let low = itemsCopies.sort()[0];


    const yPer = ((item-low) / (high - low)) * 150

    const x = this.computeX((xPer ) * 300 )
    const y = (yPer)
    console.log(300 - x, y, yPer, item)
    this.context.lineTo(x, y)
    this.context.stroke();
  }

  drawGraph(): void {
    this.myCanvas?.nativeElement?.getContext('2d');
    this.context = this.myCanvas?.nativeElement?.getContext('2d');
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#6DDD9A"

    this.context.moveTo(250, 10);


    this.items.forEach((item, index) => {
      // console.log((index / this.items.length), item);
      this.computeGraph((index / this.items.length), item)
    })
                          //x  y
    // this.context.moveTo(0, 0);
    // this.context.lineTo(10, 50);
    // this.context.stroke();
    // this.context.lineTo(100, 100);
    // this.context.stroke();
    // this.context.lineTo(200, 100);
    // this.context.stroke();
    // this.context.lineTo(300, 150);
    
    // this.context.stroke();
    // this.context.lineTo(300, 150);
    // this.context.stroke();

    // this.context.lineTo(this.computeX(300), 0)
    // this.context.stroke();

    // var grd = this.context.createLinearGradient(0, 0, 200, 0);
    // grd.addColorStop(0, "red");
    // grd.addColorStop(1, "white");
    // this.context.fillStyle = grd;
    // this.context.fillRect(10, 10, 150, 80);
    

  }


}
