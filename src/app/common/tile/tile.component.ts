import { Component, OnInit } from '@angular/core';
import { ColorService } from '../colors/color.service';
import { Colors } from '../colors/colors.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  colors: Colors = this.colorService.getDarkMode();

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
  }

}
