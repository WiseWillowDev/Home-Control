import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/common/colors/color.service';
import { Colors } from 'src/app/common/colors/colors.model';
import { GraphService } from 'src/app/common/graph/graph.service';
import { HexViewStateService } from '../hex-view-state.service';
import { Score } from '../hex.model';
import { HexService } from '../hex.service';

@Component({
  selector: 'app-hex-view-details',
  templateUrl: './hex-view-details.component.html',
  styleUrls: ['./hex-view-details.component.scss'],
  providers: [GraphService]
})
export class HexViewDetailsComponent implements OnInit {

  modelId: string = ''

  scores: Score[] = [];

  add: boolean = false;

  colors: Colors = this.colorService.getDarkMode();

  hexForm: FormGroup = new FormGroup({});

  loading: boolean = false;

  startControl: FormControl = new FormControl('', [Validators.required]);
  endControl: FormControl = new FormControl('', [Validators.required]);

  startPrice = 0
  endPrice = 0

  items: number[] = []
  source: {mili: number, time: string, price: number}[] = []

  constructor(
    private hexStateService: HexViewStateService, 
    private router: Router, 
    private hexService: HexService, 
    private colorService: ColorService,
    private graphService: GraphService
    ) { }

  ngOnInit(): void {
    this.hexStateService.getModel().subscribe((score) => {
      if (!!score) {
        this.modelId = score.model_id;
        this.loading = true;
        this.hexService.getScoresByModel(this.modelId).subscribe(scores => {
          this.loading = false;
          this.scores = scores;
        })
      } else {
        this.router.navigate(['hex'])
      }

    })

    this.startControl.valueChanges.subscribe(value => {
      this.hexService.getMili(value).subscribe(mili => {
        this.startPrice = mili.price
        console.log(mili)
      })
    })
    this.endControl.valueChanges.subscribe(value => {
      this.hexService.getMili(value).subscribe(mili => {
        this.endPrice = mili.price
        console.log(mili)
      })
    })
  }

  grabData(mili: number): void {
    // console.log(mili)
    this.hexService.getMili(mili).subscribe((value: {mili: number, time: string, price: number}) => {
      // console.log(value)
      this.source.push(value);
      this.source.sort((a ,b) => a.mili > b.mili ? 1 : -1)
      this.items = [...this.source.map((item) => item.price)];
      this.graphService.setGraph(this.items);
    })
  }

  graphMe(score: Score) {
    this.source = []
    this.items = []
    const divider = 10
    const partial: number = ((score.end_mili - score.start_mili) / divider)

    for(let i = 1; i < divider; i++) {
      this.grabData((+partial * i) + (+score.start_mili));

    }
    this.grabData(score.start_mili);
    this.grabData(score.end_mili);
  }

  getPrice(): number {
    const startMoney = 1000
    const token = startMoney / this.startPrice 
    return (token * this.endPrice) - startMoney
  }

  getDate(mili: number): string {
    const date = new Date(Math.floor(mili) * 1000);
    return date.toISOString().substring(0, 10);
  }

  formatScore(score: number): string {
    return score.toFixed(1);
  }

  addModel(): void {
    this.add = !this.add;
    this.startControl.setValue("1629929360.0")
    this.endControl.setValue("1662765562.0")
  }

  testModel(): void {
    const start = this.startControl.value
    const end = this.endControl.value
    this.hexService.testNewStuff(this.modelId, start, end ).subscribe(res => {
      this.add = !this.add
    })
  }

}
