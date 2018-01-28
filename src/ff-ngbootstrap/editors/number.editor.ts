import {NumberComponent} from '../reusable_components/number/number.component';
import {Editor} from '../../fluentforms';

export class NumberEditor extends Editor<NumberComponent> {
  component = NumberComponent;
}
