import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifDepotRetraitPage } from './modif-depot-retrait.page';

describe('ModifDepotRetraitPage', () => {
  let component: ModifDepotRetraitPage;
  let fixture: ComponentFixture<ModifDepotRetraitPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifDepotRetraitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifDepotRetraitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
