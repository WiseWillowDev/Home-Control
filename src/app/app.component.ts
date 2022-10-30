import { Component } from '@angular/core';
import { ColorService } from './common/colors/color.service';
import { Colors } from './common/colors/colors.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home-control';

  colors: Colors = this.colorService.getDarkMode();

  constructor(private colorService: ColorService) {}
}
