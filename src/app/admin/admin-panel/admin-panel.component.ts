import { Component, OnInit } from '@angular/core';
import { BlogEntryService } from 'src/app/service/blog-entry.service';
import { Session } from 'src/defs/session';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  session: Session = {session: false};

  password: string = "";

  constructor(private bogEntryService: BlogEntryService) { }

  ngOnInit(): void {
  }

  login() {
    this.bogEntryService.login(this.password).subscribe(data => this.session = data as Session);
  }

}
