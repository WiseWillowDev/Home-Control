import { BehaviorSubject, Observable } from 'rxjs';

export class ToggleService {

    private toggle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getToggle(): Observable<boolean> {
        return this.toggle$;
    }

    setToggle(toggle: boolean): void {
        this.toggle$.next(toggle)
    }
}
