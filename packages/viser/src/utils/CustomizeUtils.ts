import * as G2 from '@antv/g2';

export const registerShape = (geoName: string, shapeName: string, shapeFun: any) => {
  G2.Shape.registerShape(geoName, shapeName, shapeFun);
};

export const registerAnimation = (animationType: string, animationName: string, animationFun: any) => {
  G2.Animate.registerAnimation(animationType, animationName, animationFun);
};
