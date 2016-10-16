import { Component } from '@angular/core';
@Component({
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent {

    items: any = [
        {"title":"Det tenkende mennesket", "state":"New","price":150,"user":"John 1","userRating":3,"added":"15 Sep, 5:56 AM"},
        {"title":"Kommunikasjon i relasjoner", "state":"New","price":180,"user":"John 2","userRating":5,"added":"15 Sep, 5:56 AM"},
        {"title":"Menneskekroppen", "state":"Normal use","price":350,"user":"John 3","userRating":0,"added":"15 Sep, 5:56 AM"},
        {"title":"Intro til samfunnsvitenskap", "state":"Normal use","price":400,"user":"John 233","userRating":0,"added":"15 Sep, 5:56 AM"},
        {"title":"Matematikk for økonomer", "state":"New","price":199,"user":"John x2","userRating":1,"added":"15 Sep, 5:56 AM"},
        {"title":"Matematikk for informatikkere", "state":"As new","price":149,"user":"John 123","userRating":4,"added":"15 Sep, 5:56 AM"},
        {"title":"Metode- og oppgaveskriving", "state":"New","price":850,"user":"John 1965","userRating":0,"added":"15 Sep, 5:56 AM"},
        {"title":"Metode- og oppgaveskriving", "state":"Readable","price":849,"user":"John 06","userRating":2,"added":"15 Sep, 5:56 AM"},
    ];

}
