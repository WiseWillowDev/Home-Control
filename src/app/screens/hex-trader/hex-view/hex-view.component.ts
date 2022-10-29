import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../hex.model';

@Component({
  selector: 'app-hex-view',
  templateUrl: './hex-view.component.html',
  styleUrls: ['./hex-view.component.scss']
})
export class HexViewComponent implements OnInit {

  @Input() hexScore: Score = {} as any;
  
  constructor() { }

  ngOnInit(): void {
  }

  getScore(): string {
    return this.hexScore.score.toFixed(2);
  }

}
