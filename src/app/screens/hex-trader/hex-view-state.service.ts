import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Score } from './hex.model';

@Injectable({
  providedIn: 'root'
})
export class HexViewStateService {

    hex$: BehaviorSubject<Score> = new BehaviorSubject<Score>({ } as any)

    getModel(): Observable<Score> {
        return this.hex$;
    }

    updateModel(score: Score): void {
        this.hex$.next(score);
    }
}
