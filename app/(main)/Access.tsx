import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import log from '@/utils/logger';
import NavigationService from '@/services/NavigationService';
import { AccessDevice } from "@/components/access/AccessDevice";
import { DeviceList } from "@/components/access/DeviceList";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { VStack } from "@/components/ui/vstack";
import { useToastUtil } from "@/components/ToastUtil";
import { useHeading } from "@/context/HeadingContext";

const Access = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);
  const { setHeadingAppName, toggleIconVisibility, hideHeader } = useHeading();

  const [showSingleDevice, setShowSingleDevice] = useState(false);
  const [singleDeviceParam, setSingleDeviceParam] = useState<string>("");

  setHeadingAppName("Smart Gate")

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
          <AccessDevice deviceId={singleDeviceParam} />
        ) : deviceList.length > 1 ? (
           <DeviceList onDeviceSelect={handleShowSingleDevice} />
        ) : deviceList.length === 1 ? (
          <AccessDevice deviceId={singleDeviceParam} />
        ) : (
          <NoDevicesMessage />
        )}

    </>
  );
};

export default Access;