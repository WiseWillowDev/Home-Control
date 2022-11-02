import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Score } from './hex.model';

@Injectable({
  providedIn: 'root'
})
export class HexViewStateService {

    hex$: BehaviorSubject<Score | null> = new BehaviorSubject<Score | null>(null)

    getModel(): Observable<Score | null> {
        return this.hex$;
    }

    updateModel(score: Score | null): void {
        this.hex$.next(score);
    }
}
