import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { finalize } from 'rxjs';
import SHARED_MODULE from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SHARED_MODULE],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loading = true;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    // private toastService: ToastService,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  // get current user by token if browser refresh (f5)
  getCurrentUser() {
    let user = this.authService.getCurrentUser();
    let accessToken = this.authService.getAccessToken();
    this.loading = true;
    let startTime = Date.now();

    if (accessToken != null && user == null) {
      this.authService.getCurrentAppUser()
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe(res => {
          this.keepLoadingEffect(startTime);
          this.authService.storeUser(res);
          console.log(res);

        });
    }

    if (accessToken == null && user == null) {
      this.keepLoadingEffect(startTime);
    }
  }

  keepLoadingEffect(startTime: number) {
    // Tính thời gian API chạy
    let elapsed = Date.now() - startTime;
    let remaining = 3000 - elapsed; // còn thiếu bao nhiêu ms để đủ 2s

    if (remaining > 0) {
      setTimeout(() => {
        this.loading = false;
      }, remaining);
    } else {
      this.loading = false;
    }
  }
}
