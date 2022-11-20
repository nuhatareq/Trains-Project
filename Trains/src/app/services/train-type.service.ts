import { Injectable } from '@angular/core';
import { TrainType } from '../models/train-data.model';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TrainTypeService {
  private trainsTypes: TrainType[] = [];
  constructor() {}
  getAlltrainsTypes() {
    return this.trainsTypes.slice();
  }
  addTrainType(newTrainType) {
    this.trainsTypes.push(newTrainType);
  }
  deleteTrainType(index: number) {
    this.trainsTypes.splice(index, 1);
  }
  findtrainType(traintypename: FormControl, traintypeid: FormControl) {
    let founded = this.trainsTypes.find((train: TrainType) => {
      return (
        traintypename.value === train.trainTypeName ||
        traintypeid.value === train.trainTypeId
      );
    });
    return founded;
  }
  getTrainType(trainTypeId: number): string {
    return this.trainsTypes.find((train: TrainType) => {
      return train.trainTypeId === trainTypeId;
    }).trainTypeName;
  }

  getlength() {
    return this.trainsTypes.length;
  }
  updateTrainType(index: number, traintype: TrainType) {
    this.trainsTypes[index] = traintype;
  }
}
