
import * as MathU from "./math_utils"

const calcX = (t: number[], a: number): number[] => {
    var dx = t.map(t => Math.cos(a*Math.sin(t))-a*Math.sin(t)*Math.sin(a*Math.sin(t)));
    return MathU.cumtrapz(t, dx);
}

const calcY = (t: number[], a: number): number[] => {
  var dy = t.map(t => Math.sin(a*Math.sin(t))+a*Math.sin(t)*Math.cos(a*Math.sin(t)));
  return MathU.cumtrapz(t, dy);
}

export const calcXandY = (a: number): {x: number[], y: number[]} => {
    const tt: number[] = MathU.range(0, MathU.pi, 0.001);
    const x: number[] = calcX(tt, a);
    const y: number[] = calcY(tt, a);
    const pos_shifted = MathU.shiftToCenter({x, y});
    const pos_rotated = MathU.rotateToHorizontal(pos_shifted);
    return pos_rotated;
}
