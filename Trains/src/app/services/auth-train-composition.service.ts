import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToasterService } from './toastr.service';
import { TrainCompositionService } from './train-composition.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTrainCompositionService implements CanActivate {
  constructor(
    private trainCompositionsrv: TrainCompositionService,
    private touster: ToasterService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.trainCompositionsrv.getlength() <= 0) {
      this.touster.showFailure('Please Enter Train composition First');
      return false;
    }
  }
}
