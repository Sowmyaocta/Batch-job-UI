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
import { FormControl, FormGroup } from '@angular/forms'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit, OnDestroy {
  loading=true;
  modalReference:any; 
  faTrash = faTrash;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  mdlTitle = "";
  mode = 'new';
  errorView = false;
  errorMsg = "";
  providers: any = [];
  serviceList: any = [];
  mdlProvider: any = {};
  dropdownSettings:IDropdownSettings = {};//'id', 
  displayedColumns: string[] = ['providerName','regNum', 'serviceName','serviceId', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sortState: Sort = { active: 'providerName', direction: 'asc' };
  @ViewChild('mdlcontent') mdlcontent: any; //
  @ViewChild('mdlAlert') mdlAlert: any;
  mdlUpdate: any = {}
  show:boolean=true;
  sidebarDataSubscription?: Subscription;
  constructor(private sidebarDataShareService: SidebarDataShareService, private toastService: ToastService, private appointmentService: AppointmentService, private modalService: NgbModal) { }
  activePage: number = 2;
  providerForm = new FormGroup({
    providerName: new FormControl(''),
    regNum: new FormControl(''),
    serviceId: new FormControl(),
  });
  ngOnInit(): void {
    this.sidebarDataShareService.setSidebarData(this.activePage);
    this.retriveProvidersTable();
  }
  retriveProvidersTable(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'serviceName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.loading=true;
    this.appointmentService.getAllProviders()    //getAllProvidersTable
      .subscribe({
        next: (data) => {
          console.log(data);
          this.providers = data;
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.sort.active = this.sortState.active;
          this.sort.direction = this.sortState.direction;
          this.sort.sortChange.emit(this.sortState);
          this.dataSource.paginator = this.paginator;
          if (this.serviceList.length == 0) {
            this.appointmentService.getAllServices()
              .subscribe({
                next: (data) => {
                  this.serviceList = data;
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

          //this.dtTrigger.next(0); //issue with rx js 7 , expects value for next
        },
        error: (e2) => {
            this.loading=false;
            console.log(e2);
            this.toastService.show(e2.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
        }
      });
  }
  addNewProvider(mode: string): void {
    this.errorView = false;
    this.errorMsg = "";
    this.mdlTitle = "Add Provider";
    this.mode = 'new';
    this.providerForm.patchValue({
      providerName: "",
      regNum:"",
      serviceId: null
    });
    this.modalReference = this.modalService.open(this.mdlcontent);
  }
  updateProvider(element: any): void {
    this.errorView = false;
    this.errorMsg = "";
    this.mdlTitle = "Update Provider";
    this.mode = 'edit';
    console.log(element);
    this.mdlUpdate = element;
    //const editSrv = this.serviceList.filter((val:any)=>val.id == this.mdlUpdate.serviceId);
    //const srf=[1,2,3];
    //const editSrv = this.serviceList.filter((val:any)=>val.id in this.mdlUpdate.serviceId);
    this.providerForm.patchValue({
      providerName: this.mdlUpdate.providerName,
      regNum:this.mdlUpdate.regNum,
      serviceId: this.mdlUpdate.serviceId
    });
    this.modalReference =  this.modalService.open(this.mdlcontent);
  }
  mdlSave(): void {
    if (this.providerForm.value.providerName && this.providerForm.value.regNum && this.providerForm.value.serviceId.length>0) {
      console.log(this.providerForm.value);
      this.errorView = false;
      this.errorMsg = "";
      this.loading=true;
      const postObj={...this.providerForm.value,id:this.mdlUpdate.id,serviceIds:[]};
      if(this.mode === 'new'){
        postObj.id=null;
      }
      let srvVal=this.providerForm.value;
      let srvValList;
      if (srvVal.serviceId && this.mode == 'new'){
        srvValList = srvVal!.serviceId.map((val:any)=>val.id);
      }
      if (srvVal.serviceId && this.mode == 'edit'){
        srvValList = [srvVal.serviceId];
      }
      postObj.serviceId=srvValList;
      postObj.serviceIds=srvValList;
      this.appointmentService.addOrUpdateProviders(postObj)  //postObj
        .subscribe({
          next: (data) => {
            console.log(data);
            if (this.mode === 'new') {
              this.toastService.show('Provider added Successfully !!!', { classname: 'bg-success text-light', delay: 4000 });
            }
            else if (this.mode === 'new') {
              this.toastService.show('Provider updated Successfully !!!', { classname: 'bg-success text-light', delay: 4000 });
            }
            this.modalReference.close('submitted')
            this.retriveProvidersTable();
          },
          error: (e) => {
            this.loading=false;
            console.log(e);
            this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
          }
        });
      /* if(this.mode === 'new'){

      }
      else if (this.mode === 'edit'){

      } */
    }
    else {
      this.errorView = true;
      this.errorMsg = "Please enter all mandatory values";
    }
  }
  mdlDelete(): void {
    this.loading=true;
    this.appointmentService.deleteProviders(this.mdlUpdate)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.show('Provider : ' + this.mdlUpdate.providerName + ' deleted Successfully !!!', { classname: 'bg-success text-light', delay: 2000 });
          this.modalReference.close('submitted');
          this.retriveProvidersTable();
        },
        error: (e) => {
          this.loading=false;
            console.log(e);
            this.toastService.show(e.error.statusDescription, { classname: 'bg-danger text-light', delay: 5000 });
        }
      });
  }
  deleteProvider(element: any): void {
    this.mdlTitle = "Delete Provider";
    console.log(element);
    this.mdlUpdate = element;
    this.modalReference = this.modalService.open(this.mdlAlert);
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
