import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CarEditStateService } from '../car-edit-state.service';
import { Car } from '../cars.model';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit {

  @Input() car: Car = {} as any;

  @Input() editable: boolean = false;
  
  @Output() update: EventEmitter<void> = new EventEmitter<void>()


  constructor(private router: Router, private carEditState: CarEditStateService, private carService: CarsService) { }

  ngOnInit(): void {
  }

  edit(): void {
    this.carEditState.updateCar(this.car);
    this.router.navigate(['cars/edit'])
  }

  delete(): void {
    this.carService.deleteCar(this.car.plate).subscribe(() => {
      console.log('deleted');
    })
  }

  refresh(): void { 
    this.carService.reregisterCar(this.car.plate).subscribe(res => {
      console.log('refreshed');
    })
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


}
