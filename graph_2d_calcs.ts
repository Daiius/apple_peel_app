
import * as MathU from "./math_utils"

type Points2D = {
  x: number[];
  y: number[];
};

const calcX = (t: number[], a: number): number[] => {
    var dx = t.map(t => Math.cos(a*Math.sin(t))-a*Math.sin(t)*Math.sin(a*Math.sin(t)));
    return MathU.cumtrapz(t, dx);
}

const calcY = (t: number[], a: number): number[] => {
  var dy = t.map(t => Math.sin(a*Math.sin(t))+a*Math.sin(t)*Math.cos(a*Math.sin(t)));
  return MathU.cumtrapz(t, dy);
}

export const calcSpecifiedPoint = (t: number, a: number, shift: Points2D, theta: number): Points2D => {
  const tt = MathU.range(0, t, 0.001);
  const points: Points2D = {x: calcX(tt, a), y: calcY(tt, a)};
  const {x, y}: {x: number, y: number} = {
    x: points.x[points.x.length - 1], 
    y: points.y[points.y.length - 1]
    };
  return {
    x: [(x - shift.x[0])*Math.cos(-theta) - (y - shift.y[0])*Math.sin(-theta)],
    y: [(x - shift.x[0])*Math.sin(-theta) + (y - shift.y[0])*Math.cos(-theta)]
    };
}

type CalcResult = {
  shift: Points2D;
  theta: number;
  points: Points2D;
};

export const calcXandY = (a: number): CalcResult => {
    const tt: number[] = MathU.range(0, MathU.pi, 0.001);
    const x: number[] = calcX(tt, a);
    const y: number[] = calcY(tt, a);
    const shift_result = shiftToCenter({x, y});
    const rotate_result = rotateToHorizontal(shift_result.points);
    return {
      shift: shift_result.shift,
      theta: rotate_result.theta,
      points: rotate_result.points
      };
}

type ShiftResult = {
  points: Points2D;
  shift: Points2D;
}

function shiftToCenter(pos: Points2D) : ShiftResult {
  const shift: Points2D = { 
    x: [(pos.x[0] + pos.x[pos.x.length - 1])/2],
    y: [(pos.y[0] + pos.y[pos.y.length - 1])/2],
    };
  return {
    points: {
      x: pos.x.map(x => x - shift.x[0]),
      y: pos.y.map(y => y - shift.y[0]),
      },
    shift: shift
    };
}

type RotationResult = {
  points: Points2D;
  theta: number;
};

function rotateToHorizontal(pos: Points2D, theta_start: number = 0.0) : RotationResult {
  const x = pos.x[0];
  const y = pos.y[0];
  const d = Math.sqrt(x*x+y*y);
  const theta = Math.asin(y/d);
  
  var result_x = pos.x.slice();
  var result_y = pos.y.slice();
  for (var i = 0; i < result_x.length; i++) {
    result_x[i] = Math.cos(-theta)*pos.x[i] - Math.sin(-theta)*pos.y[i];
    result_y[i] = Math.sin(-theta)*pos.x[i] + Math.cos(-theta)*pos.y[i];
  }

  if (Math.abs(result_y[0]) < 1e-4) return {
    points: {x: result_x, y: result_y},
    theta: theta_start + theta
    };
  else return rotateToHorizontal({x: result_x, y: result_y}, theta + theta_start);
  
  //return {x: result_x, y: result_y};
}

