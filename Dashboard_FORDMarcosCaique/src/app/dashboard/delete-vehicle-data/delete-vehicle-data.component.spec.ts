import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleDataComponent } from './delete-vehicle-data.component';

describe('DeleteVehicleDataComponent', () => {
  let component: DeleteVehicleDataComponent;
  let fixture: ComponentFixture<DeleteVehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVehicleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
