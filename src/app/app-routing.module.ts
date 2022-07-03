import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsFormPageComponent } from './pages/user-details-form-page/user-details-form-page.component';
const routes: Routes = [
  {
    path: '',
    component: UserDetailsFormPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
