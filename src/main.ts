import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideServiceWorker } from '@angular/service-worker';

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
    ...appConfig.providers, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
}).catch((err) => console.error(err));
