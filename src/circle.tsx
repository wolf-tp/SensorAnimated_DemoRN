/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const SIZE = width;
const DISTANCE = width * 0.2;

type Props = {
  color: string;
  scale?: number;
};

function Circle({color, scale = 1}: Props) {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const animatedStyle = useAnimatedStyle(() => {
    const {qx, qy} = animatedSensor.sensor.value;
    console.log(
      '🚀 ~ file: circle.tsx ~ line 27 ~ animatedStyle ~ qx, qy',
      qx,
      qy,
    );

    const y = interpolate(qx, [0, 0.5, 1], [1, 0, -1]);
    const XValue = (qy * DISTANCE) / scale;

    return {
      transform: [
        {translateX: withSpring(XValue)},
        {translateY: withSpring((y * DISTANCE) / (scale * 0.6))},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            backgroundColor: color,
            width: SIZE * scale,
            height: SIZE * scale,
            borderRadius: (SIZE / 2) * scale,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Circle;
