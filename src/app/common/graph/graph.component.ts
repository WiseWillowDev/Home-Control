import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements AfterViewInit {

  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;

  context: any;

  constructor(private graphService: GraphService) { }

  ngAfterViewInit(): void {
    this.graphService.getGraph().subscribe((items: number[]) => {
      // this.context.clearRect(0, 0, this.myCanvas?.nativeElement.width, this.myCanvas?.nativeElement.height);
      // this.context.clear();

      this.drawGraph(items);
      
    })
  }

  computeX(x: number) {
    return 300 - x
  }


  computeGraph(x: number, y: number): void {
    this.context.lineTo(x, y)
    this.context.stroke();
  }

  computeY(yPerc: number): number {
    const y = (yPerc * 150) / 100
    return 150 - y;
  }

  drawGraph(items: number[]): void {
    this.myCanvas?.nativeElement?.getContext('2d');
    this.context = this.myCanvas?.nativeElement?.getContext('2d');

    this.context.clearRect(0, 0, this.myCanvas?.nativeElement.width, this.myCanvas?.nativeElement.height);
    // console.log(this.context)
    // this.context.clear()
    this.context.beginPath();

    this.context.lineWidth = 5;
    this.context.strokeStyle = "#6DDD9A"

    const multiplier = 300 /(items.length - 1)

    const replica: number[] = [...items];
    replica.sort((a,b) => a > b ? 1 : -1);

    const high = replica[replica.length -1 ];
    const low = replica[0];

    items.forEach((item, index) => {
      const yPer = ((item - low) / (high - low)) * 100
      this.computeGraph((index * multiplier), this.computeY(yPer))
    })
                    // x  y
    // this.computeGraph(0, this.computeY(25))
    // this.computeGraph(50, this.computeY(0))
    // this.computeGraph(100, this.computeY(75))
    // this.computeGraph(150, this.computeY(75))
    // this.computeGraph(200, this.computeY(100))
    // this.computeGraph(250, this.computeY(25))
    // this.computeGraph(300, this.computeY(0))
  }


}
