import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleDataComponent } from './add-vehicle-data.component';

describe('AddVehicleDataComponent', () => {
  let component: AddVehicleDataComponent;
  let fixture: ComponentFixture<AddVehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehicleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
