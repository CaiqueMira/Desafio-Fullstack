import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleDataComponent } from './update-vehicle-data.component';

describe('UpdateVehicleDataComponent', () => {
  let component: UpdateVehicleDataComponent;
  let fixture: ComponentFixture<UpdateVehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVehicleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
