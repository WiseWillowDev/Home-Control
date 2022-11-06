import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message$: Subject<string> = new Subject<string>();

  constructor() { }

  getMessages(): Observable<string> {
    return this.message$;
  }

  showMessage(message: string): void {
    this.message$.next(message);
  }
}
