import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  show = false;
  message = ''

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.getMessages().subscribe((message: string) => {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
        this.message = ''
      }, 3000)
    })
  }



}
