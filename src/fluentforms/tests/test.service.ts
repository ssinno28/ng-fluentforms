import {BaseService} from '../base.service';
import {Test} from './test.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TestService extends BaseService<Test> {

  constructor(public http: HttpClient) {
    super(http, '/api/tests');
  }
}
