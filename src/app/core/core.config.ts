import { provideRouter } from "@angular/router";
import { routes } from "../app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig } from "@angular/core";
import { requestInterceptor } from "./interceptors/request.interceptor";
import { responseInterceptor } from "./interceptors/response.interceptor";


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { MessageService } from 'primeng/api';

const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        // Thêm interceptor toàn cục ở đây
        requestInterceptor,
        responseInterceptor
      ])
    ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService
  ]
}

export default APP_CONFIG;