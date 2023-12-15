import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MenuLogin from '../views/MenuLogin';
import BottomNavigator from './BottomNavigator';

const { Navigator, Screen } = createStackNavigator();

export default function MainNavigator() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="MenuLogin" component={MenuLogin} />
            <Screen name="InAppNavigator" component={BottomNavigator} />
        </Navigator>
    )


}