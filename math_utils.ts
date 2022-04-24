
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


