import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from './cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarEditStateService {

    car$: BehaviorSubject<Car> = new BehaviorSubject<Car>({} as any)

    getCar(): Observable<Car> {
        return this.car$;
    }

    updateCar(car: Car): void {
        this.car$.next(car);
    }
}
