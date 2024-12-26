
import BottomNavigationView from "@/components/navigation/BottomNavigation";
import React from "react";
import AppHeader from "@/components/header/Header";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { AppRoutes } from '@/constants/AppRoutes';
import "@/global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import NavigationService from "../services/NavigationService";
import Access from "./(main)/Access";
import AddScreen from "./(main)/Add";
import SetDeviceInfoScreen from "./(main)/SetDeviceInfoScreen";
import Test from "./(main)/Test";
import ScanQr from "./(main)/ScanQr";
let defaultTheme: "dark" | "light" = "light";

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  NavigationService.navigate(AppRoutes.Access)
  changeNavigationBarColor('#ffffff', true);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"/>
        
      <GluestackUIProvider mode={colorMode}>
        <NavigationContainer ref={NavigationService.getRef()} independent={true}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <AppHeader />
                <Stack.Navigator
                  initialRouteName={AppRoutes.Access}
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                  }}
                >
                  <Stack.Screen name={AppRoutes.Access} component={Access} />
                  <Stack.Screen name={AppRoutes.Add} component={AddScreen} />
                  <Stack.Screen name={AppRoutes.ScanQR} component={ScanQr} />
                  <Stack.Screen name={AppRoutes.Test} component={Test} />
                  <Stack.Screen
                    name={AppRoutes.SetDeviceInfoScreen}
                    component={SetDeviceInfoScreen}
                  />
                </Stack.Navigator>
              </SafeAreaView>
            </View>
            <BottomNavigationView />
          </View>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
};
export default AppContainer;

