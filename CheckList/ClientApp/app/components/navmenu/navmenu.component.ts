import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { ICheckList } from '../shared/ICheckList';
import { NavMenuService } from '../navmenu/navmenu.service';
import { AddListComponent } from '../todo/add.list.component';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')],
    providers: [ NavMenuService ]
})

export class NavMenuComponent {
    @ViewChild(AddListComponent) modal: AddListComponent;
    lists: ICheckList[];

    constructor(private _http: Http,
        private _navService: NavMenuService,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        this.refreshPanel();

        if (this.location.path() === '/new') {
            this.modal.open();
        }
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