import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Filter } from './filter';
import { FilterResponse } from './FilterResponse';

export class BaseService<T> {

    constructor(public http: Http, private _url: string) { }

    getAll(): Observable<T[]> {
        return this.http.get(this._url).map((resp: Response) => resp.json() as T[]);
    }

    filter(filters: Filter[], page?: number, pageSize?: number): Observable<FilterResponse<T>> {
        let params: URLSearchParams = new URLSearchParams();
        if (page != null && pageSize != null) {
            params.set('page', page.toString());
            params.set('pageSize', pageSize.toString());
        }

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.post(this._url + '/filter', filters, requestOptions)
            .map((resp: Response) => resp.json() as FilterResponse<T>);
    }

    get(id: any): Promise<T> {
        return this.http.get(this._url + '/' + id)
            .toPromise()
            .then(response => {
                return response.json() as T;
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
