"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var HomeComponent = (function () {
    function HomeComponent() {
        this.items = [
            { "title": "Det tenkende mennesket", "state": "New", "price": 150, "user": "John 1", "userRating": 3, "added": "15 Sep, 5:56 AM" },
            { "title": "Kommunikasjon i relasjoner", "state": "New", "price": 180, "user": "John 2", "userRating": 5, "added": "15 Sep, 5:56 AM" },
            { "title": "Menneskekroppen", "state": "Normal use", "price": 350, "user": "John 3", "userRating": 0, "added": "15 Sep, 5:56 AM" },
            { "title": "Intro til samfunnsvitenskap", "state": "Normal use", "price": 400, "user": "John 233", "userRating": 0, "added": "15 Sep, 5:56 AM" },
            { "title": "Matematikk for økonomer", "state": "New", "price": 199, "user": "John x2", "userRating": 1, "added": "15 Sep, 5:56 AM" },
            { "title": "Matematikk for informatikkere", "state": "As new", "price": 149, "user": "John 123", "userRating": 4, "added": "15 Sep, 5:56 AM" },
            { "title": "Metode- og oppgaveskriving", "state": "New", "price": 850, "user": "John 1965", "userRating": 0, "added": "15 Sep, 5:56 AM" },
            { "title": "Metode- og oppgaveskriving", "state": "Readable", "price": 849, "user": "John 06", "userRating": 2, "added": "15 Sep, 5:56 AM" },
        ];
    }
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/home/home.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map