import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { SidebarDataShareService } from '../services/sidebar-data-share.service'
import { ToastService } from '../services/toast.service';
import { Subject, Subscription, take } from 'rxjs';
import { AppointmentService } from '../services/appointment.service'
import { JobsService } from '../services/jobs.service'
import { MatPaginator } from '@angular/material/paginator';
import {MatMenu} from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.css']
})
export class ActiveJobsComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  loading=true;
  modalReference:any; 
  mdlTitle = "";
  mode = 'new';
  modalMode = 'viewJobs';
  runData: any=[];
  displayMetadata : any=[];
  errorView = false;
  errorMsg = "";
  jobsList: any = [];
  displayedColumns: string[] = ['jobDefinitionName','status', 'timeout', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort!: MatSort;
  sortState: Sort = { active: 'jobDefinitionName', direction: 'asc' };
  @ViewChild('mdlcontent') mdlcontent: any; //
  @ViewChild('mdlAlert') mdlAlert: any;
  mdlUpdate: any = {}
  show:boolean=true;
  sidebarDataSubscription?: Subscription;
  constructor(private sidebarDataShareService: SidebarDataShareService, private toastService: ToastService, private appointmentService: AppointmentService, private jobsService: JobsService, private modalService: NgbModal) { }
  activePage: number = 1;
  ngOnInit(): void {
    this.sidebarDataShareService.setSidebarData(this.activePage);
    this.retriveActiveJobsTable();
  }

  retriveActiveJobsTable(): void {
    this.loading=true;
    this.jobsService.getAllActiveJobs()  //postObj
    .subscribe({
      next: (data) => {
        console.log(data);
        this.jobsList = data;
       // this.dataSource.data = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.sort.active = this.sortState.active;
        this.sort.direction = this.sortState.direction;
        this.sort.sortChange.emit(this.sortState);
        this.dataSource.paginator = this.paginator;
        this.loading=false;
      },
      error: (e) => {
        this.loading=false;
        console.log(e);
        //this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }
  viewRuns(element: any,modaltype:string): void {
    console.log(element);
    const postObj={...element};
    this.jobsService.getAllBatchJobRuns(postObj)  //postObj
    .subscribe({
      next: (data) => {
        console.log(data);
        this.runData = data;
        this.mdlTitle ="View Runs"
        this.modalMode = 'viewJobs'
        this.modalReference = this.modalService.open(this.mdlcontent,{ size: 'lg' });
       // this.dataSource.data = data;
        this.loading=false;
      },
      error: (e) => {
        this.loading=false;
        console.log(e);
        //this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
    //this.modalReference = this.modalService.open(this.mdlcontent);
  }
  viewMetadata(element: any,modaltype:string): void {
    console.log(element);
    const postObj={...element};
    this.jobsService.getDisplayMetadata(postObj)  //postObj
    .subscribe({
      next: (data) => {
        console.log(data);
        this.displayMetadata = data;
        this.mdlTitle ="Display Metadata"
        this.modalMode = 'displayMetadata'
        this.modalReference = this.modalService.open(this.mdlcontent,{ size: 'lg' });
       // this.dataSource.data = data;
        this.loading=false;
      },
      error: (e) => {
        this.loading=false;
        console.log(e);
        //this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

  runJob(element: any,modaltype:string): void {
  
  }

}
