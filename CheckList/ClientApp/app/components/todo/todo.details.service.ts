import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IItemInfo } from "../shared/IItemInfo";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChecklistDetailsService {
    constructor(private _http: Http) { }

    getDetails(listId: string): Observable<IItemInfo[]> {
        return this._http.get('/list/details?id=' + listId)
            .map(res => res.json());
    }

    addNewValue(listItem: string, listId: string): Observable<IItemInfo[]> {
        return this._http.get('/list/items/add?title=' + listItem + '&listId=' + listId)
            .map(res => res.json());
    }

    toggleItem(done: any, itemId: number): void {
        this._http.post('/list/items/update?itemId=' + itemId + "&done=" + done, null)
            .subscribe();
    }

    deleteItem(id: number, listId: string): Observable<IItemInfo[]> {
        return this._http.get('/list/items/delete?id=' + id + '&listId=' + listId)
            .map(res => res.json());
    }
}