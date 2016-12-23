import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IItemInfo } from "../shared/IItemInfo";
import { ChecklistDetailsService } from "../todo/todo.details.service";

@Component({
    template: require('./todo.details.component.html'),
    styles: [require('./todo.details.component.css')],
    providers: [ChecklistDetailsService]
})

export class DetailsComponent {
    items: IItemInfo[];
    title: string;
    newListItem: string;
    listId: string;

    constructor(private route: ActivatedRoute,
        private _http: Http,
        private _detailsService: ChecklistDetailsService) { }

    refreshDetails(): void {
        this.route.params.subscribe((params: Params) => {
            this.listId = params['id'];
            this.title = params['title'];
            this._detailsService.getDetails(this.listId)
                .subscribe(r => this.items = <IItemInfo[]>r);
        });
    }

    ngOnInit(): void {
        this.refreshDetails();
    }

    addNewValue(): void {
        this._detailsService.addNewValue(this.newListItem, this.listId)
            .do(r => this.newListItem = '')
            .subscribe(r => this.items = <IItemInfo[]>r);
    }

    updateItemValue(done: any, itemId: number): void {
        this._detailsService.toggleItem(done, itemId);
    }

    removeItem(id: number): void {
        this._detailsService.deleteItem(id, this.listId)
            .subscribe(r => this.items = <IItemInfo[]>r);
    }
}