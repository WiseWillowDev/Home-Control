import { Observable, tap } from "rxjs";

export interface LoadingWrapper {
    loading: boolean
}

export function loadingFlipper(loading: LoadingWrapper) {
    loading.loading = true;
    return function<T>(source: Observable<T>): Observable<T> {
        return new Observable(subscriber => {
            return source.subscribe({
                next(value) {
                    subscriber.next(value);
                    loading.loading = false;
                }
            })
        })
    }
}