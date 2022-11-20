import { Injectable } from '@angular/core';
import { TrainInfo } from '../models/train-data.model';

@Injectable({
  providedIn: 'root',
})
export class TrainInfoService {
  trains: TrainInfo[] = [];

  constructor() {}

  getAllTrains() {
    return this.trains;
  }
  getTrain(index: number) {
    return this.trains[index];
  }
  updateTrain(index: number, train: TrainInfo) {
    this.trains[index] = train;
  }
  addTrainInfo(train: TrainInfo) {
    this.trains.push(train);
  }
}
