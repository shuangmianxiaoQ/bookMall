import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [HttpService]
})
export class IndexComponent implements OnInit {
  indexUrl: string = `${this.http.baseUrl}index/index.php`;
  carouselItems: string[] = [];
  categoryItems: string[] = [];
  newArrivalItems: string[] = [];
  topSaleItems: string[] = [];
  firstRecommendedItem: any = null;
  restRecommendedItems: string[] = [];
  newRankItems: string[] = [];
  sellRankItems: string[] = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getIndexData();
  }

  getIndexData() {
    this.http.sendGetMethod(this.indexUrl, {})
      .subscribe((data: any) => {
        this.carouselItems = data['carouselItems'];
        this.categoryItems = data['categoryItems'];
        this.newArrivalItems = data['newArrivalItems'];
        this.topSaleItems = data['topSaleItems'];
        this.firstRecommendedItem = data['recommendedItems'][0];
        this.restRecommendedItems = data['recommendedItems'].slice(1);
        this.newRankItems = data['newRankItems'];
        this.sellRankItems = data['sellRankItems'];
      })
  }
}
