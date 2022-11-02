import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HexViewStateService } from '../hex-view-state.service';
import { Score } from '../hex.model';
import { HexService } from '../hex.service';

@Component({
  selector: 'app-hex-view-details',
  templateUrl: './hex-view-details.component.html',
  styleUrls: ['./hex-view-details.component.scss']
})
export class HexViewDetailsComponent implements OnInit {

  modelId: string = ''

  scores: Score[] = [];

  constructor(private hexStateService: HexViewStateService, private router: Router, private hexService: HexService) { }

  ngOnInit(): void {
    this.hexStateService.getModel().subscribe((score) => {
      if (!!score) {
        this.modelId = score.model_id;
        this.hexService.getScoresByModel(this.modelId).subscribe(scores => {
          this.scores = scores;
        })
      } else {
        this.router.navigate(['hex'])
      }

    })
  }

  getDate(mili: number): string {
    console.log(this.scores[0].start_mili)
    console.log(mili)

    const date = new Date(Math.floor(mili) * 1000);
    console.log(date);
    return date.toISOString().substring(0, 10);
  }

  formatScore(score: number): string {
    return score.toFixed(1);
  }

}
