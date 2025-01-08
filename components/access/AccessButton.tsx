import React from "react";
import { Icon } from "@/components/ui/icon";
import { Bluetooth, BluetoothOff, Check, CircleSlash, CircleX, Frown, Power } from "lucide-react-native";
import { MotiView } from 'moti';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Easing } from 'react-native-reanimated';
import { Spinner } from "@/components/ui/spinner"; // Asegúrate de importar tu Spinner

export const ButtonStates = {
    idle: "idle",
    loading: "loading",
    success: "success",
    error: "error",
} as const;

interface AccessButtonProps {
    onClickButton: () => Promise<void>;
    buttonState: string;
}

export const AccessButton: React.FC<AccessButtonProps> = ({ onClickButton, buttonState }) => {
    const getButtonStyles = () => {
        switch (buttonState) {
            case ButtonStates.loading:
                return { backgroundColor: '#FFFFFF' }; // Color azul durante loading
            case ButtonStates.success:
                return { backgroundColor: '#FFFFFF' };
            case ButtonStates.error:
                return { backgroundColor: '#FFFFFF' };
            default:
                return { backgroundColor: '#FFFFFF' }; // Color gris para idle
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
            <View style={{ position: 'relative', width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                {buttonState === 'loading' && ( // Solo mostrar animación si está en loading
                    [...Array(3).keys()].map((index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0.5, scale: 1.5 }}
                            animate={{ opacity: 0, scale: 6 }}
                            transition={{
                                type: 'timing',
                                duration: 2000,
                                easing: Easing.out(Easing.ease),
                                delay: index * 400,
                                loop: true,
                            }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: 'rgba(0, 0, 255, 0.5)', // Azul semitransparente
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -40,
                                marginLeft: -40,
                            }}
                        />
                    ))
                )}

                <TouchableRipple
                    onPress={onClickButton} // Llama a la función manejadora
                    style={{
                        ...getButtonStyles(), // Aplica el estilo basado en el estado
                        borderRadius: 9999,
                        width: '100%',
                        height: '100%',
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                    rippleColor="rgba(255, 255, 255, 0.3)"
                >
                    {buttonState === ButtonStates.loading ? (
                        <Icon className="h-[45%] w-[45%]" color={'#42A5F5'} as={Bluetooth} strokeWidth={2} />
                    ) : buttonState === ButtonStates.success ? (
                        <Icon className="h-[45%] w-[45%]" color={'#4CAF50'} as={Check} strokeWidth={2} />
                    ) : buttonState === ButtonStates.error ? (
                        <Icon className="h-[45%] w-[45%]" color={'#F44336'} as={BluetoothOff} strokeWidth={1} />
                    ) : (

                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: "timing",
                                duration: 800,
                            }}
                            style={{ justifyContent: "center", alignItems: "center" }}
                        >
                            {<Power color="#3b444b" size={120} strokeWidth={2} />
                            }
                        </MotiView>
                    )}

                </TouchableRipple>
            </View>
        </View>
    );
};
