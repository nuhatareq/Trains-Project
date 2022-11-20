import { Injectable } from '@angular/core';
import { TrainComposition } from './../models/train-composition.model';
import { FormControl } from '@angular/forms';
import { Coach } from './../models/coach.model';

@Injectable({
  providedIn: 'root',
})
export class TrainCompositionService {
  private trainscopmpositions: TrainComposition[] = [];
  constructor() {}
  getAllTrainsCompositions() {
    return this.trainscopmpositions.slice();
  }
  addTrainComposition(newtrainCopmposition: TrainComposition) {
    this.trainscopmpositions.push(newtrainCopmposition);
  }
  updateTrainComposition(
    index: number,
    trainCompositionId: number,
    trainCopmpositionCoachCount: number,
    trainCompositionCoaches: Coach[]
  ) {
    this.trainscopmpositions[index].trainCompositionId = trainCompositionId;
    this.trainscopmpositions[index].coachCount = trainCopmpositionCoachCount;
    this.trainscopmpositions[index].coachesTypes = trainCompositionCoaches;
  }
  deleteTrainComposition(index: number) {
    this.trainscopmpositions.splice(index, 1);
  }
  findtrainType(TrainCompositionId: FormControl, coachcount: FormControl) {
    let founded = this.trainscopmpositions.find((train: TrainComposition) => {
      return TrainCompositionId.value === train.trainCompositionId;
    });
    return founded;
  }
  getlength() {
    return this.trainscopmpositions.length;
  }
}
