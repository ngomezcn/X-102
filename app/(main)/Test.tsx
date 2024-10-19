import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Test = () => {

  const styles = StyleSheet.create({
    dot: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: 'blue', // Color del círculo central
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => (
          <MotiView
            key={index}
            from={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              type: 'timing',
              duration: 2000,
              easing: Easing.out(Easing.ease),
              delay: index * 400,
              loop: true,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(0, 0, 255, 0.5)', // Color azul para la animación
              position: 'absolute',
            }}
          />
        ))}
        <Feather name='phone-outgoing' size={32} color='#fff' />
      </View>
    </View>
  );
};

export default Test;
