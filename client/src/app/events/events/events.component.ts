import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  creating: boolean = false;
  eventForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
  });
  constructor(private fb: FormBuilder, private eventService: EventService) {}
  ngOnInit(): void {}

  startAddEvent() {
    this.creating = true;
  }

  closeModal() {
    this.creating = false;
  }

  onConfirm() {
    this.creating = false;
    console.log(this.eventForm.value);
    const { title, price, description, date } = this.eventForm.value;
    this.eventService.createEvent(title, price, description, date).subscribe(console.log);
    this.eventForm.reset();
  }
}
