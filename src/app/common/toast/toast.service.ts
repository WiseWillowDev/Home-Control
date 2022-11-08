import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message$: Subject<ToastWrapper> = new Subject<ToastWrapper>();

  constructor() { }

  getMessages(): Observable<ToastWrapper> {
    return this.message$;
  } 

  showMessage(message: string, type: ToastType = ToastType.Success): void {
    this.message$.next({message, type});
  }
}

export enum ToastType {
  Success,
  Fail
}

export interface ToastWrapper {
  message: string;
  type: ToastType;
}