import { Component, OnInit } from '@angular/core';
import { IUserHeader } from './interfaces/IUserHeader';
import { AuthService } from '@app/core/services';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ld-header',
  imports: [CommonModule],
  templateUrl: './ld-header.component.html',
  styleUrl: './ld-header.component.scss'
})
export class LdHeaderComponent implements OnInit {

  user: IUserHeader = {};
  isLoggedIn = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.buildHeader();
  }
  buildHeader() {
    
    this.isLoggedIn = this.authService.isLogged();

    if(this.authService.isLogged()){
      this.user = this.authService.getUser();
    }
  }
}
