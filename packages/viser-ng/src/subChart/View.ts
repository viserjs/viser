import { Component, Input } from '@angular/core';
import { Chart } from '../Chart';

@Component({
  selector: 'View',
  template: `<div #chartDom></div>`,
})
class View extends Chart {
  @Input() data?: any;
  @Input() dataDef?: object[];
  @Input() dataPre?: {
    connector?: string;
    source?: any;
    transform?: object[] | object;
  };
  @Input() scale?: object[];
  @Input() dataView?: string;
}

export default View;
