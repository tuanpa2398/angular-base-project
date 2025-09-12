import { provideRouter } from "@angular/router";
import { routes } from "../app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig } from "@angular/core";

const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        // Thêm interceptor toàn cục ở đây
      ])
    ),
    provideAnimations()
  ]
}

export default APP_CONFIG;