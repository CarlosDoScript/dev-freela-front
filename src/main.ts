import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import  localePt  from '@angular/common/locales/pt';
import { provideNgxMask } from 'ngx-mask'

registerLocaleData(localePt,'pt-BR');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    provideNgxMask()                
  ]
})
.catch((err) => console.error(err));
