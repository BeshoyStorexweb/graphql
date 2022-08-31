import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
