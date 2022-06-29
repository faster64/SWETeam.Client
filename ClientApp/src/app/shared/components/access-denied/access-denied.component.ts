import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Routing } from '../../constants/common.constant';
import { LocalStorageKey } from '../../constants/localstorage.key';
import { Message } from '../../models/message/message';
import { SWETeamButton } from '../button/swe-team-button.component';
import { MessageBox } from '../message-box/message-box.component';

@Component({
  selector: 'access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  @ViewChild("issueBtn")
  issueBtn!: SWETeamButton;


  ngOnInit(): void {
  }

  /**
   * Quay lại
   */
  back(e: any) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([`/${Routing.DASHBOARD}`]);
    } else {
      this._router.navigate([`/${Routing.LOGIN}`]);
    }
  }

  /**
   * Nếu có vấn đề
   */
  hasIssue(): boolean {
    if (!this._authService.isLoggedIn()) {
      return true;
    }

    return false;
  }

  /**
   * Xử lý sự cố
   */
  handleIssue() {
    const message = new Message(this, { content: "Chương trình sẽ tự động đăng xuất sau khi xử lý sự cố", title: 'Cảnh báo' }, () => {
      this._authService.logout(() => {
        this._router.navigate([`/${Routing.LOGIN}`]);
      });
    });

    MessageBox.cofirm(message).subscribe( r => this.issueBtn.isFinished = true);
  }
}
