import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TrainComposition } from '../models/train-composition.model';
import { TrainCompositionService } from './../services/train-composition.service';
import { ToasterService } from './../services/toastr.service';
import { CoachService } from './../services/coach.service';
import { Coach } from '../models/coach.model';
import { ObjectSelect } from '../sharedComponents/object-select-shared.model';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-train-composition',
  templateUrl: './train-composition.component.html',
  styleUrls: ['./train-composition.component.css'],
})
export class TrainCompositionComponent implements OnInit {
  trainCompositionForm: FormGroup;
  trainsComposition: TrainComposition[] = [];
  tableHeaders: string[] = ['Train Composition ID', 'Coach Count'];
  tableKeys: string[] = ['trainCompositionId', 'coachCount'];
  updateMood: boolean = false;
  updateTrainId: number;
  updatedTrainComposition: TrainComposition;
  oldCoachCount: number;
  coaches: Coach[] = [];
  selectedTrainCoaches: any[] = [];
  selcetedTRainCoachesIDS: number[] = [];
  trainSelectObject: ObjectSelect[] = [];
  seatCountChaangingOrNot: number;
  seatCountChaanging: number;
  constructor(
    private trainCompositionSRV: TrainCompositionService,
    private touster: ToasterService,
    private coachsrv: CoachService
  ) {}

  async ngOnInit() {
    this.formInit();
    this.trainCompositionSRV.coachesOfSelectedTrainCompoisition.subscribe(
      (data: any) => {
        this.selectedTrainCoaches = data;
      }
    );
    this.trainCompositionSRV.coachTrainId.subscribe((data: any) => {
      this.selcetedTRainCoachesIDS = data;
    });
    this.coaches = await lastValueFrom(this.coachsrv.getDataFromServer());
    this.trainsComposition = await lastValueFrom(
      this.trainCompositionSRV.getTrainCompositionID_and_CoachCount(
        this.coaches
      )
    );

    this.trainCompositionForm
      .get('couchCount')
      .valueChanges.subscribe((counts: number) => {
        this.coachesCopmosition.clear();
        this.seatCountChaanging = counts;
        for (let i = 0; i < counts; i++) {
          this.coachesCopmosition.push(
            new FormControl(null, [Validators.required])
          );
        }
      });
    this.trainSelectObject = this.coaches.map((coach: Coach) => {
      return new ObjectSelect(
        coach.coachCompositionId.toString(),
        coach.coachCompositionId.toString()
      );
    });
  }
  onSubmit() {
    if (this.trainCompositionForm.valid) {
      if (this.updateMood) {
        this.OnUpdateMood();
      } else {
        let founded = this.trainCompositionSRV.findtrainType(
          this.trainCompositionId,
          this.coachCount
        );
        if (founded) {
          this.touster.showFailure('this train composition already exist');
        } else {
          this.OnAddMood();
        }
      }
      this.updateMood = false;
      this.trainCompositionForm.reset();
    }
  }

  formInit() {
    this.trainCompositionForm = new FormGroup({
      trainCopmpsitionID: new FormControl(null),
      couchCount: new FormControl(null, [Validators.required]),
      coachesCopmosition: new FormArray([]),
    });
  }
  get trainCompositionId() {
    return this.trainCompositionForm.controls[
      'trainCopmpsitionID'
    ] as FormControl;
  }
  get coachCount() {
    return this.trainCompositionForm.controls['couchCount'] as FormControl;
  }
  get coachesCopmosition() {
    return this.trainCompositionForm.controls[
      'coachesCopmosition'
    ] as FormArray;
  }
  async updateTrainComposition(index: number) {
    this.updateTrainId = index;
    this.updatedTrainComposition = this.trainsComposition[index];
    await this.trainCompositionSRV.getCoachOnTrain(
      this.updatedTrainComposition.trainCompositionId
    );
    this.seatCountChaangingOrNot = this.trainsComposition[index].coachCount;
    this.trainCompositionForm.patchValue({
      // trainCopmpsitionID: this.trainsComposition[index].trainCompositionId,
      couchCount: this.trainsComposition[index].coachCount,
    });
    this.oldCoachCount = this.trainsComposition[index].coachCount;
    this.coachesCopmosition.clear();
    for (let id of this.selectedTrainCoaches) {
      this.coachesCopmosition.push(new FormControl(id, [Validators.required]));
    }

    this.updateMood = true;
  }
  deleteTrainComposition(index: number) {
    if (confirm('Are You Sure !!')) {
      this.trainCompositionSRV.deleteDataFromServer(
        this.trainsComposition[index].trainCompositionId
      );
      this.trainCompositionSRV.deleteTrainComposition(index);
      this.trainsComposition =
        this.trainCompositionSRV.getAllTrainsCompositions();
    }
    this.touster.showSuccess('deleted Successfully!');
  }

  getLabelName(index: number): string {
    return `Coach Composition ID ${index + 1}`;
  }
  cancelUpdate() {
    this.updateMood = false;
    this.trainCompositionForm.reset();
  }
  OnUpdateMood() {
    this.trainCompositionSRV.updateDataFormServer(
      this.updatedTrainComposition.trainCompositionId,
      this.coachCount.value,
      this.coachesCopmosition.value,
      this.selcetedTRainCoachesIDS,
      this.oldCoachCount
    );
    // this.trainsComposition = await lastValueFrom(
    this.trainCompositionSRV.getTrainCompositionID_and_CoachCount(this.coaches);
    // );
    // this.trainsComposition =
    //   this.trainCompositionSRV.getAllTrainsCompositions();
    this.touster.showSuccess('updated Successfully!');
  }
  async OnAddMood() {
    let addedTrain = new TrainComposition(
      this.trainCompositionId.value,
      this.coachCount.value,
      []
    );
    for (let control of this.coachesCopmosition.controls) {
      addedTrain.coachesTypes.push(this.coachsrv.findById(control.value));
    }
    this.trainCompositionSRV.addTrainComposition(addedTrain);
    this.trainsComposition = await lastValueFrom(
      this.trainCompositionSRV.getTrainCompositionID_and_CoachCount(
        this.coaches
      )
    );
    // this.trainsComposition =
    //   this.trainCompositionSRV.getAllTrainsCompositions();
    this.touster.showSuccess('added successfully');
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.updateMood) {
      return confirm(
        'do you really want to leave this page before updating your data ?'
      );
    } else {
      return true;
    }
  }
}
