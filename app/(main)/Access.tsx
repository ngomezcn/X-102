import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState as ReduxRootState } from '@/store/store';
import { AccessDevice } from "@/components/access/AccessDevice";
import { DeviceList } from "@/components/access/DeviceList";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { useHeading } from "@/hooks/useHeading";
import { IotDevice, IotDevice as iotDevice } from "@/models/IoTDevice";
import { setFocusedDeviceAsync } from '@/store/slices/focusedDeviceSlice';
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useDispatch } from '@/store/store'; // Usa tu hook personalizado

const Access = () => {
  const devices = useSelector((state: ReduxRootState) => state.device.devices);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [showAccessDevice, setShowAccessDevice] = useState(false);

  const { setHeaderSettings } = useHeading();

  const handleDevices = async (device : IotDevice | undefined = undefined) => {

    await dispatch(setFocusedDeviceAsync(null)).unwrap();
    setShowAccessDevice(false);

    if(device){
      await dispatch(setFocusedDeviceAsync(device)).unwrap();
      setShowAccessDevice(true); 

    } else
    {
      /*if (devices && devices.length === 1) {

        try {
          await dispatch(setFocusedDeviceAsync(devices[0])).unwrap();

          setShowAccessDevice(true); 
        } catch (error) {
          console.error("Error setting focused device: ", error);
        }
      } else {
        setIsLoading(false);
      }*/
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setHeaderSettings({
        heading: "Acceso",
        isIconVisible: false,
        isHeaderVisible: true,
        isLeftArrowVisible: false,
        goBackRoute: null,
      });

      handleDevices();
    }, [])
  );

  useEffect(() => {
    handleDevices();
  }, [devices]);

  if (showAccessDevice) {
    return <AccessDevice />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {devices.length > 0 && <DeviceList devices={devices}  />}
      {devices.length === 0 && <NoDevicesMessage />}
    </>
  );
};

export default Access;
