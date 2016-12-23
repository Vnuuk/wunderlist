import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { ICheckList } from '../shared/ICheckList';
import { NavMenuService } from '../navmenu/navmenu.service';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')],
    providers: [ NavMenuService ]
})

export class NavMenuComponent {
    constructor(private _http: Http,
                private _navService: NavMenuService) { }

    lists: ICheckList[];

    ngOnInit() {
        this.refreshPanel();
    }

    refreshPanel(): void {
        this._navService.getChecklists()
            .subscribe(r => this.lists = <ICheckList[]>r);
    }

    removeList(id: number): void {
        this._navService.deleteChecklist(id)
            .subscribe(r => this.lists = <ICheckList[]>r);
    }
}