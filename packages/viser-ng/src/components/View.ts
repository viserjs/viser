import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';
import { IScale } from 'viser';

@Component({
  selector: 'v-view',
  template: `<div #chartDom></div>`,
})
class View extends Chart {
  @Input() data?: any;
  @Input() dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() scale?: object[];
  @Input() dataView?: any;
}

@Component({
  selector: 'v-facet-view',
  template: `<div #chartDom></div>`,
})
class FacetView extends Chart {
  @Input() dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() dataView?: any;
  @Input() scale?: IScale;
}

export { View, FacetView };
