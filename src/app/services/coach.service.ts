import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  coaches: Coach[] = [];
  seatsCounts: number;
  constructor() {}
  getAllCoaches() {
    return this.coaches.slice();
  }
  updateCoach(index: number, newCoach: Coach, seats: number) {
    this.coaches[index] = newCoach;
    this.calculateSeats(newCoach);
    this.coaches[index].seatsCounts = this.seatsCounts;
  }
  addCoach(newCoach: Coach) {
    this.coaches.push(newCoach);
  }
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
  getLength() {
    return this.coaches.length;
  }
  findById(id: number) {
    return this.coaches.find((item) => {
      return item.coachCompositionId == id;
    });
  }
}
