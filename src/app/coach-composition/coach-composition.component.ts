import { Component, OnInit } from '@angular/core';
import { Coach } from '../models/coach.model';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { CoachService } from '../services/coach.service';
import { ToasterService } from '../services/toastr.service';
import { lastValueFrom, Observable } from 'rxjs';
@Component({
  selector: 'app-coach-composition',
  templateUrl: './coach-composition.component.html',
  styleUrls: ['./coach-composition.component.css'],
})
export class CoachCompositionComponent implements OnInit {
  coaches: Coach[] = [];
  updatedCoach: Coach;
  coachCompositionForm: FormGroup;
  seatsCounts: number = 0;
  rowsNumbers: number;
  updatemood = false;
  updatedCoachIndex: number;
  tableHeaders: string[] = [
    'Coach Composition ID',
    'Seats Counts',
    'Row Number',
    'Column Number',
    'First Row Seat Number',
    'Last Row Seat Number',
    'Options',
  ];
  tableKeys: string[] = [
    'coachCompositionId',
    'seatsCounts',
    'rowNumber',
    'columnsNumber',
    'firstRowSeatCount',
    'lastRowSeatCount',
  ];
  constructor(
    private coachSrv: CoachService,
    private toaster: ToasterService
  ) {}
  async ngOnInit() {
    this.formInit();
    this.coaches = await lastValueFrom(this.coachSrv.getDataFromServer());
    // this.coaches = this.coachSrv.getAllCoaches();
    this.coachCompositionForm
      .get('rowNumber')
      .valueChanges.subscribe((rowNumbers: number) => {
        if (rowNumbers == 1) {
          this.disableLastRowSeatCount();
        } else {
          this.enableLastRowSeatCount();
        }
      });
  }

  async onSubmit() {
    if (this.coachCompositionForm.valid) {
      if (this.updatemood) {
        // this.coachSrv.updateCoach(
        //   this.updatedCoachIndex,
        //   this.coachCompositionForm.value,
        //   this.seatsCounts
        // );
        let seats = this.coachSrv.calculateSeats(
          this.coachCompositionForm.value
        );
        this.updatedCoach.rowNumber = this.rowNumbers.value;
        this.updatedCoach.columnsNumber = this.colNumbers.value;
        this.updatedCoach.firstRowSeatCount = this.firstrow.value;
        this.updatedCoach.lastRowSeatCount = this.lastrow.value;
        this.coachSrv.updateDataInServer(seats, this.updatedCoach);
      } else {
        let seats = this.coachSrv.calculateSeats(
          this.coachCompositionForm.value
        );
        // this.coachSrv.addCoach(
        // new Coach(
        //   seats,
        //   +this.rowNumbers.value,
        //   +this.colNumbers.value,
        //   +this.firstrow.value,
        //   +this.lastrow.value,
        //   +this.coachCompositionId.value
        // )
        // );
        this.coachSrv.setDataFromServer(seats, this.coachCompositionForm.value);
        this.coaches = await lastValueFrom(this.coachSrv.getDataFromServer());
      }
      // this.coaches = this.coachSrv.getAllCoaches();

      this.updatemood = false;
      this.coachCompositionForm.reset();
    }
  }
  get lastRowSeatCount() {
    return this.coachCompositionForm.controls[
      'lastRowSeatCount'
    ] as FormControl;
  }

  enableLastRowSeatCount() {
    this.lastRowSeatCount.enable();
  }

  disableLastRowSeatCount() {
    this.lastRowSeatCount.disable();
  }
  // get coachCompositionId() {
  //   return this.coachCompositionForm.controls[
  //     'coachCompositionId'
  //   ] as FormControl;
  // }
  get rowNumbers() {
    return this.coachCompositionForm.controls['rowNumber'] as FormControl;
  }
  get colNumbers() {
    return this.coachCompositionForm.controls['columnsNumber'] as FormControl;
  }
  get firstrow() {
    return this.coachCompositionForm.controls[
      'firstRowSeatCount'
    ] as FormControl;
  }
  get lastrow() {
    return this.coachCompositionForm.controls[
      'lastRowSeatCount'
    ] as FormControl;
  }
  formInit() {
    this.coachCompositionForm = new FormGroup({
      rowNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      columnsNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      firstRowSeatCount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      lastRowSeatCount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      // coachCompositionId: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern('^[1-9]+[0-9]*$'),
      // ]),
    });
  }
  updateCoachData(index: number) {
    this.updatemood = true;
    this.updatedCoachIndex = index;
    this.updatedCoach = this.coaches[index];
    this.coachCompositionForm.patchValue({
      rowNumber: this.coaches[index].rowNumber,
      columnsNumber: this.coaches[index].columnsNumber,
      firstRowSeatCount: this.coaches[index].firstRowSeatCount,
      lastRowSeatCount: this.coaches[index].lastRowSeatCount,
      // coachCompositionId: this.coaches[index].coachCompositionId,
    });
    this.coaches = this.coachSrv.getAllCoaches();
  }
  deleteCoach(index: number) {
    if (confirm('Are you sure for deleting this Coach ?')) {
      this.coachSrv.deleteCoach(index);
      this.coachSrv.deleteDataFromServer(
        this.coaches[index].coachCompositionId
      );
      this.toaster.showSuccess('you successfully deleted this coach');
      this.coaches = this.coachSrv.getAllCoaches();
    }
  }
  cancelUpdate() {
    this.updatemood = false;
    this.coachCompositionForm.reset();
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.updatemood) {
      return confirm(
        'do you really want to leave this page before updating your data ?'
      );
    } else {
      return true;
    }
  }
}
