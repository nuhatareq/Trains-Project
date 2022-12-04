import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  coaches: Coach[] = [];
  seatsCounts: number;
  constructor(private http: HttpClient) {}
  getAllCoaches() {
    return this.coaches.slice();
  }
  // updateCoach(index: number, newCoach: Coach, seats: number) {
  //   this.coaches[index] = newCoach;
  //   this.calculateSeats(newCoach);
  //   this.coaches[index].seatsCounts = this.seatsCounts;
  // }
  // addCoach(newCoach: Coach) {
  //   this.coaches.push(newCoach);
  // }
  deleteCoach(index: number) {
    this.coaches.splice(index, 1);
  }
  calculateSeats(newCoach: Coach) {
    if (+newCoach.rowNumber === 1) {
      this.seatsCounts =
        (newCoach.rowNumber - 2) * newCoach.columnsNumber +
        +newCoach.firstRowSeatCount;
    } else {
      this.seatsCounts =
        (newCoach.rowNumber - 2) * newCoach.columnsNumber +
        +newCoach.firstRowSeatCount +
        +newCoach.lastRowSeatCount;
    }
    return this.seatsCounts;
  }
  // getLength() {
  //   return this.coaches.length;
  // }
  findById(id: number) {
    return this.coaches.find((item) => {
      return item.coachCompositionId == id;
    });
  }
  getDataFromServer() {
    return this.http
      .get('http://10.1.23.63:9999/train/coach_composition/')
      .pipe(
        map((responseData) => {
          this.coaches = [];
          for (let index in responseData) {
            this.coaches.push(
              new Coach(
                responseData[index].id,
                responseData[index].seat_count,
                responseData[index].row_number,
                responseData[index].column_number,
                responseData[index].first_row_seat_counts,
                responseData[index].last_row_seat_counts
              )
            );
          }
          return this.coaches;
        })
      );
  }
  getCoachedOnTrain(trainID: number) {
    return this.http.get(
      `http://10.1.23.63:9999/train/train_coach/?field_name=train_composition&field_value=${trainID}`
    );
  }

  setDataFromServer(seats: number, coach: Coach) {
    this.http
      .post('http://10.1.23.63:9999/train/coach_composition/', {
        seat_count: seats,
        row_number: coach.rowNumber,
        column_number: coach.columnsNumber,
        first_row_seat_counts: coach.firstRowSeatCount,
        last_row_seat_counts: coach.lastRowSeatCount,
      })
      .subscribe();
  }
  updateDataInServer(seats: number, coach: Coach) {
    this.http
      .put('http://10.1.23.63:9999/train/coach_composition/', {
        id: coach.coachCompositionId,
        seat_count: seats,
        row_number: coach.rowNumber,
        column_number: coach.columnsNumber,
        first_row_seat_counts: coach.firstRowSeatCount,
        last_row_seat_counts: coach.lastRowSeatCount,
      })
      .subscribe();
  }
  deleteDataFromServer(id: number) {
    this.http
      .delete('http://10.1.23.63:9999/train/coach_composition/', {
        body: { id: id },
      })
      .subscribe();
  }
}
