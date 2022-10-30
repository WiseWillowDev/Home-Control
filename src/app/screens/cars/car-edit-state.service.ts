import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from './cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarEditStateService {

    car$: BehaviorSubject<Car | null> = new BehaviorSubject<Car | null>(null)

    getCar(): Observable<Car | null> {
        return this.car$;
    }

    updateCar(car: Car | null): void {
        this.car$.next(car);
    }
}
