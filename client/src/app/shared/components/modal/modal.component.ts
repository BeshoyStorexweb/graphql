import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() canCancel: boolean = true;
  @Input() canConfirm: boolean = true;
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  cancelModal() {
    this.onCancel.emit(false);
  }

  confirmModal() {
    this.onConfirm.emit(false);
  }
}
