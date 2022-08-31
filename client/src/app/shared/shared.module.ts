import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';

@NgModule({
  declarations: [MainNavigationComponent, ModalComponent, BackdropComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavigationComponent, ModalComponent,BackdropComponent],
})
export class SharedModule {}
