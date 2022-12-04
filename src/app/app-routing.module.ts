import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrainTypeComponent } from './train-type/train-type.component';
import { TrainInfoComponent } from './train-info/train-info.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CoachCompositionComponent } from './coach-composition/coach-composition.component';
import { TrainCompositionComponent } from './train-composition/train-composition.component';
import { AuthTrainCompositionService } from './services/auth-train-composition.service';
import { AuthCoachCompositionService } from './services/auth-coach-composition.service';
import { AuthCandeactivaterouteService } from './services/auth-candeactivateroute.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'trainType',
    component: TrainTypeComponent,
    canDeactivate: [AuthCandeactivaterouteService],
  },
  {
    path: 'trainInfo',
    component: TrainInfoComponent,
    canActivate: [AuthGuardService, AuthTrainCompositionService],
    canDeactivate: [AuthCandeactivaterouteService],
  },
  {
    path: 'coachComposition',
    component: CoachCompositionComponent,
    canDeactivate: [AuthCandeactivaterouteService],
  },
  {
    path: 'trainComopsition',
    component: TrainCompositionComponent,
    canActivate: [AuthCoachCompositionService],
    canDeactivate: [AuthCandeactivaterouteService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
