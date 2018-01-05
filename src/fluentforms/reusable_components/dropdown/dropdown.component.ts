import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {BaseReusableComponent} from '../basereusable/basereusable.component';
import {SelectItem} from '../../interfaces/selectitem.interface';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends BaseReusableComponent {
  @ViewChild('dropdown', {read: ElementRef}) dropdown: ElementRef;

  selectItems: SelectItem[] = [];
  placement: string;
  selectedText = 'Select an Item';

  onInit(ctrl: AbstractControl): void {
    this.dropdown.nativeElement.setAttribute('aria-labelledby', this.fieldName);

    const selectedItem =
      this.selectItems.find((item) => {
        return item.selected;
      });

    if (selectedItem !== undefined) {
      ctrl.setValue(selectedItem.value);
      this.selectedText = selectedItem.text;
    }
  }

  itemSelected(item: SelectItem): void {
    const ctrl = this.formGroup.get(this.fieldName);
    ctrl.setValue(item.value);
    this.selectedText = item.text;
  }
}
