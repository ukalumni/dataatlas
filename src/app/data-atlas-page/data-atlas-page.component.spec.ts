import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAtlasPageComponent } from './data-atlas-page.component';

describe('DataAtlasPageComponent', () => {
  let component: DataAtlasPageComponent;
  let fixture: ComponentFixture<DataAtlasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAtlasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAtlasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
