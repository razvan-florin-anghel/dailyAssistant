import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.less']
})
export class RemoveBtnComponent implements OnInit {
  @Input() show: any;
  @Input() data: any;
  @Output() onClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  remove() {
    this.onClick.emit(this.data.id);
  }
}
