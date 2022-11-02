import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HexViewStateService } from '../hex-view-state.service';
import { Score } from '../hex.model';

@Component({
  selector: 'app-hex-view',
  templateUrl: './hex-view.component.html',
  styleUrls: ['./hex-view.component.scss']
})
export class HexViewComponent implements OnInit {

  @Input() hexScore: Score = {} as any;
  
  constructor(private hexStateService: HexViewStateService, private router: Router) { }

  ngOnInit(): void {
  }

  getScore(): string {
    return this.hexScore.score.toFixed(2);
  }

  viewDetails(): void {
    this.hexStateService.updateModel(this.hexScore);
    this.router.navigate(['hex/details']);
  }

  formatId(): string {
    return this.hexScore.model_id.substring(0, 6).toUpperCase();
  } 

}
