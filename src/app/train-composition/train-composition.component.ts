import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TrainComposition } from '../models/train-composition.model';
import { TrainCompositionService } from './../services/train-composition.service';
import { ToasterService } from './../services/toastr.service';
import { CoachService } from './../services/coach.service';
import { Coach } from '../models/coach.model';
import { ObjectSelect } from '../sharedComponents/object-select-shared.model';

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
  coaches: Coach[] = [];
  trainSelectObject: ObjectSelect[] = [];
  constructor(
    private trainCompositionSRV: TrainCompositionService,
    private touster: ToasterService,
    private coachsrv: CoachService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.coaches = this.coachsrv.getAllCoaches();
    this.trainsComposition =
      this.trainCompositionSRV.getAllTrainsCompositions();

    this.trainCompositionForm
      .get('couchCount')
      .valueChanges.subscribe((counts: number) => {
        this.coachesCopmosition.clear();
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
          console.log(this.trainCompositionForm.value);
          this.OnAddMood();
        }
      }
      this.updateMood = false;
      this.trainCompositionForm.reset();
    }
  }

  formInit() {
    this.trainCompositionForm = new FormGroup({
      trainCopmpsitionID: new FormControl(null, [Validators.required]),
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
  updateTrainComposition(index: number) {
    this.updateTrainId = index;
    this.trainCompositionForm.patchValue({
      trainCopmpsitionID: this.trainsComposition[index].trainCompositionId,
      couchCount: this.trainsComposition[index].coachCount,
    });
    this.updateMood = true;
  }
  deleteTrainComposition(index: number) {
    if (confirm('Are You Sure !!')) {
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
    this.trainCompositionSRV.updateTrainComposition(
      this.updateTrainId,
      this.trainCompositionId.value,
      this.coachCount.value,
      this.coachesCopmosition.value
    );
    this.trainsComposition =
      this.trainCompositionSRV.getAllTrainsCompositions();
    this.touster.showSuccess('updated Successfully!');
  }
  OnAddMood() {
    let addedTrain = new TrainComposition(
      this.trainCompositionId.value,
      this.coachCount.value,
      []
    );
    for (let control of this.coachesCopmosition.controls) {
      addedTrain.coachesTypes.push(this.coachsrv.findById(control.value));
    }
    this.trainCompositionSRV.addTrainComposition(addedTrain);
    this.trainsComposition =
      this.trainCompositionSRV.getAllTrainsCompositions();
    this.touster.showSuccess('added successfully');
  }
}
