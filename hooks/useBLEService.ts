import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import log from '../utils/logger';
/*import { BLEService } from "../components/BLEServiceInstance"

export const useBLEService = () => {
    useEffect(() => {
        return () => {
            BLEService.destroy(); 
        };
    }, []);

    return BLEService; 
};*/