/**
 * Calculate the vertor normal to the specified verctor
 * @param vector number[]
 */
export const calculateUnitNormal = (vector: number[]) => {
  const [a = 0, b = 0] = vector;
  const magnitud = Math.pow(a, 2) + Math.pow(b, 2);

  if (magnitud <= 0) {
    return [0, 0];
  }

  if (a === 0) { return [1, 0]; }
  const tanTheta = b / a;
  const theta = Math.atan(tanTheta);
  const normalTheta = theta + Math.PI / 2;

  return [Math.cos(normalTheta), Math.sin(normalTheta)];
};
