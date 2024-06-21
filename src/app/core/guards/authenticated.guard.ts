import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuh: boolean = authService.isAuthenticated();

  if (!isAuh) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
