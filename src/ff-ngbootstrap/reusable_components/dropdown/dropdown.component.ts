import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseReusableComponent} from '../../../fluentforms';
import {SelectItem} from '../../../fluentforms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends BaseReusableComponent {
  @ViewChild('dropdown', {read: ElementRef}) dropdown: ElementRef;

  selectItems: SelectItem[] = [];
  placement = 'bottom-left';
  selectedText = 'Select an Item';
  open = false;
  autoClose = true;

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
