import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUserContext } from './UserContext'

import Activities from '../views/Activities';
import Announcement from '../views/Announcement';
import News from '../views/News';
import Profile from '../views/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const { user } = useUserContext();
  return (
    <Tab.Navigator
      initialRouteName="Anuncios"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          height: 70,
          padding: 5,
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
          fontWeight: 600,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Anuncios':
              iconName = 'bullhorn';
              break;
            case 'Atividades':
              iconName = 'check-square-o';
              break;
            case 'Novidades':
              iconName = 'bell-o';
              break;
            case 'Perfil':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }

          // You can use Animated.Value and interpolate for the lift-up effect
          const liftUp = new Animated.Value(1);
          const animatedStyle = {
            transform: [
              {
                translateY: liftUp.interpolate({
                  inputRange: [0, 3],
                  outputRange: [0, 11], // Adjust the lift-up distance as needed
                }),
              },
            ],
          };

          Animated.timing(liftUp, {
            toValue: focused ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
          }).start();

          return (
            <Animated.View style={animatedStyle}>
              <Icon name={iconName} size={30} color={color} />
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen name="Anuncios" component={Announcement} />
      {console.log(user)}
      {user && user.role !== "auxiliareducativo" && <Tab.Screen name="Atividades" component={Activities} />}
      <Tab.Screen name="Novidades" component={News} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
