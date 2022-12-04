import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { ToasterService } from './toastr.service';
import { TrainCompositionService } from './train-composition.service';
import { TrainComposition } from './../models/train-composition.model';
import { Coach } from './../models/coach.model';
import { CoachService } from './coach.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTrainCompositionService implements CanActivate {
  trainsComposition: TrainComposition[] = [];
  coaches: Coach[] = [];
  constructor(
    private trainCompositionsrv: TrainCompositionService,
    private touster: ToasterService,
    private coachsrv: CoachService
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.coaches = await lastValueFrom(this.coachsrv.getDataFromServer());

    this.trainsComposition = await lastValueFrom(
      this.trainCompositionsrv.getTrainCompositionID_and_CoachCount(
        this.coaches
      )
    );
    if (this.trainsComposition.length <= 0) {
      this.touster.showFailure('Please Enter Train composition First');
      return false;
    }
  }
}
