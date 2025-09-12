import { CanActivateFn } from '@angular/router';

export const verifyPermissionGuard: CanActivateFn = (route, state) => {
  return true;
};
