import * as RadialBar from './RadialBar';
import * as Sankey from './Sankey';
import * as ErrorBar from './ErrorBar';

export default function() {
  RadialBar.registerShape();
  Sankey.registerShape();
  ErrorBar.registerShape();
}
