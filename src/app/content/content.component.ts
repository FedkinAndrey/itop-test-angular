import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IRates {
  [currency: string]: number;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  constructor(private httpClient: HttpClient) {}

  rates!: IRates;
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'USD';
  currency2: string = 'EUR';

  getKeys(obj: IRates): string[] {
    return Object.keys(obj);
  }

  handleAmount1Change(amount1: string) {
    this.amount2 =
      (Number(amount1) * this.rates[this.currency2]) /
      this.rates[this.currency1];
    this.amount1 = Number(amount1);
  }

  handleCurrency1Change(currency1: string) {
    this.amount2 =
      (this.amount1 * this.rates[this.currency2]) / this.rates[currency1];
    this.currency1 = currency1;
  }

  handleAmount2Change(amount2: string) {
    this.amount1 =
      (Number(amount2) * this.rates[this.currency1]) /
      this.rates[this.currency2];
    this.amount2 = Number(amount2);
  }

  handleCurrency2Change(currency2: string) {
    this.amount1 =
      (this.amount2 * this.rates[this.currency1]) / this.rates[currency2];
    this.currency2 = currency2;
  }

  ngOnInit(): void {
    this.fetchCurrenciesRates();
  }

  ngAfterViewInit(): void {
    if (!!this.rates) {
      this.handleAmount1Change('1');
    }
  }

  fetchCurrenciesRates(): void {
    this.httpClient
      .get<any>(
        'http://data.fixer.io/api/latest?access_key=307e43b9c1bdb4180e737bd4952cb44f&format=1'
      )
      .subscribe(response => {
        this.rates = response.rates;
      });
  }
}
