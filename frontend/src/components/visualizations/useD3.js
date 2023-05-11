/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRef } from "react";
import * as d3 from 'd3';

// from https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app
export default function useD3(renderChartFn, dependencies) {
  const ref = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => { };
  }, [...dependencies]);
  return ref;
}