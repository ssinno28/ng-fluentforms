import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from "./base.service";
import { Entity } from "./entity.interface";
import * as _ from 'lodash';
import { SelectItem } from "./selectitem.interface";

declare var $: any;

export class BaseFormComponent<T extends Entity> implements OnInit {

    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    public id: any = null;
    public item: T;

    constructor(public fb: FormBuilder,
        public service: BaseService<T>,
        public route: ActivatedRoute) {

        this.id = route.snapshot.params['id'];
    }

    setFormGroup(): void { }
    onInit(): void { }
    onCreated(): void { }

    onPatch(item: T): void { }

    ngOnInit(): void {
        this.setFormGroup();
        this.onInit();

        if (this.id != null) {
            this.service.get(this.id)
                .then(result => {
                    this.item = result;

                    this.myForm.patchValue(result);
                    this.onPatch(result);
                });
        }
    }

    save(model: T, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        if (isValid) {
            if (this.id == null) {
                this.service.create(model)
                    .then(result => {
                        this.id = result.json();

                        if (this.id !== null && this.id !== 0) {
                            this.showNotification('Item successfully created!', 'success');
                            this.onCreated();
                        } else {
                            this.showNotification('Could not create item!', 'warning');
                        }
                    });
            } else {
                model.id = parseInt(this.id);
                this.service.update(model)
                    .then(result => {
                        const success = result.json();
                        if (success) {
                            this.showNotification('Item successfully updated!', 'success');
                        } else {
                            this.showNotification('Could not update item!', 'warning');
                        }
                    });
            }
        }
    }

    showNotification(message: string, type: string): void {
        $.notify({
            icon: 'add_alert',
            message: message

        }, {
                type: type,
                timer: 4000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
    }

    itemSelected(fg: FormGroup) {
        const selected: boolean = !Boolean(fg.get('selected').value);
        fg.setControl('selected', new FormControl(selected));
    }
}
