import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,pipe,map, of} from 'rxjs';
import { environment } from '../../environments/environment';
import {activeJobsMockData} from '../mockdata/activeJobsData';
import {batchJobRunsMockData} from '../mockdata/batchJobRunsData';
import {displayMetadataMockdata} from '../mockdata/displayMetadata';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseApi :String = environment['baseApi'];
  constructor(private http :HttpClient) { }

  getAllActiveJobs():Observable<any[]>{
    //return this.http.get<any>(`${this.baseApi}/listjobs`).pipe(map((res) => res.data));
    return of(activeJobsMockData.data);
  }

  getAllBatchJobRuns(postData:any):Observable<any[]>{
    //return this.http.post<any>(`${this.baseApi}/customer`,postData).pipe(map((res) => res.data));
    //return this.http.get<any>(`${this.baseApi}/listRuns?JobName=${postData.jobDefinitionName}&JobDefinationArn=${postData.jobDefinitionArn}`).pipe(map((res) => res.data));
    return of(batchJobRunsMockData.data);
  }

  getDisplayMetadata(postData:any):Observable<any[]>{
    //return this.http.get<any>(`${this.baseApi}/metadata?jobId=${postData.jobDefinitionName}`).pipe(map((res) => res.data));
    return of(displayMetadataMockdata.data);
  }

  postCreateJob(postData:any):Observable<any[]>{
    //return this.http.get<any>(`${this.baseApi}/metadata?jobId=${postData.jobDefinitionName}`).pipe(map((res) => res.data));
    return of(displayMetadataMockdata.data);
  }

}
