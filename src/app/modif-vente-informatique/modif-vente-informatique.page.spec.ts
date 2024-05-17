import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifVenteInformatiquePage } from './modif-vente-informatique.page';

describe('ModifVenteInformatiquePage', () => {
  let component: ModifVenteInformatiquePage;
  let fixture: ComponentFixture<ModifVenteInformatiquePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifVenteInformatiquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifVenteInformatiquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
