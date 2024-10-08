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

let defaultTheme: "dark" | "light" = "light";

export default function RootLayout() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  return (
    <>
      {/* top SafeAreaView */}
      <SafeAreaView
        className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`}
      />
        <GluestackUIProvider mode={colorMode}>
          {/* bottom SafeAreaView */}
          <SafeAreaView
            className={`${
              colorMode === "light" ? "bg-white" : "bg-[#171717]"
            } flex-1 overflow-hidden`}
          >
            <HomestayPage />
          </SafeAreaView>
        </GluestackUIProvider>
    </>
  );
}