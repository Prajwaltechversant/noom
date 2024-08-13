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

const EChartComponent = () => {
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

    const navigation: any = useNavigation();
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <Text style={textStyle.questionText}>
          Noom Creates long term results through habit and behavior change , not
          restrictive dieting
        </Text>
      </View>
      <View style={screenStyles.chartWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{html}}
          style={screenStyles.chartContainer}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
        />
      </View>
      <Text>
        Scientific reports - 78 % of participants using noom lost weight over a
        6 months study
      </Text>

      <CustomButton
        btnHeight={width * 0.2}
        btnWidth={width * 0.8}
        label="Got it!"
        btnColor={colorPalette.Lagoon}
        onPress={() => navigation.goBack(screenNames.ONBAORDING)}
        />
    </View>
  );
};

export default EChartComponent;
