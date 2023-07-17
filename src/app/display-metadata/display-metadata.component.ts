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
import {MatButton} from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import * as _ from 'lodash';

@Component({
  selector: 'app-display-metadata',
  templateUrl: './display-metadata.component.html',
  styleUrls: ['./display-metadata.component.css']
})
export class DisplayMetadataComponent implements OnInit {

  displayMetadataList: any = [];
  displayedColumns: string[] = ['jobId', 'fileName','s3Path'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort!: MatSort;
  sortState: Sort = { active: 'jobId', direction: 'asc' };
  sidebarDataSubscription?: Subscription;
  toggleCreateSection=false;
  errorView = false;
  errorMsg ="";

  createJob = new FormGroup({
    jobIdForm: new FormControl('',Validators.required),
    fileNameForm: new FormControl('',Validators.required),
    s3PathForm: new FormControl('',Validators.required),
  });

  constructor(private sidebarDataShareService: SidebarDataShareService, private toastService: ToastService, private appointmentService: AppointmentService, private jobsService: JobsService) { }

  @Input() displayMetadata:any;


  ngOnInit(): void {
    this.displayMetadataTable();
  }

  displayMetadataTable(): void {
    this.displayMetadataList = this.displayMetadata;
    this.dataSource = new MatTableDataSource(this.displayMetadata);
    this.dataSource.sort = this.sort;
    this.sort.active = this.sortState.active;
    this.sort.direction = this.sortState.direction;
    this.sort.sortChange.emit(this.sortState);
    this.dataSource.paginator = this.paginator;
 }

 onCreateClick(): void {
  this.toggleCreateSection = !this.toggleCreateSection;
 }

 validateJobForm():void {
  if(this.createJob.value.jobIdForm && this.createJob.value.fileNameForm && this.createJob.value.s3PathForm){
    console.log(this.createJob.value);
    this.errorView = false;
    let createJobObj:any ={};
    createJobObj.jobId = this.createJob.value.jobIdForm;
    createJobObj.fileName = this.createJob.value.fileNameForm;
    createJobObj.s3Path = this.createJob.value.s3PathForm;

    console.log(createJobObj);
    this.jobsService.postCreateJob(createJobObj)
    .subscribe({
      next:(data)=>{
        console.log("Job Created")
        this.toastService.show("Job Created Successfully", { classname: 'bg-success text-light', delay: 5000 });
       
      },
      error:(e)=>{
        console.log(e);
      }
    });

  }
  else{
    this.errorView = true;
    this.errorMsg ="Please enter all mandatory values";
  }
 }

}
