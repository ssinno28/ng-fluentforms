import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-singlelinetext',
  templateUrl: './singlelinetext.component.html',
  styleUrls: ['./singlelinetext.component.css']
})
export class SingleLineTextComponent implements OnInit {

  @Input()
  placeholderTxt: string;

  constructor() { }

  ngOnInit() {
  }

}
