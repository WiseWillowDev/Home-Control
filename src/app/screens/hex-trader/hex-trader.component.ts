import { Component, OnInit } from '@angular/core';
import { Score } from './hex.model';
import { HexService } from './hex.service';

@Component({
  selector: 'app-hex-trader',
  templateUrl: './hex-trader.component.html',
  styleUrls: ['./hex-trader.component.scss']
})
export class HexTraderComponent implements OnInit {

  hexScores: Score[] = [];

  constructor(private hexService: HexService) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.hexService.getScores(30).subscribe(scores => {
      this.hexScores = scores;
    })

  }

}
