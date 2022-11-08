import { Observable } from "rxjs";
import { ToastService, ToastType } from "../toast/toast.service";

export function ToastMsg(messageSuccess: string, messageFail: string, toastSerivce: ToastService) {
    return function<T>(source: Observable<T>): Observable<T> {
        return new Observable(subscriber => {
            return source.subscribe({
                next(value) {
                    toastSerivce.showMessage(messageSuccess)
                    subscriber.next(value);
                }, error(error) {
                    toastSerivce.showMessage(messageFail, ToastType.Fail)
                    subscriber.error(error)
                }
            })
        })
    }
}
