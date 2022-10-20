import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/service/cookies.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss']
})
export class LogoffComponent implements OnInit {

  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.cookieService.deleteCookie('ADMIN');
  }

}
