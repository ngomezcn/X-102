import DeviceFeatures from "@/app/(main)/DeviceFeatures";
import DeviceOptions from "@/app/(main)/DeviceOptions";
import {
    Plus,
    Home,
    ScrollText,
    CircleHelp,
    Settings,
} from "lucide-react-native";

export const AppRoutes = {
    ToDo: "todo",
    Test: "test",
    Access: "access",
    
    ScanQR: "scanqr",
    DeviceOptions: "device-options",
    DeviceFeatures: "device-features",
    AccessRoutes: {
        DevicesList: "access-devices-list",
        NoDevicesMessage: "access-no-devices-message",
        AccessDevice: "access-device",
    },

    Add: "Add",
    Record: "Record",
    Help: "Help",
    Settings: "Settings",

    SetDeviceInfoScreen: "SetDeviceInfoScreen",
} as const;


export interface IBottomTab {
    id: string;
    label: string;
    disabled?: boolean;
    icon: React.ElementType;
}

export const bottomTabs: IBottomTab[] = [
    {
        id: AppRoutes.Add,
        label: "Añadir",
        disabled: false,
        icon: Plus,
    },
    /*{
        id: AppRoutes.Record,
        label: "Registro",
        disabled: false,
        icon: ScrollText,
    },*/
    {
        id: AppRoutes.Access,
        label: "Acceso",
        disabled: false,
        icon: Home,
    },
   /* {
        id: AppRoutes.Help,
        label: "Ayuda",
        disabled: false,
        icon: CircleHelp,
    },*/
    {
        id: AppRoutes.Test,
        label: "TAjustes",
        disabled: false,
        icon: Settings,
    },
];

