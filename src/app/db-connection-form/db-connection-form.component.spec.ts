import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbConnectionFormComponent } from './db-connection-form.component';

describe('DbConnectionFormComponent', () => {
  let component: DbConnectionFormComponent;
  let fixture: ComponentFixture<DbConnectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbConnectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
