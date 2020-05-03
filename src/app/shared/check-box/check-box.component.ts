import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.less']
})
export class CheckBoxComponent implements OnInit {
  @Input() labelText: string = '';
  @Input() classes: any = null;
  @Input() componentId: string = 'checkBox';
  @Input() status: boolean = false;
  @Output() onStatusChange = new EventEmitter<boolean>();
  constructor() { }
  /**
   * 
   */
  ngOnInit(): void {
  }
  /**
   * 
   * @param e 
   */
  statusChange(e) {
    this.onStatusChange.emit(e.target.checked);
    this.status = e.target.checked;
  }

}
