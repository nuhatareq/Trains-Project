import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { TrainTypeService } from './train-type.service';
import { ToasterService } from './toastr.service';
import { HttpClient } from '@angular/common/http';
import { TrainType } from '../models/train-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  trainsTypes: TrainType[] = [];
  constructor(
    private trainTypesrv: TrainTypeService,
    private touster: ToasterService
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.trainsTypes = await lastValueFrom(
      this.trainTypesrv.getDataFromServer()
    );
    if (this.trainsTypes.length <= 0) {
      this.touster.showFailure('Please Enter Train Type First');
      return false;
    }
  }
}
