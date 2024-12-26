import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ModalConnStringManager } from "../../components/add/ModalConnStringManager";
import { ModalQrManager } from "../../components/add/ModalQrManager";
import { useHeading } from "@/hooks/useHeading";
import { useFocusEffect } from "expo-router";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { Button, StyleSheet } from 'react-native';
import PermissionsService from "@/services/PermissionsService";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Overlay } from "@gluestack-ui/overlay";
import { VerificationConnStringModal } from "@/components/add/VerificationConnStringModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});


const ScanQr = () => {

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [connString, setConnString] = useState<string | null>(null);
  const verificationModalRef = React.useRef(null);

  const cameraRef = useRef<CameraView>(null);

  const { setHeadingAppName, setIconVisibility, setHeaderVisibility, setLeftArrowVisibility } = useHeading();
  useFocusEffect(
    React.useCallback(() => {
      setHeadingAppName('Escanear QR');
      setIconVisibility(true);
      setHeaderVisibility(true);

      return () => {
        // Puedes restablecer el encabezado o limpiar si es necesario cuando se pierde el foco
        setIconVisibility(false);
        setHeaderVisibility(false);
      };
    }, [])
  );

  useEffect(() => {

  },
    []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.

    //permission = await PermissionsService.requestAllPermissions();
    //return allPermissionsGranted;

    return (
      <View >
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function showModal(data: any) {
    if (cameraRef.current) {
      cameraRef.current.pausePreview();
    }
    setConnString(data)
    setShowVerificationModal(true)
  }

  return <>
    <VStack className="px-5 py-4 flex-1" space="lg">
      <Text>AAA</Text>
      <VerificationConnStringModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        finalFocusRef={verificationModalRef}
        connString={connString || ""} /// TODO: Fixear esto debe asegurase el string         
      />

      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          ref={cameraRef} 
          facing={facing}
          onBarcodeScanned={({ data }) => {
            showModal(data)
            
          }}>
        </CameraView>
      </View>

    </VStack>
  </>;
};

export default ScanQr;
