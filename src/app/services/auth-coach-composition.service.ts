import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CoachService } from './coach.service';
import { ToasterService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCoachCompositionService implements CanActivate {
  constructor(
    private coachsrv: CoachService,
    private touster: ToasterService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.coachsrv.getLength() <= 0) {
      this.touster.showFailure('Please Enter Coach composition First');
      return false;
    }
  }
}
