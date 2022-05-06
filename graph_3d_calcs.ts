
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

