import {SinglelineComponent} from '../singleline/singleline.component';
import {Editor} from '../../fluentforms/editors/base.editor';

export class SinglelineEditor extends Editor<SinglelineComponent> {
  component = SinglelineComponent;
}
