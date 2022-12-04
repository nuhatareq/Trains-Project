import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { CoachService } from './coach.service';
import { ToasterService } from './toastr.service';
import { Coach } from './../models/coach.model';

@Injectable({
  providedIn: 'root',
})
export class AuthCoachCompositionService implements CanActivate {
  coaches: Coach[] = [];
  constructor(
    private coachsrv: CoachService,
    private touster: ToasterService
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.coaches = await lastValueFrom(this.coachsrv.getDataFromServer());
    if (this.coaches.length <= 0) {
      this.touster.showFailure('Please Enter Coach composition First');
      return false;
    }
  }
}
