import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarDataShareService } from '../services/sidebar-data-share.service'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  faCalendarCheck=faCalendarCheck;
  faLaptopMedical=faLaptopMedical;
  faStethoscope=faStethoscope;
  faBusinessTime=faBusinessTime;
  activePage: number = 1;
  sidebarDataSubscription?: Subscription;
  constructor(private sidebarDataShareService: SidebarDataShareService) { }

  ngOnInit(): void {
    this.sidebarDataSubscription = this.sidebarDataShareService.sharedSidebarData.subscribe((value) => {
      this.activePage = value;
    });
  }

}
