import * as RadialBar from './RadialBar';
import * as Waterfall from './Waterfall';
import * as Sankey from './Sankey';
import * as ErrorBar from './ErrorBar';

export default function(config: any) {
  RadialBar.registerShape(config);
  Waterfall.registerShape(config);
  Sankey.registerShape(config);
  ErrorBar.registerShape(config);
}
