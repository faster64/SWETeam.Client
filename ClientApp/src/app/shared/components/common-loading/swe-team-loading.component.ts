import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swe-team-loading',
  templateUrl: './swe-team-loading.component.html',
  styleUrls: ['./swe-team-loading.component.scss']
})
export class SWETeamLoading implements OnInit {

  @Input("showLoadingText")
  isShowLoadingText: boolean = false;

  @Input("loadingText")
  loadingText: string = "Đang tải...";

  constructor() { }

  ngOnInit(): void {
  }

}
