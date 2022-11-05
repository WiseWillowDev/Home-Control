import { Observable, Subject } from 'rxjs';

export class GraphService {

    private graph$: Subject<number[]> = new Subject();

    setGraph(items: number[]): void {
        this.graph$.next(items);
    }

    getGraph(): Observable<number[]> {
        return this.graph$;
    }

}
