import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrListComponent } from './pqr-list.component';

describe('PqrListComponent', () => {
  let component: PqrListComponent;
  let fixture: ComponentFixture<PqrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
