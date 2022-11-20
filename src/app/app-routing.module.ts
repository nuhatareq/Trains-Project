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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainType', component: TrainTypeComponent },
  {
    path: 'trainInfo',
    component: TrainInfoComponent,
    canActivate: [AuthGuardService, AuthTrainCompositionService],
  },
  { path: 'coachComposition', component: CoachCompositionComponent },
  {
    path: 'trainComopsition',
    component: TrainCompositionComponent,
    canActivate: [AuthCoachCompositionService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
