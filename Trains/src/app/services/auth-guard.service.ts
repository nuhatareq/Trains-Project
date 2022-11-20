import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TrainTypeService } from './train-type.service';
import { ToasterService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private trainTypesrv: TrainTypeService,
    private touster: ToasterService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.trainTypesrv.getlength() <= 0) {
      this.touster.showFailure('Please Enter Train Type First');
      return false;
    }
  }
}
