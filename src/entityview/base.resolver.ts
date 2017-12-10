import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

export class BaseResolver<T> implements Resolve<T> {

    constructor(public service: BaseService<T>, private _param: string) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
        return this.service.get(route.params[this._param]);
    }
}