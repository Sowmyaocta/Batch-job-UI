import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidebarDataShareService } from '../services/sidebar-data-share.service'
import { ToastService } from '../services/toast.service';
import { Subject, Subscription, take } from 'rxjs';
import { AppointmentService } from '../services/appointment.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-srv',
  templateUrl: './srv.component.html',
  styleUrls: ['./srv.component.css']
})
export class SrvComponent implements OnInit,OnDestroy {
  loading=true;
  faTrash = faTrash;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  modalReference:any;
  mdlTitle = "";
  mode = 'new';
  errorView = false;
  errorMsg = "";
  show:boolean = true;
  locationList:any=[];
  services:any=[];
  mdlProvider:any={};//'id','location',
  dropdownSettings:IDropdownSettings = {};
  displayedColumns: string[] = [ 'serviceName', 'serviceDesc','locationName','locationId','apptDuration','actions'];
  dataSource =  new MatTableDataSource < any > ([]);
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sortState: Sort = {active: 'serviceName', direction: 'asc'};
  @ViewChild('mdlcontent') mdlcontent : any; //
  @ViewChild('mdlAlert') mdlAlert : any;
  mdlUpdate:any={}
  sidebarDataSubscription?: Subscription;
  constructor(private sidebarDataShareService: SidebarDataShareService, private toastService: ToastService, private appointmentService: AppointmentService, private modalService: NgbModal) { }
  activePage:number=3;
  serviceForm = new FormGroup({
    serviceName: new FormControl(''),
    serviceDesc: new FormControl(''),
    apptDuration: new FormControl(0,[Validators.max(240), Validators.min(0)]),
    locationId: new FormControl(),
  });
  ngOnInit(): void {
    this.sidebarDataShareService.setSidebarData(this.activePage); 
    this.retriveServiceTable();
  }
  retriveServiceTable():void {
    this.loading=true;
    this.appointmentService.getAllServices()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.services = data;
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.sort.active = this.sortState.active;
          this.sort.direction =this.sortState.direction;
          this.sort.sortChange.emit(this.sortState);
          this.dataSource.paginator = this.paginator;
          if (this.locationList.length == 0) {
            this.appointmentService.getAllLocations()
              .subscribe({
                next: (data) => {
                  this.locationList = data;
                  this.loading=false;
                },
                error: (e) => {
                  this.loading=false;
                  console.log(e);
                  this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
                }
              });
          }
          else{
            this.loading=false;
          }
        },
        error:(e2)=>{
          this.loading=false;
          console.log(e2);
          this.toastService.show(e2.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
        }
      });
  }
  addNewServices(mode: string):void{
    this.errorView = false;
    this.errorMsg = "";
    this.mdlTitle = "Add Service";
    this.mode = 'new';
    this.serviceForm.patchValue({
      serviceName: "",
      serviceDesc: "",
      apptDuration: 0,
      locationId: null,
    });
    this.modalReference =  this.modalService.open(this.mdlcontent,{ modalDialogClass: 'srvCmp-modal'});
  }
  updateService(element:any):void{
    this.errorView = false;
    this.errorMsg = "";
    this.mdlTitle = "Update Service";
    this.mode = 'edit';
    console.log(element);
    this.mdlUpdate = element;
    //const editSrv = this.locationList.filter((val:any)=>val.id in this.mdlUpdate.locationId);
    this.serviceForm.patchValue({
      serviceName:  this.mdlUpdate.serviceName,
      serviceDesc:  this.mdlUpdate.serviceDesc,
      apptDuration:  this.mdlUpdate.apptDuration,
      locationId:  this.mdlUpdate.locationId,
    });
    this.modalReference = this.modalService.open(this.mdlcontent,{ modalDialogClass: 'srvCmp-modal'});
  }
  mdlSave():void{
    if (this.serviceForm.value.serviceName && this.serviceForm.value.apptDuration && this.serviceForm.value.locationId) {
      console.log(this.serviceForm.value);
      this.errorView = false;
      this.errorMsg = "";
      this.loading=true;
      const postObj={...this.serviceForm.value,id:this.mdlUpdate.id};
      if(this.mode === 'new'){
        postObj.id=null;
      }
      let locVal=this.serviceForm.value;
      /* let locValList;
      if (locVal.locationId){
        locValList = locVal!.locationId.map((val:any)=>val.id);
      }
      postObj.locationId=locValList; */
      this.appointmentService.addOrUpdateServices(postObj)   //postObj
        .subscribe({
          next: (data) => {
            console.log(data);
            if (this.mode === 'new') {
              this.toastService.show('Service added Successfully !!!', { classname: 'bg-success text-light', delay: 4000 });
            }
            else if (this.mode === 'new') {
              this.toastService.show('Service updated Successfully !!!', { classname: 'bg-success text-light', delay: 4000 });
            }
            this.modalReference.close('submitted')
            this.retriveServiceTable();
          },
          error: (e) => {
            this.loading=false;
            console.log(e);
            this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
          }
        });
    }
    else {
      this.errorView = true;
      this.errorMsg = "Please enter all mandatory values";
    }
  }
  mdlDelete():void{
    this.loading=true;
    this.appointmentService.deleteServices(this.mdlUpdate)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.show('Service : ' + this.mdlUpdate.serviceName + ' deleted Successfully !!!', { classname: 'bg-success text-light', delay: 2000 });
          this.modalReference.close('submitted')
          this.retriveServiceTable();
        },
        error: (e) => {
          this.loading=false;
          console.log(e);
          this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
        }
      });
  }
  deleteService(element:any):void{
    this.mdlTitle="Delete Service";
    console.log(element);
    this.mdlUpdate=element;
    this.modalReference = this.modalService.open(this.mdlAlert);
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
