import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule, // Necesario para las animaciones de ngx-toastr
      ToastrModule.forRoot({
        timeOut: 3000, // Duración de la notificación
        positionClass: 'toast-top-right', // Ubicación en la pantalla
        preventDuplicates: true, // Evita mostrar duplicados
      })
    ),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
