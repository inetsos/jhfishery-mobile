import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ 
    RouterModule 
  ],
  declarations: []
})
export class AppRoutingModule { }
