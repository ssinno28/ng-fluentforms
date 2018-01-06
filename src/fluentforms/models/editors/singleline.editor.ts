import {Editor} from './base.editor';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';

export class SingleLineEditor extends Editor<SingleLineTextComponent> {
  component = SingleLineTextComponent;

  test(name: string): SingleLineEditor {
    return this;
  }
}
