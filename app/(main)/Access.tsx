import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import log from '@/utils/logger';
import NavigationService from '@/services/NavigationService';
import { Profile } from "@/components/access/Profile";
import { DeviceList } from "@/components/access/DeviceList";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { VStack } from "@/components/ui/vstack";
import { useToastUtil } from "@/components/ToastUtil";

const Access = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);

  const [showSingleDevice, setShowSingleDevice] = useState(false);
  const [singleDeviceParam, setSingleDeviceParam] = useState<string>("");

  const handleShowSingleDevice = (param: string) => {
    setSingleDeviceParam(param);
    setShowSingleDevice(true);
  };

  useEffect(() => {
    const listener = (prevRoute: string, currentRoute: string) => {
      console.log(`Ruta anterior: ${prevRoute}, Ruta actual: ${currentRoute}`);

      setSingleDeviceParam("");
      setShowSingleDevice(false);
    };

    NavigationService.subscribe(listener);

    // Limpiar la suscripción al desmontar el componente
    return () => {
      NavigationService.listeners = NavigationService.listeners.filter(l => l !== listener);
    };
  }, []);

  return (
    <>
        {showSingleDevice ? (
          <Profile deviceId={singleDeviceParam} />
        ) : deviceList.length > 1 ? (
           <DeviceList onDeviceSelect={handleShowSingleDevice} />
        ) : deviceList.length === 1 ? (
          <Profile deviceId={singleDeviceParam} />
        ) : (
          <NoDevicesMessage />
        )}

    </>
  );
};

export default Access;