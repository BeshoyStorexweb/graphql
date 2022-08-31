import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './events.routes';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EventModule {}
