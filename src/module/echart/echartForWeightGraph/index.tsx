import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import React, { useRef, useEffect, } from 'react';
import {
   LineChart
} from 'echarts/charts';
import {
   TitleComponent,
   GridComponent,
   LegendComponent,
   TooltipComponent,
   DataZoomComponent,
} from 'echarts/components';
import { ScrollView, } from 'react-native';
import { useScreenContext } from '../../../context/screenContext';



echarts.use([
   TitleComponent,
   TooltipComponent,
   GridComponent,
   SVGRenderer,
   LineChart,
   LegendComponent,
   DataZoomComponent,
]);

interface Props {
   option: any
}

const ChartComponent: React.FC<Props> = ({ option }: any) => {
   const screenContext = useScreenContext();
   const { width, height, isPortrait } = screenContext;
   const chartRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      let chart: echarts.ECharts | null = null;
      if (chartRef.current) {
         chart = echarts.init(chartRef.current, 'light', {
            renderer: 'svg',
            width: width,
            height: screenContext.isPortrait ? height * 0.78 : height * 0.6,
         });
         chart.setOption(option);
      }
      return () => chart?.dispose();
   }, [option, width, height]);

   return <ScrollView horizontal><SvgChart ref={chartRef} /></ScrollView>;
}

export default ChartComponent;