import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { Box } from '@/components/ui/box';
import BottomNavigationView from "@/app/navigation/BottomNavigation";

import { TabLabels } from '@/app/navigation/NavigationTabs'
import AccessScreen from "./screens/AccessScreen";

const AppContainer = () => {

  const [activeTab, setActiveTab] = React.useState<TabLabels>(TabLabels.Access);

  return (
    <>
      <Box className="flex-1">
      <StatusBar />

        <Box className="flex-1 pt-8">
          <AccessScreen activeTab={activeTab} setActiveTab={setActiveTab} />
        </Box>

        <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
          <BottomNavigationView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Box>
      </Box>
    </>
  );
};
export default AppContainer;

