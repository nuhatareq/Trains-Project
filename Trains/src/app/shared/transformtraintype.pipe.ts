import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { TrainType } from '../models/train-data.model';
import { TrainTypeService } from '../services/train-type.service';
@Pipe({
  name: 'getTrainTypeName',
})
export class transformTrainNumberToTrainType implements PipeTransform {
  constructor(private traintypesrv: TrainTypeService) {}

  transform(value: any) {
    return this.traintypesrv.getTrainType(value);
  }
}
