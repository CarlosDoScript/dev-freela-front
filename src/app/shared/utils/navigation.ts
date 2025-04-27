import { Injectable } from "@angular/core";
import { NavigationBehaviorOptions, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class Navigation {

    constructor(private router: Router) { }

    redirectTo(url: string): void {
        this.router.navigateByUrl(url);
    }

    redirectToWithParams(url: string, id: string) {
        this.router.navigate([`/${url}`], {queryParams: {id:id}});
    }


}