import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'base-project';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.post(`https://mes.woodsland.vn/api/login`, {
      email: "admin",
      password: "admin123"
    }).subscribe(res => {
      console.log(res);
      
    })
  }
}
