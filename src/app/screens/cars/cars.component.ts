import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cars: Car[] = []


  constructor(private carService: CarsService, private router: Router, private carEditState: CarEditStateService) { }

  ngOnInit(): void {
    this.refreshCars();
  }


  refreshCars(): void {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars.sort((a, b) => new Date(b.lastRegisteredDate).valueOf() - new Date(a.lastRegisteredDate).valueOf());
    })
  }


  navigate(): void {
    this.carEditState.updateCar({ } as any)
    this.router.navigate(['cars/edit'])
  }

  editToggle(): void {
    this.editable = !this.editable
  }

}
