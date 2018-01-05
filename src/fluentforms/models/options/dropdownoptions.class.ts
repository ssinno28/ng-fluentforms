import {EditorOptions} from './editoroptions.class';
import {SelectItem} from '../../interfaces/selectitem.interface';

export class DropdownOptions extends EditorOptions {
  selectItems: SelectItem[] = [];
  placement: string;
}
