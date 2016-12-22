import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IItemInfo } from "../shared/IItemInfo";

@Component({
    template: require('./todo.details.component.html'),
    styles: [ require('./todo.details.component.css') ]
})

export class DetailsComponent {
    items: Observable<IItemInfo[]>;
    title: string;
    newListItem: string;
    listId: string;

    constructor(private route: ActivatedRoute, private _http: Http) { }

    refreshDetails(): void {
        this.route.params.subscribe((params: Params) => {
            this.listId = params['id'];
            this.title = params['title'];
            this._http.get('/list/details?id=' + this.listId)
                .map(res => res.json())
                .subscribe(json => this.items = <Observable<IItemInfo[]>>json);
        });
    }

    ngOnInit(): void {
        this.refreshDetails();
    }

    addNewValue(): void {
        this._http.get('/list/items/add?title=' + this.newListItem + '&listId=' + this.listId)
            .map(res => res.json())
            .do(r => this.newListItem = '')
            .subscribe(json => this.items = <Observable<IItemInfo[]>>json);
    }
}