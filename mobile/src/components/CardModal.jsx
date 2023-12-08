import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const ExpandableCard = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const translateY = new Animated.Value(0);

  const handleGesture = Animated.event([{ nativeEvent: { translationY: translateY } }], {
    useNativeDriver: false,
  });

  const handleRelease = (event) => {
    if (event.nativeEvent.translationY > 50) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const cardStyles = {
    height: expanded ? 'auto' : 150,
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            handleRelease(event);
          }
        }}
      >
        <Animated.View style={[styles.card, cardStyles, { transform: [{ translateY }] }]}>
          <Text style={styles.title}>{title}</Text>
          <Text>{content}</Text>
        </Animated.View>
      </PanGestureHandler>

      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)} style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  readMoreButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  readMoreText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ExpandableCard;
