import * as RadialBar from './RadialBar';
import * as Waterfall from './Waterfall';
import * as Sankey from './Sankey';
import * as ErrorBar from './ErrorBar';

export default function() {
  RadialBar.registerShape();
  Waterfall.registerShape();
  Sankey.registerShape();
  ErrorBar.registerShape();
}
