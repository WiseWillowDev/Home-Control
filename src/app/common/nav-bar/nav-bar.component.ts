import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from '../colors/color.service';
import { Colors } from '../colors/colors.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  colors: Colors = this.colorService.getDarkMode();

  constructor(private router: Router, private colorService: ColorService) { }

  ngOnInit(): void {
    this.colorService.getColors().subscribe((colors) => {

    })
  }

  route(route: string): void {
    this.router.navigate([route])
  }

  checkHighlight(route: string): boolean {
    return (this.router.url.substring(1) == route)
  }

  
}
