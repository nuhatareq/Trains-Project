import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Validatorsboo } from '../shared/custom-validator';
import { TrainInfo, TrainType } from '../models/train-data.model';
import { ToasterService } from '../services/toastr.service';
import { TrainTypeService } from '../services/train-type.service';
import { TrainInfoService } from '../services/train.service';
import { ObjectSelect } from './../sharedComponents/object-select-shared.model';
import { TrainComposition } from '../models/train-composition.model';
import { TrainCompositionService } from './../services/train-composition.service';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.css'],
})
export class TrainInfoComponent implements OnInit {
  trainInfo: FormGroup;
  trains: TrainInfo[] = [];
  trainTypes: TrainType[] = [];
  trainsComposition: TrainComposition[] = [];
  updatemood = false;
  updatedtrainIndex: number;
  tableHeaders: string[] = [
    'Train Number',
    'Train Type',
    'Composition Number',
    'Start Date',
    'End Date',
    'Option',
  ];
  trainkeys: string[] = [
    'trainNumber',
    'trainType',
    'compositionNumber',
    'startDate',
    'endDate',
  ];

  trainSelectObject: ObjectSelect[] = [];
  trainCompositionSelectObject: ObjectSelect[] = [];
  // constructor to inject sercvices
  constructor(
    private toastr: ToasterService,
    private trainTypesSRV: TrainTypeService,
    private traininfosrv: TrainInfoService,
    private TrainCompositionsrv: TrainCompositionService
  ) {}
  ngOnInit() {
    this.initForm();
    this.trains = this.traininfosrv.getAllTrains();
    this.trainTypes = this.trainTypesSRV.getAlltrainsTypes();
    this.trainsComposition =
      this.TrainCompositionsrv.getAllTrainsCompositions();

    console.log(this.trainsComposition);
    this.trainSelectObject = this.trainTypes.map((item) => {
      return new ObjectSelect(item.trainTypeName, item.trainTypeId);
    });
    this.trainCompositionSelectObject = this.trainsComposition.map(
      (train: TrainComposition) => {
        return new ObjectSelect(
          train.trainCompositionId,
          train.trainCompositionId
        );
      }
    );
    console.log(this.trainCompositionSelectObject);
  }

  // form submmition
  onSubmite() {
    const control = this.trainStartDate;
    const control2 = this.trainEndDate;
    if (this.updatemood) {
      this.traininfosrv.updateTrain(
        this.updatedtrainIndex,
        this.trainInfo.value
      );
      this.toastr.showSuccess('Update Succeefully');
    } else {
      let founded_train = this.trains.find((train) => {
        return (
          train.startDate === control.value || train.endDate === control2.value
        );
      });
      if (founded_train) {
        this.toastr.showFailure('you entered date not available');
      } else {
        this.traininfosrv.addTrainInfo(this.trainInfo.value);
        this.toastr.showSuccess('you success  adding a new train iformation');
      }
    }
    this.trains = this.traininfosrv.getAllTrains();
    this.updatemood = false;
    this.trainInfo.reset();
  }

  // getter for from controls of train form
  get trainNumber() {
    return this.trainInfo.controls['trainNumber'] as FormControl;
  }
  get trainStartDate() {
    return this.trainInfo.controls['startDate'] as FormControl;
  }
  get trainEndDate() {
    return this.trainInfo.controls['endDate'] as FormControl;
  }

  updateTrainData(index: number) {
    this.updatedtrainIndex = index;
    this.trainInfo.patchValue({
      trainNumber: this.trains[index].trainNumber,
      trainType: this.trains[index].trainType,
      compositionNumber: this.trains[index].compositionNumber,
      startDate: this.trains[index].startDate,
      endDate: this.trains[index].endDate,
    });
    this.updatemood = true;
  }

  cancelUpdate() {
    this.updatemood = false;
    this.trainInfo.reset();
  }
  deleteTrain(index: number) {
    if (confirm('are you sure that you want to delete this data ?')) {
      this.trains.splice(index, 1);
      this.toastr.showSuccess('you succeeded to delete this train');
    }
  }

  initForm() {
    this.trainInfo = new FormGroup({
      trainNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      trainType: new FormControl(null, [Validators.required]),
      compositionNumber: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [
        Validators.required,
        Validatorsboo.checkDateGreaterThanToday,
      ]),
      endDate: new FormControl(null, [
        Validators.required,
        Validatorsboo.checkDateGreaterThanToday,
      ]),
    });
  }
}
