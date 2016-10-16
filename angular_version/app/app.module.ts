import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule }   from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessagesComponent} from "./messages/messages.component";
import {MyBooksComponent} from "./myBooks/myBooks.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'messages',
                component: MessagesComponent,
            },
            {
                path: 'my-books',
                component: MyBooksComponent,
            }
        ])
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        MessagesComponent,
        MyBooksComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}