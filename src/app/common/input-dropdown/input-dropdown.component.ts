import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorService } from '../colors/color.service';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss']
})
export class InputDropdownComponent<T> {
  
  @Input()
  control: FormControl = new FormControl();

  @Input() placeholder: string = '';

  @Input() dropdownItems: T[] = []

  constructor(private colorService: ColorService) {

  }

  getColor(color: string): string {
    const colors: any = this.colorService.getDarkMode();
    return colors[color];
  }

}
