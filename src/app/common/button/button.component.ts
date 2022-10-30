import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() backgroundcolor: string = 'white';

  @Input() color: string = 'white';

  @Input() width: string = 'auto';

  constructor() { }

  ngOnInit(): void {

  }


}
