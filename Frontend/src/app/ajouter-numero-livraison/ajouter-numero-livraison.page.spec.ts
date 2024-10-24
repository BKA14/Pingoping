import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterNumeroLivraisonPage } from './ajouter-numero-livraison.page';

describe('AjouterNumeroLivraisonPage', () => {
  let component: AjouterNumeroLivraisonPage;
  let fixture: ComponentFixture<AjouterNumeroLivraisonPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterNumeroLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterNumeroLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
