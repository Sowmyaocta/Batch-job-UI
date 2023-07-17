import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { SidebarDataShareService } from '../services/sidebar-data-share.service'
import { ToastService } from '../services/toast.service';
import { Subject, Subscription, take } from 'rxjs';
import { AppointmentService } from '../services/appointment.service'
import { JobsService } from '../services/jobs.service'
import { MatPaginator } from '@angular/material/paginator';
import  {MatMenu } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
  viewRunsList: any = [];
  displayedColumns: string[] = ['jobName','createdAt', 'status','startedAt','stoppedAt'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort!: MatSort;
  sortState: Sort = { active: 'jobName', direction: 'asc' };
  sidebarDataSubscription?: Subscription;

  constructor(private sidebarDataShareService: SidebarDataShareService, private toastService: ToastService, private appointmentService: AppointmentService, private jobsService: JobsService) { }

  @Input() runData:any;

  ngOnInit(): void {
    this.viewRunsTable();
  }

  viewRunsTable(): void {
     this.viewRunsList = this.runData;
     this.dataSource = new MatTableDataSource(this.runData);
     this.dataSource.sort = this.sort;
     this.sort.active = this.sortState.active;
     this.sort.direction = this.sortState.direction;
     this.sort.sortChange.emit(this.sortState);
     this.dataSource.paginator = this.paginator;
  }
}
