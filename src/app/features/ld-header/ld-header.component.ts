import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ld-header',
  imports: [CommonModule],
  templateUrl: './ld-header.component.html',
  styleUrl: './ld-header.component.scss'
})
export class LdHeaderComponent implements OnInit {

  user: IUser = {};
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
