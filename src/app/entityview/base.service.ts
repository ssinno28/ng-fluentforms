import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Filter} from './filter';
import {FilterResponse} from './filterresponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class BaseService<T> {

  constructor(public http: HttpClient, private _url: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this._url);
  }

  filter(filters: Filter[], page?: number, pageSize?: number): Observable<FilterResponse<T>> {
    const params: HttpParams = new HttpParams();
    if (page != null && pageSize != null) {
      params.set('page', page.toString());
      params.set('pageSize', pageSize.toString());
    }

    const requestOptions = {
      params: null
    };

    requestOptions.params = params;

    return this.http.post<FilterResponse<T>>(this._url + '/filter', filters, requestOptions);
  }

  get(id: any): Promise<T> {
    return this.http.get(this._url + '/' + id)
      .toPromise()
      .then(response => {
        return response as T;
      });
  }


  create(entity: T) {
    return this.http.post(this._url, entity).toPromise();
  }

  update(entity: T) {
    return this.http.put(this._url, entity).toPromise();
  }

  delete(id: any) {
    return this.http.delete(this._url + '/' + id).toPromise();
  }
}
