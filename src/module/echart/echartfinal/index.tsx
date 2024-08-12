


  import React from 'react';
import {Dimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import CustomButton from '../../../components/button/customButton';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import {screenNames} from '../../../preferences/staticVariable';
import textStyle from '../../../style/text/style';

const EChartFinal = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
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
        boundaryGap: true,
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
        name: 'Weight loss',
        type: 'line',
        color:'gray',
        stack: 'Total',
        areaStyle: {},
      
        emphasis: {
          focus: 'series',
        },
        smooth: true,
        data: [70, 60, 50, 40, 30, 20, 10,],
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
      <div id="main" style="width: ${width * 0.8}px; height:  ${
    height * 0.4
  };"></div>
      <script>
        var myChart = echarts.init(document.getElementById('main'));
        var option = ${JSON.stringify(option)};
        myChart.setOption(option);
      </script>
    </body>
    </html>
  `;

    // const navigation: any = useNavigation();
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.chartWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{html}}
          style={screenStyles.chartContainer}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
        />
      </View>
    </View>
  );
};

export default EChartFinal;
