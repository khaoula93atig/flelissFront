import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AutofocusDirective } from './autofocus.directive';





@NgModule({
  declarations: [HeaderComponent, AutofocusDirective],
  imports: [
    CommonModule,
    ClarityModule, 
    RouterModule

  ],
  exports: [ HeaderComponent,AutofocusDirective ]

})
export class SharedModule { }
