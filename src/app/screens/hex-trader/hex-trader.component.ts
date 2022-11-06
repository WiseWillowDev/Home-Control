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

  loading: boolean = false;

  constructor(private hexService: HexService) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.loading = true;
    this.hexService.getScores(20).subscribe(scores => {
      this.loading = false;
      this.hexScores = scores;
    })

  }

}
