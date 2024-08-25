import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const FlowChart = () => {
  // Dummy array of 30 courses
  const courses = Array.from({ length: 30 }, (v, i) => ({
    title: `Course ${i + 1}`,
    level: `Level ${Math.ceil((i + 1) / 10)}`,
    order: i + 1,
  }));

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <Svg height={courses.length * 150} width="300">
        {courses.map((course, index) => {
          const isEven = index % 2 === 0;
          const startX = isEven ? 50 : 250;
          const endX = isEven ? 250 : 50;
          const controlX1 = isEven ? 0 : 150;
          const controlX2 = isEven ? 199 : 150;
          const startY = index * 100;
          const endY = startY + 100;

          return (
            <React.Fragment key={index}>
              <Path
                d={`M${startX} ${startY} C${controlX1} ${startY + 160}, ${controlX2} ${endY - 100}, ${endX} ${endY}`}
                stroke="lightblue"
                strokeWidth="4"
                fill="none"
              />
              {/* Circle at the start of the curve */}
              <Circle cx={startX} cy={startY} r="10" fill="lightblue" />
            </React.Fragment>
          );
        })}
      </Svg>

      {courses.map((course, index) => {
        const isEven = index % 2 === 0;
        return (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: index * 150 + 10,
              left: isEven ? 100 : 0,
              right: isEven ? 0 : 100,
              alignItems: isEven ? 'flex-start' : 'flex-end',
            }}
          >
            <Text>{course.level}</Text>
            <Text>{course.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FlowChart;
