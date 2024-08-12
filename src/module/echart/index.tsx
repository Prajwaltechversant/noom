import React from 'react';
import {Dimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';

const {width} = Dimensions.get('window');

const EChartComponent = () => {
  const option = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    toolbox: {
      feature: {
        //   saveAsImage: {}
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Month1', '', '', '', '', '', 'Month6'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Restrictive Diet',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        smooth: true,
        data: [80, 60, 50, 40, 30, 20, 10],
      },
      {
        name: 'Without Diet',
        type: 'line',
        stack: 'Total',
        label: {
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        smooth: true,
        data: [70, 60, 70, 50, 80, 90, 100],
      },
    ],
  };

  const html = `
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">


    </head>
    <body>
      <div id="main" style="width: ${width}px; height: 400px;"></div>
      <script>
        var myChart = echarts.init(document.getElementById('main'));
        var option = ${JSON.stringify(option)};
        myChart.setOption(option);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{html}}
        style={{height: 400}}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
      />
    </View>
  );
};

export default EChartComponent;
