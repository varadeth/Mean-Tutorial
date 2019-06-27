import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MattableExampleComponent } from './mattable-example.component';

describe('MattableExampleComponent', () => {
  let component: MattableExampleComponent;
  let fixture: ComponentFixture<MattableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MattableExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MattableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
