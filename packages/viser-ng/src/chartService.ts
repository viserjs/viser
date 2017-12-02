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
  constructor() {
    this.viewId = generateRandomNum();
  }
}
