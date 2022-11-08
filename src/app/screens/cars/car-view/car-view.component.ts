import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ColorService } from 'src/app/common/colors/color.service';
import { Colors } from 'src/app/common/colors/colors.model';
import { loadingFlipper, LoadingWrapper } from 'src/app/common/operators/loading';
import { ToastMsg } from 'src/app/common/operators/toast';
import { ToastService, ToastType } from 'src/app/common/toast/toast.service';
import { CarEditStateService } from '../car-edit-state.service';
import { Car } from '../cars.model';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit, AfterViewInit {

  @Input() car: Car = {} as any;

  @Input() editable: boolean = false;
  
  @Output() update: EventEmitter<void> = new EventEmitter<void>()

  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;

  context: any;

  loading: LoadingWrapper = { loading: false };

  colors: Colors = this.colorService.getDarkMode();

  constructor(
    private router: Router, 
    private carEditState: CarEditStateService, 
    private carService: CarsService, 
    private colorService: ColorService,
    private toastSerivce: ToastService
    ) { }

  ngOnInit(): void {  }

  ngAfterViewInit(): void {
    this.drawCircles()
  }

  drawCircles(): void {
    this.myCanvas?.nativeElement?.getContext('2d');
    this.context = this.myCanvas?.nativeElement?.getContext('2d');
    const remaining = this.getTime().substring(0, this.getTime().length -1);   

    if (+remaining >= 0) {
      const remainingPi = (Math.PI * 2 - ((Math.PI * 2) * +remaining) / 48)
      this.drawPieSlice(150, 80, 40, Math.PI * 2, remainingPi, this.getColor(), this.colors.platformHighlight);
    }
  }

  drawPieSlice(centerX: any, centerY: any, radius: any, startAngle: any, endAngle: any, fillColor: any, strokeColor: any) {
    this.context.save();
    this.context.fillStyle = fillColor;
    this.context.strokeStyle = strokeColor;
    this.context.beginPath();
    this.context.moveTo(centerX, centerY);
    this.context.arc(centerX, centerY, radius, startAngle, endAngle, strokeColor);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
}

  getColor(): any {
    const carColor: string = this.car.color;
    const colors: any = this.colors;
    return colors[carColor];
  }

  edit(): void {
    this.carEditState.updateCar(this.car);
    this.router.navigate(['cars/edit'])
  }

  delete(): void {
    this.carService.deleteCar(this.car.plate).subscribe(() => {
      this.update.emit()
      this.toastSerivce.showMessage(`${this.car.plate} has been deleted`)
    })
  }

  refresh(): void { 
    if(!this.loading.loading) {
      this.carService.reregisterCar(this.car.plate)
      .pipe(loadingFlipper(this.loading), ToastMsg(`${this.car.nickname}'s Car has been reregistered`, `${this.car.nickname}'s Car failed being reregistered`, this.toastSerivce))
      .subscribe(() => {
        this.update.emit()
      })
    }
  }

  isExpired(): boolean {
    if (this.car) {
      let now = new Date();
      let registeredTime = new Date(this.car.lastRegisteredDate);

      let permit = (900000 * 4) * 48;
      let currentDiff = now.valueOf()- registeredTime.valueOf()

      if (currentDiff > permit) {
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  getTime(): string {
    if (!!this.car) {
      let now = new Date();
      let registeredTime = new Date(this.car.lastRegisteredDate);

      let permit = (900000 * 4) * 48;
      let currentDiff = now.valueOf()- registeredTime.valueOf()
      let remaining = permit - currentDiff
      let showed = ((remaining / 1000) / 60) / 60

      return `${Math.floor(showed)}h`;
    }
    return "";
  }

  getSrc(): string {
    const make = this.car.make.trim().toLowerCase();
    const assert = make.charAt(0).toUpperCase();
    const complete = `${assert}${make.substring(1)}`
    return `assets/svgs/${complete}.svg`
  }


}
