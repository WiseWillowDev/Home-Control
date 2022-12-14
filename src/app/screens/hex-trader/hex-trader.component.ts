import { Component, OnInit } from '@angular/core';
import { loadingFlipper, LoadingWrapper } from 'src/app/common/operators/loading';
import { toastMsg } from 'src/app/common/operators/toast';
import { ToastService } from 'src/app/common/toast/toast.service';
import { Score } from './hex.model';
import { HexService } from './hex.service';

@Component({
  selector: 'app-hex-trader',
  templateUrl: './hex-trader.component.html',
  styleUrls: ['./hex-trader.component.scss']
})
export class HexTraderComponent implements OnInit {

  hexScores: Score[] = [];

  loading: LoadingWrapper = { loading: false };

  constructor(private hexService: HexService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.hexService.getScores(20)
    .pipe(
      loadingFlipper(this.loading), 
      toastMsg('', 'Getting Scores Failed', this.toastService)
    )
    .subscribe(scores => {
      this.hexScores = scores;
    })

  }

}
