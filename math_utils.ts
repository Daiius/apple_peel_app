
export const pi = 3.14159265358979;

export function range(start: number, end: number, step: number) : number[] 
{
  return Array.from({ length: (end - start)/step }, (v, i) => start + i * step);
}

export function cumtrapz(x: number[], y: number[]) : number[]
{
  var result = new Array(x.length);

  result[0] = 0.0;
  for (var i = 1; i < x.length; i++)
  {
    result[i] = result[i-1] + (y[i] + y[i-1])/2 * (x[i]-x[i-1]);
  }

  return result;
}

interface Positions {
  x: number[];
  y: number[];
};

export function shiftToCenter(pos: {x: number[], y: number[]}) : {x: number[], y: number[]} {
  const shift: {x: number, y: number} = { 
    x: (pos.x[0] + pos.x[pos.x.length - 1])/2,
    y: (pos.y[0] + pos.y[pos.y.length - 1])/2,
    };
  return {
    x: pos.x.map(x => x - shift.x),
    y: pos.y.map(y => y - shift.y),
    }
}

export function rotateToHorizontal(pos: {x: number[], y: number[]}) : {x: number[], y: number[]} {
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

  if (Math.abs(result_y[0]) < 0.01) return {x: result_x, y: result_y};
  else return rotateToHorizontal({x: result_x, y: result_y});
  
  //return {x: result_x, y: result_y};
}
