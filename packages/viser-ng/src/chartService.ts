import { Injectable } from '@angular/core';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

@Injectable()
export class ChartContext {
  public viewId: string;
  public config: any = {};
  public views: any = {};
  public facetviews: any = {};
  public lastFacetId: string;
  public timer: any;
  public chart: any;
  public chartDivElement: any;
  constructor() {
    this.viewId = generateRandomNum();
  }
}
