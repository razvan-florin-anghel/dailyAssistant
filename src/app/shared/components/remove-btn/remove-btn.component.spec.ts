import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBtnComponent } from './remove-btn.component';

describe('RemoveBtnComponent', () => {
  let component: RemoveBtnComponent;
  let fixture: ComponentFixture<RemoveBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
