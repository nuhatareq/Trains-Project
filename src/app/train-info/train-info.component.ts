import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';
import { Validatorsboo } from '../shared/custom-validator';
import { TrainInfo, TrainType } from '../models/train-data.model';
import { ToasterService } from '../services/toastr.service';
import { TrainTypeService } from '../services/train-type.service';
import { TrainInfoService } from '../services/trainInfo.service';
import { ObjectSelect } from './../sharedComponents/object-select-shared.model';
import { TrainComposition } from '../models/train-composition.model';
import { TrainCompositionService } from './../services/train-composition.service';
import { CanComponentDeactivate } from './../services/auth-candeactivateroute.service';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.css'],
})
export class TrainInfoComponent implements OnInit, CanComponentDeactivate {
  trainInfo: FormGroup;
  trains: TrainInfo[] = [];
  trainTypes: TrainType[] = [];
  trainsComposition: TrainComposition[] = [];
  updatemood = false;
  updatedtrainIndex: number;
  updatedTrainInfo: TrainInfo;
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
  async ngOnInit() {
    this.initForm();
    this.trainTypes = this.trainTypesSRV.getAlltrainsTypes();
    this.trainsComposition =
      this.TrainCompositionsrv.getAllTrainsCompositions();
    this.trains = await lastValueFrom(this.traininfosrv.getDataFromServer());

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
  }

  // form submmition
  async onSubmite() {
    const control = this.trainStartDate;
    const control2 = this.trainEndDate;
    if (this.updatemood) {
      this.updatedTrainInfo.trainType = this.trainType.value;
      this.updatedTrainInfo.compositionNumber =
        this.traincompositionNumber.value;
      this.updatedTrainInfo.startDate = this.trainStartDate.value;
      this.updatedTrainInfo.endDate = this.trainEndDate.value;
      await this.traininfosrv.updateDataToServer(this.updatedTrainInfo);
      // this.trains = await lastValueFrom(this.traininfosrv.getDataFromServer());

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
        this.traininfosrv.setDataToServer(this.trainInfo.value);
        // this.trains = await lastValueFrom(
        //   this.traininfosrv.getDataFromServer()
        // );
        this.toastr.showSuccess('you success  adding a new train iformation');
      }
    }
    this.trains = await lastValueFrom(this.traininfosrv.getDataFromServer());
    this.updatemood = false;
    this.trainInfo.reset();
  }

  get trainStartDate() {
    return this.trainInfo.controls['startDate'] as FormControl;
  }
  get trainEndDate() {
    return this.trainInfo.controls['endDate'] as FormControl;
  }
  get trainType() {
    return this.trainInfo.controls['trainType'] as FormControl;
  }
  get traincompositionNumber() {
    return this.trainInfo.controls['compositionNumber'] as FormControl;
  }
  updateTrainData(index: number) {
    this.updatedtrainIndex = index;
    this.updatedTrainInfo = this.trains[index];
    this.trainInfo.patchValue({
      // trainNumber: this.trains[index].trainNumber,
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
  async deleteTrain(index: number) {
    if (confirm('are you sure that you want to delete this data ?')) {
      this.traininfosrv.deleteDataFromServer(this.trains[index].trainNumber);
      this.trains = await lastValueFrom(this.traininfosrv.getDataFromServer());
      this.toastr.showSuccess('you succeeded to delete this train');
    }
  }

  initForm() {
    this.trainInfo = new FormGroup({
      // trainNumber: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern('^[1-9]+[0-9]*$'),
      // ]),
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
