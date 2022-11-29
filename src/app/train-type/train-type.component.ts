import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TrainType } from '../models/train-data.model';
import { ToasterService } from '../services/toastr.service';
import { TrainTypeService } from '../services/train-type.service';

@Component({
  selector: 'app-train-type',
  templateUrl: './train-type.component.html',
  styleUrls: ['./train-type.component.css'],
})
export class TrainTypeComponent implements OnInit {
  trainType: FormGroup;
  trainsTypes: TrainType[] = [];
  updatingTrainType: number;
  updateMood = false;
  updateTrainTypes: TrainType;
  tableHeaders: string[] = ['Train Type ID', 'Train Type Name'];
  tableKeys: string[] = ['trainTypeId', 'trainTypeName'];
  constructor(
    private touster: ToasterService,
    private traintypeSRV: TrainTypeService
  ) {}

  async ngOnInit() {
    this.forminit();
    // await lastValueFrom(this.traintypeSRV.getDataFromServer()).then(
    //   (data: any) => {
    //     console.log(data);
    //     data.forEach((element) => {
    //       this.trainsTypes.push(
    //         new TrainType(element.train_type_name, element.id)
    //       );
    //     });
    //   }
    // );
    this.trainsTypes = await lastValueFrom(
      this.traintypeSRV.getDataFromServer()
    );
    // this.trainsTypes = this.traintypeSRV.getAlltrainsTypes();
  }
  async onSubmit() {
    if (this.trainType.valid) {
      if (this.updateMood) {
        // this.traintypeSRV.updateTrainType(
        //   this.updatingTrainType,
        //   this.trainTypeName.value
        // );
        this.updateTrainTypes.trainTypeName = this.trainTypeName.value;
        this.traintypeSRV.updateDataInServer(this.updateTrainTypes);
        // this.trainsTypes = this.traintypeSRV.getAlltrainsTypes();
        // this.trainsTypes = await lastValueFrom(
        //   this.traintypeSRV.getDataFromServer()
        // );
        this.touster.showSuccess('Updated Successfully');
      } else {
        let typeFound = this.traintypeSRV.findtrainType(
          this.trainTypeName,
          this.trainTypeId
        );
        if (typeFound) {
          this.touster.showFailure('this train type is already available');
        } else {
          // this.traintypeSRV.addTrainType(this.trainType.value);
          this.traintypeSRV.setDataToServer(this.trainTypeName.value);
          this.trainsTypes = await lastValueFrom(
            this.traintypeSRV.getDataFromServer()
          );
          this.touster.showSuccess('you added train type successfully');
        }
        this.trainsTypes = this.traintypeSRV.getAlltrainsTypes();
      }
      this.updateMood = false;
      this.trainType.reset();
    }
  }

  get trainTypeName() {
    return this.trainType.controls['trainTypeName'] as FormControl;
  }
  get trainTypeId() {
    return this.trainType.controls['trainTypeId'] as FormControl;
  }
  forminit() {
    this.trainType = new FormGroup({
      trainTypeName: new FormControl(null, [Validators.required]),
      // trainTypeId: new FormControl(null, [Validators.required]),
    });
  }
  updateTrainType(index: number) {
    this.updatingTrainType = index;
    this.updateTrainTypes = this.trainsTypes[this.updatingTrainType];
    this.trainType.patchValue({
      trainTypeName: this.trainsTypes[this.updatingTrainType].trainTypeName,
      // trainTypeId: this.trainsTypes[this.updatingTrainType].trainTypeId,
    });
    this.updateMood = true;
  }
  deleteTrainType(index: number) {
    if (confirm('Are You Sure !!!')) {
      this.traintypeSRV.deleteDataFromServer(
        this.trainsTypes[index].trainTypeId
      );
      this.traintypeSRV.deleteTrainType(index);
      this.trainsTypes = this.traintypeSRV.getAlltrainsTypes();
      this.touster.showSuccess('deleted successfully');
    }
  }
  cancelUpdate() {
    this.updateMood = false;
    this.trainType.reset();
  }
}
