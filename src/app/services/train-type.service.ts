import { Injectable } from '@angular/core';
import { TrainType } from '../models/train-data.model';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainTypeService {
  private trainsTypes: TrainType[] = [];
  constructor(private http: HttpClient) {}

  getDataFromServer(): Observable<TrainType[]> {
    return this.http.get('http://10.1.23.63:9999/train/train_type/').pipe(
      map((responseData) => {
        this.trainsTypes = [];
        for (let index in responseData) {
          this.trainsTypes.push(
            new TrainType(
              responseData[index].train_type_name,
              responseData[index].id
            )
          );
        }
        return this.trainsTypes;
      })
    );
  }
  setDataToServer(trainData: string) {
    this.http
      .post(
        'http://10.1.23.63:9999/train/train_type/',
        new TrainType(trainData).onCreate()
      )
      .subscribe(() => {});
  }

  updateDataInServer(newTrainType: TrainType) {
    this.http
      .put(`http://10.1.23.63:9999/train/train_type/`, {
        id: newTrainType.trainTypeId,
        train_type_name: newTrainType.trainTypeName,
      })
      .subscribe(() => {});
  }
  deleteDataFromServer(id: number) {
    this.http
      .delete(`http://10.1.23.63:9999/train/train_type/`, { body: { id: id } })
      .subscribe(() => {});
  }
  getAlltrainsTypes() {
    return this.trainsTypes.slice();
  }
  // addTrainType(newTrainType) {
  //   this.trainsTypes.push(newTrainType);
  // }
  deleteTrainType(index: number) {
    this.trainsTypes.splice(index, 1);
  }
  findtrainType(traintypename: FormControl, traintypeid: FormControl) {
    let founded = this.trainsTypes.find((train: TrainType) => {
      return traintypename.value === train.trainTypeName;
    });
    return founded;
  }
  getTrainType(trainTypeId: number): string {
    return this.trainsTypes.find((train: TrainType) => {
      return train.trainTypeId === trainTypeId;
    }).trainTypeName;
  }
  // getlength() {
  //   return this.trainsTypes.length;
  // }
  // updateTrainType(index: number, traintype: string) {
  //   this.trainsTypes[index].trainTypeName = traintype;
  // }
}
