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

export enum TabLabels {
  Add = "Add",
  Record = "Record",
  Access = "Access",
  Help = "Help",
  Settings = "Settings",
}

// Update the BottomTab interface
export interface BottomTab {
  icon: React.ElementType;   // Icon component type
  label: TabLabels;          // The label must be one of the enum values
  disabled?: boolean;        // Optional disabled property
}

export const bottomTabs: BottomTab[] = [
  {
    icon: Plus,
    label: TabLabels.Add,
    disabled: false, // Example, set to true if you want this tab to be disabled
  },
  {
    icon: ScrollText,
    label: TabLabels.Record,
    disabled: false,
  },
  {
    icon: Home,
    label: TabLabels.Access,
    disabled: false,
  },
  {
    icon: CircleHelp,
    label: TabLabels.Help,
    disabled: true, // Example of a disabled tab
  },
  {
    icon: Settings,
    label: TabLabels.Settings,
    disabled: false,
  },
];

