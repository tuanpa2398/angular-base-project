import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '@env/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let apiReq = req;

  const accessToken = authService.getAccessToken();

  // nếu url không bắt đầu bằng http thì thêm prefix api
  if (!req.url.startsWith('http')) {
    apiReq = apiReq.clone({ url: `${environment.apiUrl}${req.url}` });
  }

  if (accessToken) {
    apiReq = apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req);
};
