import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToggleService } from './toggle.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  toggle: boolean = false;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleService.getToggle().subscribe(res => {
      this.toggle = res;
    })
  }

  toggleItem(): void {
    this.toggleService.setToggle(!this.toggle)
  }
}
