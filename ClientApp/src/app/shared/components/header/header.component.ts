import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';

interface Module {
  DisplayText: string,
  Path: string,
}

@Component({
  selector: 'swe-team-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  modules: Module[] = [];

  currentIndex = 0;

  constructor(
    baseService: BaseService,
    private router: Router,
    private location: Location
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    console.log("header")
    this.intiModules();
    this.findCurrentModule();
  }

  /**
   * Khởi tạo module
   */
  intiModules() {
  }

  /**
   * Bay tới phân hệ chỉ định
   */
  routeUrl(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  findCurrentModule() {
    const path = this.location.path();

    // if (path.toLocaleLowerCase().startsWith(`/${ModulePath.DASHBOARD}`)) {
    //   this.currentIndex = this.modules.findIndex(item => item.Path == ModulePath.DASHBOARD);

    // } else if (path.toLocaleLowerCase().startsWith(`/${ModulePath.CONTACT}`)) {
    //   this.currentIndex = this.modules.findIndex(item => item.Path == ModulePath.CONTACT);

    // } else {
    //   this.currentIndex = 0;
    // }
  }
}
