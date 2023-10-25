import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss']
})
export class WebsiteLayoutComponent {

  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user')!)
    return userInfo
  }
  handleLogout() {
    const logout = localStorage.removeItem('user');
    return logout
  }
}
