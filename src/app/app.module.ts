import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProvidersComponent } from './providers/providers.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CustomTimePipe } from './custom-time.pipe';
import {DpFormaterService} from './services/dp-formater.service'
import {MatButtonModule} from '@angular/material/button';
import { SrvComponent } from './srv/srv.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { DisplayMetadataComponent } from './display-metadata/display-metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveJobsComponent,
	  HeaderComponent,
    SrvComponent,
    SideBarComponent,
    ProvidersComponent,
    ToastsContainerComponent,
    CustomTimePipe,
    ViewJobsComponent,
    DisplayMetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	  FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
	  CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: DpFormaterService } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
