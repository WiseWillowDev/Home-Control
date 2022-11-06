import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/common/colors/color.service';
import { Colors } from 'src/app/common/colors/colors.model';
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

  loading: boolean = false;

  cars: Car[] = []

  colors: Colors = this.colorService.getDarkMode();

  constructor(private carService: CarsService, private router: Router, private carEditState: CarEditStateService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.refreshCars();
  }

  refreshCars(): void { 
    this.loading = true;
    setTimeout(() => {
      this.carService.getCars().subscribe((cars: Car[]) => {
        this.loading = false;
        this.cars = cars.sort((a, b) => new Date(b.lastRegisteredDate).valueOf() - new Date(a.lastRegisteredDate).valueOf());
      })  
    }, 3000)

  }

  navigate(): void {
    this.carEditState.updateCar(null)
    this.router.navigate(['cars/edit'])
  }

  editToggle(): void {
    this.editable = !this.editable;
  }

}
