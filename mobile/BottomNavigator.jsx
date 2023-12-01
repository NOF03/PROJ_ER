import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useProjectColors } from './Colors';


function Feed() {

  return (
    <View >
      <Text>Feed!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View >
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View >
      <Text>Notifications!</Text>
    </View>
  );
}

function Activities() {
  return (
    <View >
      <Text>Activities!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function MyTabs() {

  const projectColors = useProjectColors();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: projectColors.backgroundColor,
          height: 70,
          padding: 5,
        },
        tabBarActiveTintColor: projectColors.primaryColor,
        tabBarInactiveTintColor: projectColors.inactiveColor,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
          fontWeight: 600
        }
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Anúncios',
          tabBarIcon: ({ color }) => (
            <Icon name="bullhorn" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Atividades"
        component={Activities}
        options={{
          tabBarLabel: 'Atividades',
          tabBarIcon: ({ color }) => (
            <Icon name="check-square-o" size={30} color={color} />
          ),
        }}

      />
      <Tab.Screen
        name="Novidades"
        component={Notifications}
        options={{
          tabBarLabel: 'Novidades',
          tabBarIcon: ({ color }) => (
            <Icon name="bell-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}