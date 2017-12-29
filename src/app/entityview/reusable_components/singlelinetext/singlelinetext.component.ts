import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-singlelinetext',
  templateUrl: './singlelinetext.component.html',
  styleUrls: ['./singlelinetext.component.css']
})
export class SingleLineTextComponent implements OnInit {

  @Input()
  placeholderTxt: string;

  @Input()
  fieldName: string;

  @Input()
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
