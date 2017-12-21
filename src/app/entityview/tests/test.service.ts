import {BaseService} from '../base.service';
import {Test} from './test.interface';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class TestService extends BaseService<Test> {

  constructor(public http: Http, public url: string) {
    super(http, url);
  }
}
