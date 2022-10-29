import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Light } from './light.model';

@Injectable({
  providedIn: 'root'
})
export class LightService {

    connection: any;

    lights$: BehaviorSubject<Light[]> = new BehaviorSubject<Light[]>([]);

    constructor() {
        this.connection = io('http://192.168.1.238:3001');
    }

    getLights(): Observable<Light[]> {
        return this.lights$;
    }

    refreshLights(): void {
        this.connection.on('lights', (res: Light[]) => {
            this.lights$.next(res);
        })
    }

    toggleLight(lightName: string): void {
        console.log('toggling')
        this.connection.emit('user-input', lightName)
    }
    

}
