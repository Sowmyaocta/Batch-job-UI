import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { SrvComponent } from './srv/srv.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'activejobs',
    pathMatch:'full',
  },
  {
    path: 'activejobs',
    component: ActiveJobsComponent
  },
  {
    path: 'providers',
    component: ProvidersComponent
  },
  {
    path: 'services',
    component: SrvComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
