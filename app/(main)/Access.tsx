import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState as ReduxRootState } from '@/store/store';
import { AccessDevice } from "@/components/access/AccessDevice";
import { DeviceList } from "@/components/access/DeviceList";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { useHeading } from "@/hooks/useHeading";
import { IotDevice as iotDevice } from "@/models/IoTDevice";

const Access = () => {
  const devices = useSelector((state: ReduxRootState) => state.device.devices);
  const [singleDevice, setSingleDevice] = useState<iotDevice | undefined>(undefined);

  const { setHeadingAppName, setIconVisibility, setHeaderVisibility } = useHeading();

  useFocusEffect(
    React.useCallback(() => {
      setHeadingAppName('Añadir');
      setIconVisibility(true);
      setHeaderVisibility(true);

      // Reiniciamos singleDevice a undefined cuando la vista se enfoca
      setSingleDevice(undefined);
      
      return () => {
        setIconVisibility(false);
        setHeaderVisibility(false);
      };
    }, [setHeadingAppName, setIconVisibility, setHeaderVisibility])
  );

  const onDeviceSelect = (device: iotDevice) => {
    setSingleDevice(device);
  };

  return (
    <>
      {singleDevice != undefined && (
        <AccessDevice iotDevice={singleDevice} />
      )}
      {devices.length > 0 && singleDevice == undefined && (
        <DeviceList devices={devices} onDeviceSelect={onDeviceSelect} />
      )}
      {devices.length === 0 && (
        <NoDevicesMessage />
      )}
    </>
  );
};

export default Access;
