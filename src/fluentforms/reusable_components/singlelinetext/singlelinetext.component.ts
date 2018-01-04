import {Component} from '@angular/core';
import {BaseReusableComponent} from '../basereusable/basereusable.component';

@Component({
  selector: 'app-singlelinetext',
  templateUrl: './singlelinetext.component.html',
  styleUrls: ['./singlelinetext.component.css']
})
export class SingleLineTextComponent extends BaseReusableComponent {
  placeholderTxt = '';
}
