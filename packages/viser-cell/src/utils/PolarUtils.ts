export const degreeToRadian = (angle: number): number => {
  return angle * Math.PI / 180;
};

export const radianToDegree = (angleInRadian: number): number => {
  return angleInRadian * 180 / Math.PI;
};

export const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
  const radian = degreeToRadian(angle);
  return {
    x: cx + Math.cos(radian) * radius,
    y: cy + Math.sin(radian) * radius,
  };
};
