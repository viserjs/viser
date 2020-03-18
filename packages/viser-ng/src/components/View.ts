import { Component, Input, forwardRef } from '@angular/core';
import { IFilter, IScale } from 'viser';
import { Chart, EMBEDDED_VIEW_TOKEN } from '../Chart';

@Component({
  selector: 'v-view',
  template: `<div #chartDom></div>`,
  providers: [
    {
      provide: EMBEDDED_VIEW_TOKEN,
      useExisting: forwardRef(() => View)
    }
  ]
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
  providers: [
    {
      provide: EMBEDDED_VIEW_TOKEN,
      useExisting: forwardRef(() => FacetView)
    }
  ]
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
