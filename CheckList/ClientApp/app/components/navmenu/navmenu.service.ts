import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ICheckList } from '../shared/ICheckList';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavMenuService {
    constructor(private _http: Http) { }

    getChecklists(): Observable<ICheckList[]> {
        return  this._http.get('/lists/get').map(res => res.json());
    }

    deleteChecklist(id: number): Observable<ICheckList[]> {
        let url = '/lists/delete?id=' + id;
        return  this._http.get(url).map(res => res.json());
    }

}