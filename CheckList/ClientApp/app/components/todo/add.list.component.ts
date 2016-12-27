import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Component({
    selector: 'add-new-list-modal',
    template: require('./../todo/add.list.component.html')
})

export class AddListComponent {
    newListName: string;
    @Output() updateRequest = new EventEmitter();

    constructor(private _http: Http,
        private router: Router,
        private location: Location) {
    }

    open(): void {
        try {
            eval('window.document.querySelector("#add-new-list").click()');
        } catch (e) {
            this.router.navigate(['/home']);
        }
    }

    addNewList(): void {
        this._http.get('/list/new/add?title=' + this.newListName)
            .subscribe(r => {
                eval('window.document.querySelector("#close-modal").click()');
                this.updateRequest.emit("event");
            });
    }
}