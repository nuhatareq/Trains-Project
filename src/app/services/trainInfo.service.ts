import { Injectable } from '@angular/core';
import { TrainInfo } from '../models/train-data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainInfoService {
  trains: TrainInfo[] = [];

  constructor(private http: HttpClient) {}

  getAllTrains() {
    return this.trains.slice();
  }
  getTrain(index: number) {
    return this.trains[index];
  }
  // updateTrain(index: number, train: TrainInfo) {
  //   this.trains[index] = train;
  // }
  // addTrainInfo(train: TrainInfo) {
  //   this.trains.push(train);
  // }
  getDataFromServer(): Observable<TrainInfo[]> {
    return this.http.get('http://10.1.23.63:9999/train/train/').pipe(
      map((responseData) => {
        this.trains = [];
        for (let train in responseData) {
          this.trains.push(
            new TrainInfo(
              responseData[train].id,
              responseData[train].trainType,
              responseData[train].composition_number,
              responseData[train].start_date,
              responseData[train].end_date
            )
          );
        }
        return this.trains;
      })
    );
  }
  setDataToServer(trainInfo: TrainInfo) {
    this.http
      .post('http://10.1.23.63:9999/train/train/', {
        composition_number: trainInfo.compositionNumber,
        trainType: trainInfo.trainType,
        start_date: trainInfo.startDate,
        end_date: trainInfo.endDate,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  updateDataToServer(trainInfo: TrainInfo) {
    this.http
      .put('http://10.1.23.63:9999/train/train/', {
        id: trainInfo.trainNumber,
        trainType: trainInfo.trainType,
        composition_number: trainInfo.compositionNumber,
        start_date: trainInfo.startDate,
        end_date: trainInfo.endDate,
      })
      .subscribe();
  }
  deleteDataFromServer(index: number) {
    this.http
      .delete('http://10.1.23.63:9999/train/train/', {
        body: {
          id: index,
        },
      })
      .subscribe();
  }
}
