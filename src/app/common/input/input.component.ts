import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorService } from '../colors/color.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InputComponent {

  @Input()
  control: FormControl = new FormControl();

  @Input() placeholder: string = '';

  constructor(private colorService: ColorService) {

  }

  getColor(color: string): string {
    const colors: any = this.colorService.getDarkMode();
    return colors[color];
  }

}

