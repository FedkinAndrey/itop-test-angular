import { Component, Input, OnInit } from '@angular/core';
import { IPB24 } from '../header/header.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  constructor() {}

  @Input() currentCurrency!: IPB24;

  ngOnInit(): void {}
}
