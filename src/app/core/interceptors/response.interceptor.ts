import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { BAD_REQUEST_STATUS, FORBIDDEN_STATUS, NOT_FOUND_STATUS, SERVER_INTERNAL_ERROR_STATUS, SERVICE_UNAVAILABLE_STATUS, UNAUTHORIZED_STATUS } from '@app/shared/data.shared';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const TOKEN_INVALID = "TOKEN_INVALID";
  const TOKEN_EXPIRED = "TOKEN_EXPIRED";

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("error", error);

      switch (error.status) {
        case 0:
          // Lỗi kết nối, ERR_CONNECTION_REFUSED thường có status = 0
          router.navigate([`/server-not-response`])
          return EMPTY;

        case UNAUTHORIZED_STATUS:
          if (error.error?.error === TOKEN_EXPIRED) {
            console.log("TOKEN_EXPIRED");

            // Chặn vòng lặp nếu request refresh-token bị lỗi
            if (req.url.includes('/auth/refresh-token')) {
              authService.logout();
              router.navigate(['/login']);
              // toastService.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
              return EMPTY;
            }

            return authService.refreshToken().pipe(
              switchMap(res => {
                return next(req.clone({
                  setHeaders: { Authorization: `Bearer ${res.accessToken}` }
                }));
              }),
              catchError(() => {
                authService.logout();
                router.navigate(['/login']);
                // toastService.info(error.error.message || "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                return EMPTY;
              })
            );
          } else if (error.error?.error === TOKEN_INVALID) {
            authService.logout();
            router.navigate([`/unauthorize`]);
            // toastService.error(error.error.message || "Từ chối truy cập. Vui lòng đăng nhập lại.");
            return EMPTY;
          } else {
            // toastService.error(error.error.message || "Từ chối truy cập. Vui lòng đăng nhập lại.");
            return EMPTY;
          }
        case FORBIDDEN_STATUS:
          // toastService.error("Không có quyền truy cập.");
          router.navigate([`/forbidden`]);
          return EMPTY;

        case SERVICE_UNAVAILABLE_STATUS:
          // toastService.error("Server không hoạt động. Vui lòng thử lại sau.");
          router.navigate(['/error']);
          return EMPTY;

        case BAD_REQUEST_STATUS:
          // toastService.error("Dữ liệu không hợp lệ. Vui lòng thử lại.");
          return EMPTY;

        case SERVER_INTERNAL_ERROR_STATUS:
          // toastService.error(error.error.message || "Lỗi server. Vui lòng thử lại sau.");
          return EMPTY;

        case NOT_FOUND_STATUS:
          // toastService.error("Không tồn tại tài nguyên đang truy cập.");
          router.navigate(['/404']);
          return EMPTY;

        default:
          // toastService.error("Phát sinh lỗi không xác định. Vui lòng thử lại.");
          return EMPTY;
      }
    })
  );
};
