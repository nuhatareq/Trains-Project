import { Injectable } from '@angular/core';
import { TrainComposition } from './../models/train-composition.model';
import { FormControl } from '@angular/forms';
import { Coach } from './../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { map, lastValueFrom, Subject } from 'rxjs';
import { CoachService } from './coach.service';

@Injectable({
  providedIn: 'root',
})
export class TrainCompositionService {
  private trainscopmpositions: TrainComposition[] = [];
  coachesOfSelectedTrainCompoisition = new Subject<number[]>();
  coachTrainId = new Subject<number[]>();
  constructor(private http: HttpClient, private coachService: CoachService) {}
  getAllTrainsCompositions() {
    return this.trainscopmpositions.slice();
  }

  async getCoachOnTrain(selectedTrainID: number) {
    await lastValueFrom(
      this.coachService.getCoachedOnTrain(selectedTrainID)
    ).then((data: any) => {
      this.coachesOfSelectedTrainCompoisition.next(
        data.map((item) => {
          return item.coach_compoisition;
        })
      );
    });
    await lastValueFrom(
      this.coachService.getCoachedOnTrain(selectedTrainID)
    ).then((data: any) => {
      this.coachTrainId.next(
        data.map((item) => {
          return item.id;
        })
      );
    });
  }
  async addTrainComposition(newtrainCopmposition: TrainComposition) {
    let trainCompositionId = 0;
    // this.trainscopmpositions.push(newtrainCopmposition);
    await lastValueFrom(
      this.http.post('http://10.1.23.63:9999/train/train_composition/', {
        coach_count: newtrainCopmposition.coachCount,
      })
    ).then((data: any) => {
      trainCompositionId = data.id;
    });
    for (let i of newtrainCopmposition.coachesTypes) {
      this.http
        .post('http://10.1.23.63:9999/train/train_coach/', {
          train_composition: trainCompositionId,
          coach_compoisition: i.coachCompositionId,
        })
        .subscribe();
    }
  }
  // updateTrainComposition(
  //   index: number,
  //   trainCompositionId: number,
  //   trainCopmpositionCoachCount: number,
  //   trainCompositionCoaches: Coach[]
  // ) {
  //   this.trainscopmpositions[index].trainCompositionId = trainCompositionId;
  //   this.trainscopmpositions[index].coachCount = trainCopmpositionCoachCount;
  //   this.trainscopmpositions[index].coachesTypes = trainCompositionCoaches;
  // }
  deleteTrainComposition(index: number) {
    this.trainscopmpositions.splice(index, 1);
  }
  findtrainType(TrainCompositionId: FormControl, coachcount: FormControl) {
    let founded = this.trainscopmpositions.find((train: TrainComposition) => {
      return TrainCompositionId.value === train.trainCompositionId;
    });
    return founded;
  }
  // getlength() {
  //   return this.trainscopmpositions.length;
  // }

  getTrainCompositionID_and_CoachCount(coaches: Coach[]) {
    return this.http
      .get('http://10.1.23.63:9999/train/train_composition/')
      .pipe(
        map((responseData) => {
          this.trainscopmpositions = [];
          for (let index in responseData) {
            this.trainscopmpositions.push(
              new TrainComposition(
                responseData[index].id,
                responseData[index].coach_count,
                coaches
              )
            );
          }
          return this.trainscopmpositions;
        })
      );
  }
  deleteDataFromServer(id: number) {
    this.http
      .delete('http://10.1.23.63:9999/train/train_composition/', {
        body: { id: id },
      })
      .subscribe();
  }
  async updateDataFormServer(
    trainCompositionID: number,
    coachCount: number,
    coaches: any,
    selectedtrainsIDS: number[],
    oldCoachCount: number
  ) {
    if (coachCount === oldCoachCount) {
      for (let index = 0; index < coaches.length; index++) {
        this.http
          .put('http://10.1.23.63:9999/train/train_coach/', {
            train_composition: trainCompositionID,
            coach_compoisition: +coaches[index],
            id: selectedtrainsIDS[index],
          })
          .subscribe((data) => {
            console.log(data);
          });
      }
    } else {
      await this.http
        .put('http://10.1.23.63:9999/train/train_composition/', {
          id: trainCompositionID,
          coach_count: coachCount,
        })
        .subscribe((data) => {
          console.log(data);
        });
      for (let index of selectedtrainsIDS) {
        this.http
          .delete(`http://10.1.23.63:9999/train/train_coach/`, {
            body: {
              id: index,
            },
          })
          .subscribe();
      }
      for (let coachId of coaches) {
        this.http
          .post('http://10.1.23.63:9999/train/train_coach/', {
            train_composition: trainCompositionID,
            coach_compoisition: +coachId,
          })
          .subscribe();
      }
    }
  }
}
