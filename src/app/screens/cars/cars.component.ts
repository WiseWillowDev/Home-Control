import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/common/colors/color.service';
import { Colors } from 'src/app/common/colors/colors.model';
import { loadingFlipper, LoadingWrapper } from 'src/app/common/operators/loading';
import { toastMsg } from 'src/app/common/operators/toast';
import { ToastService } from 'src/app/common/toast/toast.service';
import { CarEditStateService } from './car-edit-state.service';
import { Car } from './cars.model';
import { CarsService } from './cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  editable: boolean = false;

  loading: LoadingWrapper = { loading: false};

  cars: Car[] = []

  colors: Colors = this.colorService.getDarkMode();

  constructor(
    private carService: CarsService, 
    private router: Router, 
    private carEditState: CarEditStateService, 
    private colorService: ColorService,
    private toastSerivce: ToastService
    ) { }

  ngOnInit(): void {
    this.refreshCars();
  }

  refreshCars(): void { 
      this.carService.getCars().pipe(loadingFlipper(this.loading), toastMsg('', 'Failed grabbing cars', this.toastSerivce)).subscribe((cars: Car[]) => {
        this.cars = cars.sort((a, b) => new Date(b.lastRegisteredDate).valueOf() - new Date(a.lastRegisteredDate).valueOf());
      })  

  }

  navigate(): void {
    this.carEditState.updateCar(null)
    this.router.navigate(['cars/edit'])
  }

  editToggle(): void {
    this.editable = !this.editable;
  }

}
