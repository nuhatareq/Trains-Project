import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectSelect } from './../object-select-shared.model';

@Component({
  selector: 'app-select-shared',
  templateUrl: './select-shared.component.html',
  styleUrls: ['./select-shared.component.css'],
})
export class SelectSharedComponent implements OnInit {
  @Input() LabelName: string;
  @Input() formGroupInput: FormGroup;
  @Input() formcontolInputName: string | number;
  @Input() selections: ObjectSelect[];
  @Input() inFormArray: boolean = false;
  @Input() formArraySelectName: string = '';
  constructor() {}

  ngOnInit(): void {}
}
