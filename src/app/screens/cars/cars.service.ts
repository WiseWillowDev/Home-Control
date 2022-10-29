import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getBaseUrl(): string {
    return 'http://192.168.1.250:2999'
  }

  getCars(): Observable<Car[]> {
    const URL = `${this.getBaseUrl()}/cars`
    return this.http.get<Car[]>(URL);
  }

  reregisterCar(carPlate: string): Observable<HttpWrapper<any>> {
    const URL = `${this.getBaseUrl()}/reregister/${carPlate}`
    return this.http.get<HttpWrapper<any>>(URL);
  } 

  registerNewCar(car: Car): Observable<HttpWrapper<any>> {
    const URL = `${this.getBaseUrl()}/register`
    return this.http.post<HttpWrapper<any>>(URL, car);
  }

  updateCar(car: Car): Observable<HttpWrapper<any>> {
    const URL = `${this.getBaseUrl()}/car`
    return this.http.put<HttpWrapper<any>>(URL, car);
  } 

  deleteCar(plate: string): Observable<HttpWrapper<any>> {
    const URL = `${this.getBaseUrl()}/car/${plate}`
    return this.http.delete<HttpWrapper<any>>(URL);
  } 
}

interface HttpWrapper<T> {
    status: number;
    message: string;
    data: T;
}