import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  storeUserData: boolean = false;
  constructor(private _storage: StorageMap) { }
  /**
   * 
   */
  ngOnInit(): void {
    this._storage
      .get('storeUserData')
      .subscribe(data => {
        this.storeUserData = !!data;
      });
  }
  /**
   * 
   * @param newStatus 
   */
  handleStatusChange(newStatus: boolean) {
    this._storage.set('storeUserData', newStatus).subscribe(() => { });
  }

}
