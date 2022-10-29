import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CarEditStateService } from '../car-edit-state.service';
import { Car } from '../cars.model';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit, OnDestroy {

  car: Car = {} as any;
  carForm: FormGroup = new FormGroup({});

  destroySub: Subject<void> = new Subject();

  selectedcolor: string = 'white';

  colors: string[] = ["black", "white", "red", "blue", "green", "grey", "pink"]

  constructor(private route: Router, private carEditState: CarEditStateService, private carService: CarsService) { }

  ngOnInit(): void {

    this.carForm.addControl('year', new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]))
    this.carForm.addControl('make', new FormControl('', [Validators.required]))
    this.carForm.addControl('model', new FormControl('', [Validators.required]))
    this.carForm.addControl('plate', new FormControl('', [Validators.required]))
    this.carForm.addControl('name', new FormControl('', [Validators.required]))


    this.carEditState.getCar().pipe(takeUntil(this.destroySub)).subscribe((car: Car) => {
      console.log(car);
      this.car = car;
      this.selectedcolor = car.color;
      this.carForm.controls["name"].setValue(car.nickname)
      this.carForm.controls["make"].setValue(car.make)
      this.carForm.controls["model"].setValue(car.model)
      this.carForm.controls["year"].setValue(car.year)
      this.carForm.controls["plate"].setValue(car.plate)
    })
  }

  selectColor(color: string) {
    this.selectedcolor = color
  }

  ngOnDestroy(): void {
      this.destroySub.next();
  }

  save(): void {

    const toBeSavedCar: Car = {
      nickname: this.getFormattedValue('name'),
      make: this.getFormattedValue('make'),
      model:this.getFormattedValue('model'),
      year: this.getFormattedValue('year'),
      color: this.selectedcolor,
      plate: this.getFormattedValue('plate').toUpperCase(),
      lastRegisteredDate: new Date()
    }

    this.carService.updateCar(toBeSavedCar).subscribe(res => {
      console.log('updated');
      this.route.navigate(['/cars'])
    })
  }

  getFormattedValue(controlName: string): string {
    let value: string = this.carForm.controls[controlName].value;

    return value.trim();
  }

}
