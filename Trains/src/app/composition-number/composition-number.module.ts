import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachCompositionComponent } from './../coach-composition/coach-composition.component';
import { TrainCompositionComponent } from '../train-composition/train-composition.component';
import { FormInputComponent } from './../sharedComponents/form-input/form-input.component';
import { TableSharedComponent } from './../sharedComponents/table-shared/table-shared.component';
import { SelectSharedComponent } from '../sharedComponents/select-shared/select-shared.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoachCompositionComponent,
    TrainCompositionComponent,
    FormInputComponent,
    TableSharedComponent,
    SelectSharedComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],

  exports: [
    CoachCompositionComponent,
    TrainCompositionComponent,
    FormInputComponent,
    TableSharedComponent,
    SelectSharedComponent,
  ],
})
export class CompositionNumberModule {}
