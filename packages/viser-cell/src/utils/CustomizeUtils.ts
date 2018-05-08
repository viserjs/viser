declare const require: any;
// tslint:disable-next-line:no-var-requires
const F2 = require('@antv/f2');

export const registerShape = (geoName: string, shapeName: string, shapeFun: any) => {
  F2.Shape.registerShape(geoName, shapeName, shapeFun);
};

export const registerAnimation = (animationName: string, animationFun: any) => {
  F2.Animate.registerAnimation(animationName, animationFun);
};

export const registerGesture = (gestureFun: any) => {
  F2.Chart.plugins.register(gestureFun);
};
