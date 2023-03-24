import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariables } from '../common/globals';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const loading = new BehaviorSubject(GlobalVariables.loadingPage = true);

    loading.subscribe(state => {
      console.log("Loading...");
      if(state == false) {
        console.log("Load complete!");
        // clear interval
        clearInterval(interval);
        // clear loading page
        document.getElementById('loading')?.classList.add('hide-loader');
      }
    })

    const interval = setInterval(() => {
      loading.next(GlobalVariables.loadingPage);
    }, 1000)
  }

  scroll(id: string) {
    let el: HTMLElement | null = document.getElementById(id);

    if(el != null) el?.scrollIntoView({behavior: 'smooth'});
  }
}
