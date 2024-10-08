import React from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import * as Linking from "expo-linking";
import HomestayPage from "./AppContainer";
import { Box } from '@/components/ui/box';
import BottomNavigationView from "@/app/navigation/BottomNavigation";
let defaultTheme: "dark" | "light" = "light";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessScreen from "./screens/AccessScreen";
import AddScreen from "./screens/AddScreen";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "accessscreen",
};

const Stack = createNativeStackNavigator();


export default function RootLayout() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  return (
    <>
      <SafeAreaView className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`} />
      <GluestackUIProvider mode={colorMode}>

        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Access" component={AccessScreen} />
            <Stack.Screen name="Add" component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>

       
        {/*
        <SafeAreaView className={`${colorMode === "light" ? "bg-white" : "bg-[#171717]"} flex-1 overflow-hidden`}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="access" />

          </Stack>
          <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
            <BottomNavigationView />
          </Box>

        </SafeAreaView> */}
      </GluestackUIProvider>
    </>
  );
}