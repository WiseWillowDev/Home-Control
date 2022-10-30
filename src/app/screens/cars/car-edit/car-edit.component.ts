import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ColorService } from 'src/app/common/colors/color.service';
import { CarEditStateService } from '../car-edit-state.service';
import { Car } from '../cars.model';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit, OnDestroy {

  loading = false;

  car: Car | null = null;
  carForm: FormGroup = new FormGroup({});

  nameControl: FormControl = new FormControl('', [Validators.required]);
  makeControl: FormControl = new FormControl('', [Validators.required]);
  modelControl: FormControl = new FormControl('', [Validators.required]);
  yearControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  plateControl: FormControl = new FormControl('', [Validators.required]);

  destroySub: Subject<void> = new Subject();

  selectedcolor: string = 'white';

  colors: string[] = [
    "red", 
    "blue", 
    "white", 
    "green", 
    "black", 
    "grey", 
    "pink",
    "yellow"
  ]



  constructor(private route: Router, private carEditState: CarEditStateService, private carService: CarsService, private colorService: ColorService) { }

  ngOnInit(): void {

    this.carForm.addControl('name', this.nameControl)
    this.carForm.addControl('make', this.makeControl)
    this.carForm.addControl('model', this.modelControl)
    this.carForm.addControl('year', this.yearControl)
    this.carForm.addControl('plate', this.plateControl)


    this.carEditState.getCar().pipe(takeUntil(this.destroySub)).subscribe((car: Car | null) => {
      if (!!car) {
        this.car = car;
        this.selectedcolor = car.color;
        this.carForm.controls["name"].setValue(car.nickname)
        this.carForm.controls["make"].setValue(car.make)
        this.carForm.controls["model"].setValue(car.model)
        this.carForm.controls["year"].setValue(car.year)
        this.carForm.controls["plate"].setValue(car.plate)
      }

    })
  }

  selectColor(color: string) {
    this.selectedcolor = color
  }

  showColor(color: string): string {
    const colors: any = this.colorService.getDarkMode();
    return colors[color];
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

    if (!this.loading) {  
      this.loading = true;
      if (!!this.car) {
        this.carService.updateCar(toBeSavedCar).subscribe(res => {
          this.loading = false;
          this.route.navigate(['/cars'])
        })
      } else {
        this.carService.registerNewCar(toBeSavedCar).subscribe(() => {
          this.loading = false;
          this.route.navigate(['/cars'])
        })
      }
    }


  }

  getFormattedValue(controlName: string): string {
    let value: string = this.carForm.controls[controlName].value;

    return value.trim();
  }

  cancel() {
    this.route.navigate(['/cars']);
  }

}
