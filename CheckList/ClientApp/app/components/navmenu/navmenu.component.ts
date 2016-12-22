import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { ICheckList } from '../shared/ICheckList';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})

export class NavMenuComponent {
    constructor(private _http: Http) { }

    lists: Observable<ICheckList[]>;

    ngOnInit() {
        this.refreshPanel();
    }

    refreshPanel(): void {
        this._http.get('/lists/get')
            .map(res => res.json())
            .subscribe(json => this.lists = <Observable<ICheckList[]>>json);
    }

    removeList(id: number): void {
        let url = '/lists/delete?id=' + id;
        this._http.get(url)
            .map(res => res.json())
            .subscribe(json => this.lists = <Observable<ICheckList[]>>json);
    }
}