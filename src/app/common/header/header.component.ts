import { Component, Input, OnInit } from '@angular/core';
import { ColorService } from '../colors/color.service';
import { Colors } from '../colors/colors.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = '';

  colors: Colors = this.colorService.getDarkMode();

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
  }

}
