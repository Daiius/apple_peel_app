
import * as MathU from "./math_utils"

export type Points3D = {
  x: number[], y: number[], z: number[]
};

const calcX = (t: number[], a: number): number[] => {
  return t.map(t => Math.sin(t) * Math.cos(a*t));
}
const calcY = (t: number[], a: number):number[] => {
  return t.map(t => Math.sin(t) * Math.sin(a*t));
}
const calcZ = (t: number[], a: number): number[] => {
  return t.map(t => Math.cos(t));
}

export const calcXandYandZ = (a: number): Points3D => {
    const t: number[] = MathU.range(0, MathU.pi, 0.001);
    const x: number[] = calcX(t, a);
    const y: number[] = calcY(t, a);
    const z: number[] = calcZ(t, a);

    return {x, y, z};
}

export const calcSpecifiedPoint = (a: number, t: number): Points3D => {
  return { x: calcX([t],a), y: calcY([t],a), z: calcZ([t],a) };
}

type SphereModes = "upper" | "lower";

export const calcSphereMesh = (mode: SphereModes): Points3D => {
  const delta = MathU.pi * 0.05;
  const phi   = (
      mode == "upper" 
    ? MathU.range(0, MathU.pi/2 + delta, delta*0.5)
    : MathU.range(MathU.pi/2 , MathU.pi, delta*0.5)
    );
  const theta = MathU.range(0, MathU.pi*2, delta);
  var points: Points3D = {x: [], y: [], z: []};
  for (var i = 0; i < theta.length; i++) {
    for (var j = 0; j < phi.length; j++) {
      const r = 0.99;
      const x = r * Math.sin(phi[j]) * Math.cos(theta[i]);
      const y = r * Math.sin(phi[j]) * Math.sin(theta[i]);
      const z = r * Math.cos(phi[j]);
      points.x.push(x);
      points.y.push(y);
      points.z.push(z);
    }
  }
  return points;
}
