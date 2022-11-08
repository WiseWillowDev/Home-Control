import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType, ToastWrapper } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  show = false;
  message = ''
  type: ToastType = ToastType.Success;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    // this.show = true;
    // this.message = 'Test Message!'
    this.toastService.getMessages().subscribe((wrapper: ToastWrapper) => {
      if (!!wrapper.message) {
        this.message = wrapper.message;
        this.type = wrapper.type 
        this.show = true;
        setTimeout(() => {
          this.show = false; 
          this.message = ''
        }, 3000)
      }
    })
  }

  getType(): boolean {
    return this.type == ToastType.Success
  }



}
