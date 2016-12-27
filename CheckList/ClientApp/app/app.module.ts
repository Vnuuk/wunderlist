import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { DetailsComponent } from './components/todo/todo.details.component';
import { FormsModule } from '@angular/forms';
import { AddListComponent } from './components/todo/add.list.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        DetailsComponent,
        AddListComponent
    ],
    imports: [
        FormsModule,
        UniversalModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: ':id/:title', component: DetailsComponent },
            { path: 'new', component: AddListComponent },

            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
