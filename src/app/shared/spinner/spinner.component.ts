import { Component, OnInit } from '@angular/core';

import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loading$ = this.loader.loading$;

  constructor(private loader: LoadingService) { }

  ngOnInit(): void {
  }

}
