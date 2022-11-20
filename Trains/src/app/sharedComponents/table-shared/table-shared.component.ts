import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-shared',
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.css'],
})
export class TableSharedComponent implements OnInit {
  @Input('headers') headers: string[];
  @Input('data') data: any[];
  @Input('keys') keys: string[];
  @Input('updateMood') updateMood: boolean;
  @Output('updatedIndex') updatedIndex: EventEmitter<number> =
    new EventEmitter();
  @Output('deletedIndex') deletedIndex: EventEmitter<number> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  updateObject(index: number) {
    this.updatedIndex.emit(index);
  }
  deleteObject(index: number) {
    this.deletedIndex.emit(index);
  }
}
