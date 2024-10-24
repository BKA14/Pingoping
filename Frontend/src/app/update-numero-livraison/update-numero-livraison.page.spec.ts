import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateNumeroLivraisonPage } from './update-numero-livraison.page';

describe('UpdateNumeroLivraisonPage', () => {
  let component: UpdateNumeroLivraisonPage;
  let fixture: ComponentFixture<UpdateNumeroLivraisonPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNumeroLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNumeroLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
