import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMetadataComponent } from './display-metadata.component';

describe('DisplayMetadataComponent', () => {
  let component: DisplayMetadataComponent;
  let fixture: ComponentFixture<DisplayMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
