import * as d3 from 'd3';

// code from https://observablehq.com/@observablehq/plot
// and https://github.com/observablehq/plot-create-react-app-example

import * as Plot from "@observablehq/plot";
import * as rawData from './tuition-wins.json';

import { useEffect, useRef } from 'react';

const data = rawData;

export default function Chart({
  width, height
}) {
  const ref = useRef();

  useEffect(() => {
    const chart = Plot.dot(data, { x: 'tuition', y: 'wins' }).plot();
    ref.current.append(chart);
  }, [width, height]);



  return <div ref={ref} />;
};