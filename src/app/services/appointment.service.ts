import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,pipe,map} from 'rxjs';
import { environment } from '../../environments/environment';
import {Providers} from '../models/providers.model';
import {Services} from '../models/services.model';
import { Appointment } from '../models/appointment.model';
import {AvailableDates} from '../models/available-dates.model';
import {AvailableTimeslot} from '../models/available-timeslot.model'
import { post } from 'jquery';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  baseApi :String = environment['baseApi'];
  constructor(private http :HttpClient) { }

  getAllProviders():Observable<Providers[]>{
    return this.http.get<any>(`${this.baseApi}/provider`).pipe(map((res) => res.data));
  }

  getAllServices():Observable<Services[]>{
    return this.http.get<any>(`${this.baseApi}/service`).pipe(map((res) => res.data));
  }

  getAllDropdowns():Observable<any>{
    return this.http.get<any>(`${this.baseApi}/appoitmentDropdowns`).pipe(map((res) => res.data));
  }

  getAppointmentTable():Observable<any>{   //{id:string,name:string,service:string,provider:string,date:string}[]
    return this.http.get<any>(`${this.baseApi}/customer/appointments`).pipe(map((res) => res.data));
  }

  getAppointmentTableDetails(postData:any):Observable<any>{   //{id:string,name:string,service:string,provider:string,date:string}[]
    const ajaxUrl = this.searchAppointmentUrlFormation(postData);
    return this.http.get<any>(`${this.baseApi}/customer/appointment?${ajaxUrl}`).pipe(map((res) => res.data));
    /* return this.http.get<any>(`${this.baseApi}/customer/appointment?serviceId=${postData.serviceId}&providerId=${postData.providerId}&startDate=${postData.startDate}&endDate=${postData.endDate}`).pipe(map((res) => res.data)); */
  }

  getCustomerDetails(postData:any):Observable<any>{   //{id:string,name:string,service:string,provider:string,date:string}[]
    return this.http.post<any>(`${this.baseApi}/customer`,postData).pipe(map((res) => res.data));
  }

  getAllSlots():Observable<any>{
    return this.http.get<any>(`${this.baseApi}/service/slots`).pipe(map((res) => res.data));
  }

  geSlotsByService(postData:any):Observable<any>{
    return this.http.get<any>(`${this.baseApi}/service/slots?serviceId=${postData}`).pipe(map((res) => res.data));
  }

  getAllLocations():Observable<any>{
   // return this.http.get<any>(`${this.baseApi}/provider/services`).pipe(map((res) => res.data));
    return this.http.get<any>(`${this.baseApi}/location`).pipe(map((res) => res.data));
  }

  getAllProvidersTable():Observable<Providers[]>{
    return this.http.get<any>(`${this.baseApi}/providers/providerTable`).pipe(map((res) => res.data));
  }

  addOrUpdateProviders(postData:any):Observable<any>{
    return this.http.patch<any>(`${this.baseApi}/provider`,postData).pipe(map((res) => res.data));
  }

  deleteProviders(postData:any):Observable<any>{
    return this.http.delete<any>(`${this.baseApi}/provider?id=${postData.id}`).pipe(map((res) => res.data));
  }

  addOrUpdateServices(postData:any):Observable<any>{
    return this.http.patch<any>(`${this.baseApi}/service`,postData).pipe(map((res) => res.data));
  }

  deleteServices(postData:any):Observable<any>{
    return this.http.delete<any>(`${this.baseApi}/service?id=${postData.id}`).pipe(map((res) => res.data));
  }

  addOrUpdateSlots(postData:any):Observable<any>{
    return this.http.patch<any>(`${this.baseApi}/service/slots`,postData).pipe(map((res) => res.data));
  }

  deletelots(postData:any):Observable<any>{
    return this.http.delete<any>(`${this.baseApi}/service/slots?ids=${postData.ids}`).pipe(map((res) => res.data));
  }
  
    getAvailableAppointmentDates(providerName:string,locationName:string,serviceName:string,startDt?:string,endDt?:string):Observable<AvailableDates[]>{//${serviceName}
    //return this.http.get<any>(`${this.baseApi}/provider/appointments?startDt=2022-07-24&endDt=2022-09-24&providerId=${providerid}`).pipe(map((res) => res.data));
    //return this.http.get<any>(`${this.baseApi}/appointments?providerId=${providerid}&startDt=${startDt}&endDt=${endDt}`).pipe(map((res) => res.data));
    if(providerName == undefined || providerName == null){
      return this.http.get<any>(`${this.baseApi}/provider/available/dates?location=${locationName}&serviceName=${serviceName}&startDate=${startDt}&endDate=${endDt}`).pipe(map((res) => res.data));
    }
    else{
      return this.http.get<any>(`${this.baseApi}/provider/available/dates?location=${locationName}&serviceName=${serviceName}&providerName=${providerName}&startDate=${startDt}&endDate=${endDt}`).pipe(map((res) => res.data));
    }
  }

  getAvailableTimeSlot(providerName:string,locationName:string,serviceName:string,appointmentDate:string,combineCounter:any):Observable<AvailableTimeslot[]>{
    //return this.http.get<any>(`${this.baseApi}/provider/appointments?startDt=2022-07-24&endDt=2022-09-24&providerId=${providerid}`).pipe(map((res) => res.data));
    if(providerName == undefined || providerName == null){
      return this.http.get<any>(`${this.baseApi}/provider/available/slots?location=${locationName}&serviceName=${serviceName}&date=${appointmentDate}&combinedSlot=${combineCounter}`).pipe(map((res) => (typeof res.data[0] === 'undefined' )?[]: res.data));  //res.data[0].slots
    }
    else{
      return this.http.get<any>(`${this.baseApi}/provider/available/slots?location=${locationName}&serviceName=${serviceName}&providerName=${providerName}&date=${appointmentDate}&combinedSlot=${combineCounter}`).pipe(map((res) => (typeof res.data[0] === 'undefined' )?[]: res.data));
    }
    //return this.http.get<any>(`${this.baseApi}/timeSlots?appointmentDate=${appointmentDate}`).pipe(map((res) => res.data));
  }

  postAppointmentDetails(postData:Appointment):Observable<any>{
    return this.http.post<any>(`${this.baseApi}/customer/appointment?startTime=${postData.startTime}`,postData).pipe(map((res) => res.data));
  }

  deleteAppointment(postData:any):Observable<any>{
    return this.http.delete<any>(`${this.baseApi}/customer/appointment?id=${postData.appointmentId}`).pipe(map((res) => res.data));
  }

  searchAppointmentUrlFormation(postData:any):any{
    var prvdString="";
    var srvString="";
    var startString="";
    var endString="";
    var ajaxString=""
    if(postData.providerId != null && postData.providerId != undefined){
        prvdString = "providerId="+postData.providerId;
        ajaxString +=prvdString;
    }
    if(postData.serviceId != null && postData.serviceId != undefined){
      srvString = "serviceId="+postData.serviceId;
      if(ajaxString == ""){
        ajaxString +=srvString;
      }
      else{
        ajaxString +='&'+srvString;
      }
    }
    if(postData.startDate != null && postData.startDate != undefined){
      startString = "startDate="+postData.startDate;
      if(ajaxString == ""){
        ajaxString +=startString;
      }
      else{
        ajaxString +='&'+startString;
      }
    }
    if(postData.endDate != null && postData.endDate != undefined){
      endString = "endDate="+postData.endDate;
      if(ajaxString == ""){
        ajaxString +=endString;
      }
      else{
        ajaxString +='&'+endString;
      }
    }
    return ajaxString;
  }

}
