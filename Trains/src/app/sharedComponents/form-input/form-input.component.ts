import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent implements OnInit {
  @Input('name') name: string;
  @Input('type') type: string;
  @Input('inputFormName') inputFormName: string;
  @Input('formGroupInputGroup') formGroupInputGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
