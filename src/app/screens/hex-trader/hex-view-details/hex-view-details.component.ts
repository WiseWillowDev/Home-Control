import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/common/colors/color.service';
import { Colors } from 'src/app/common/colors/colors.model';
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

  add: boolean = false;

  colors: Colors = this.colorService.getDarkMode();

  hexForm: FormGroup = new FormGroup({});

  startControl: FormControl = new FormControl('', [Validators.required]);
  endControl: FormControl = new FormControl('', [Validators.required]);

  startPrice = 0
  endPrice = 0

  items = [10, 20, 30, 20, 40, 70]


  constructor(private hexStateService: HexViewStateService, private router: Router, private hexService: HexService, private colorService: ColorService) { }

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

  getPrice(): number {
    const startMoney = 1000
    const token = startMoney / this.startPrice 
    return (token * this.endPrice) - startMoney
  }

  getDate(mili: number): string {
    // console.log(this.scores[0].start_mili)
    // console.log(mili)

    const date = new Date(Math.floor(mili) * 1000);
    // console.log(date);
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
