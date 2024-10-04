import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPqrComponent } from './edit-pqr.component';

describe('EditPqrComponent', () => {
  let component: EditPqrComponent;
  let fixture: ComponentFixture<EditPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPqrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
