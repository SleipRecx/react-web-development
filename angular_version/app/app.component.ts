import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'

})
export class AppComponent {

    messages: any = [
        {"sender":"Bob1", "message":"wtb book!"},
        {"sender":"Bob123", "message":"Perfect book!"},
        {"sender":"Bob abc", "message":"The book fell apart!"},
        {"sender":"boB 101", "message":"Best buy ever!"}
    ];

    public countMessages(){
        return Object.keys(this.messages).length;
    }

}
