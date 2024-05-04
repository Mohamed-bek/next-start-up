import React, { useEffect, useRef } from "react";
import Chart, { ChartOptions, ChartData } from "chart.js/auto";

interface ChartComponentProps {
  data: ChartData;
  options?: ChartOptions;
  type?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  options,
  type = "bar",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: type as any,
          data: data,
          options: options,
        });
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
