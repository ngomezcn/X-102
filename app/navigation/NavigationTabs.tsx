import {
  Plus,
  Home,
  MessageCircle,
  User,
  SlidersHorizontal,
  ScrollText,
  CircleHelp,
  Settings,
} from "lucide-react-native";

export enum NavigationTabs {
  
  // Main Menu
  Add = "Add",
  Record = "Record",
  Access = "Access",
  Help = "Help",
  Settings = "Settings",

  // Sub-pages
  SetDeviceInfoScreen = "SetDeviceInfoScreen",
  PairDeviceScreen = "PairDeviceScreen",
  
}

// Update the BottomTab interface
export interface BottomTab {
  icon: React.ElementType;   // Icon component type
  label: NavigationTabs;          // The label must be one of the enum values
  disabled?: boolean;        // Optional disabled property
}

export const bottomTabs: BottomTab[] = [
  {
    icon: Plus,
    label: NavigationTabs.Add,
    disabled: false, // Example, set to true if you want this tab to be disabled
  },
  {
    icon: ScrollText,
    label: NavigationTabs.Record,
    disabled: false,
  },
  {
    icon: Home,
    label: NavigationTabs.Access,
    disabled: false,
  },
  {
    icon: CircleHelp,
    label: NavigationTabs.Help,
    disabled: true, // Example of a disabled tab
  },
  {
    icon: Settings,
    label: NavigationTabs.Settings,
    disabled: false,
  },
];

