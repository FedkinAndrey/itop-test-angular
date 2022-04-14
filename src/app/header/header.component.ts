import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IPB24 {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  currencies!: IPB24[];

  ngOnInit(): void {
    this.fetchPB24Currencies();
  }

  fetchPB24Currencies(): void {
    this.httpClient
      .get<IPB24[]>(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      )
      .subscribe(response => {
        this.currencies = response.slice(0, 2);
      });
  }
}
