import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
import {Appointment} from '../models/appointment.model'

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataShareService {
  private appointmentData = new BehaviorSubject<Appointment>({});  //BehaviorSubject is always called when data is updated
  sharedAppointmentData = this.appointmentData.asObservable();
  constructor() { }
  setAppointmentData(appointmentObj: Appointment) {
    this.appointmentData.next(appointmentObj);
  }
}
