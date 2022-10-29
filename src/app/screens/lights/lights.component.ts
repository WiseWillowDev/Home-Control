import { Component, OnInit } from '@angular/core';
import { Light } from './light.model';
import { LightService } from './light.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  lights: Light[] = []

  constructor(private lightService: LightService) { }

  ngOnInit(): void {
    this.lightService.refreshLights();
    this.lightService.getLights().subscribe((lights: Light[]) => {
      this.lights = lights;
    })
  }

}
