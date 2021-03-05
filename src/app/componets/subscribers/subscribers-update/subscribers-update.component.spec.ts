import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersUpdateComponent } from './subscribers-update.component';

describe('SubscribersUpdateComponent', () => {
  let component: SubscribersUpdateComponent;
  let fixture: ComponentFixture<SubscribersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
