import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import log from './logger';
import { BLEService } from "./BLEServiceInstance"

export const useBLEService = () => {
    useEffect(() => {
        return () => {
            BLEService.destroy(); 
        };
    }, []);

    return BLEService; 
};