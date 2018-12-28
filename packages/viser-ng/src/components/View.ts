import { Component, Input } from '@angular/core';
import { IFilter, IScale } from 'viser';
import { Chart } from '../Chart';

@Component({
  selector: 'v-view',
  template: `<div #chartDom></div>`,
})
class View extends Chart {
  @Input() public data?: any;
  @Input() public dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() public scale?: object[];
  @Input() public dataView?: any;
  @Input() public start?: any;
  @Input() public end?: any;
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'v-facet-view',
  template: `<div #chartDom></div>`,
})
class FacetView extends Chart {
  @Input() public dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() public dataView?: any;
  @Input() public scale?: IScale;
  @Input() public filter?: IFilter;
}

export { View, FacetView };
