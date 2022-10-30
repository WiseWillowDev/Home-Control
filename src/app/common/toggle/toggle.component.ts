import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToggleService } from './toggle.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit, OnDestroy {

  toggleForm: FormGroup = new FormGroup({});
  destroy: Subject<void> = new Subject();

  @Input() color: string = 'blue';

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleForm.addControl('toggle', new FormControl(false, []))  

    this.toggleService.getToggle().pipe(takeUntil(this.destroy)).subscribe((res: boolean) => {
      this.toggleForm = new FormGroup({})
      this.toggleForm.addControl('toggle', new FormControl(res, []))  
    })

    this.toggleForm.controls['toggle'].valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => {
      this.toggleService.setToggle(value)
    })
  }

  ngOnDestroy(): void {
      this.destroy.next();
  }
}
