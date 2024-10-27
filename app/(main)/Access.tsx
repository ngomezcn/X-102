import React, { useEffect, useState, useLayoutEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState as ReduxRootState } from '@/store/store';

import log from '@/utils/logger';
import NavigationService from '@/services/NavigationService';
import { AccessDevice } from "@/components/access/AccessDevice";
import { DeviceList } from "@/components/access/DeviceList";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { VStack } from "@/components/ui/vstack";
import { useToastUtil } from "@/components/ToastUtil";
import { useHeading } from "@/hooks/useHeading";
import { IotDevice as iotDevice } from "@/models/IoTDevice";
import { getSingleDevice } from "@/utils/DeviceUtils";

const Access = () => {
  const devices = useSelector((state: ReduxRootState) => state.device.devices);
  const [singleDevice, setSingleDevice] = useState<null | iotDevice>();

  const onDeviceSelect = (device: iotDevice) => {
    setSingleDevice(device)
  };

  useEffect(() => {
    setSingleDevice(getSingleDevice(devices))
  });

  useFocusEffect(() => {
    setSingleDevice(getSingleDevice(devices))
  });

  if (devices.length > 1) {
    return <DeviceList devices={devices} onDeviceSelect={onDeviceSelect} />;
  }

  if (singleDevice) {
    return <AccessDevice iotDevice={singleDevice} />;
  }

  if (singleDevice === null) {
    return <NoDevicesMessage />;
  }
};

export default Access;