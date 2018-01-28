import {Component} from '@angular/core';
import {BaseReusableComponent} from '../../../fluentforms';

@Component({
  selector: 'app-singlelinetext',
  templateUrl: './singlelinetext.component.html',
  styleUrls: ['./singlelinetext.component.css']
})
export class SingleLineTextComponent extends BaseReusableComponent {
  placeholderTxt = '';
}
