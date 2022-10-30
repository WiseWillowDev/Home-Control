import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Colors } from './colors.model';


@Injectable({
    providedIn: 'root'
})
export class ColorService {

    getDarkMode(): Colors {
        return {
            text: '#F1F1F1',
            background: '#000000',
            platform: '#252525',
            platformHighlight: '#6E6E6E',

            red: '#EC7D80',
            blue: '#75A2E5',
            grey: '#7D7C7C',
            green: '#6DDD9A',
            yellow: '#EEDFA1',
            pink: '#F390CC',
            black: '#000000',
            white: '#F1F1F1'
            
        }
    }


    private color$: BehaviorSubject<Colors> = new BehaviorSubject<Colors>(this.getDarkMode());

    getColors(): Observable<Colors> {
        return this.color$;
    }

}
