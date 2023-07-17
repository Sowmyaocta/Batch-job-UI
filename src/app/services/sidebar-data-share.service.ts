import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarDataShareService {
  private sidebarData = new BehaviorSubject<number>(1);  //BehaviorSubject is always called when data is updated
  sharedSidebarData = this.sidebarData.asObservable();
  constructor() { }
  setSidebarData(activePage: number) {
    this.sidebarData.next(activePage);
  }
}

