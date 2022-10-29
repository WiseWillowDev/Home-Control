import { Component, Input, OnInit } from '@angular/core';
import { skip } from 'rxjs';
import { ToggleService } from 'src/app/common/toggle/toggle.service';
import { Light } from '../light.model';
import { LightService } from '../light.service';

@Component({
  selector: 'app-light-view',
  templateUrl: './light-view.component.html',
  styleUrls: ['./light-view.component.scss'],
  providers: [ToggleService]
})
export class LightViewComponent implements OnInit {

  @Input() light: Light = {} as any;

  constructor(private toggleService: ToggleService, private lightService: LightService) { }

  ngOnInit(): void {
    this.toggleService.setToggle(this.light.isOff);
    this.updateLight()
  } 

  updateLight(): void {
    this.toggleService.getToggle().pipe(skip(1)).subscribe(res => {
      this.lightService.toggleLight(this.light.name);
    })
  }
}
