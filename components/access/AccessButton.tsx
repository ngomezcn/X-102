import React from "react";
import { Icon } from "@/components/ui/icon";
import { Check, CircleX, Power } from "lucide-react-native";
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
                return { backgroundColor: '#1E90FF' }; // Color azul durante loading
            case ButtonStates.success:
                return { backgroundColor: '#00A36C' };
            case ButtonStates.error:
                return { backgroundColor: 'red' };
            default:
                return { backgroundColor: 'grey' }; // Color gris para idle
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
            <View style={{ position: 'relative', width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                {buttonState === 'loading' && ( // Solo mostrar animación si está en loading
                    [...Array(3).keys()].map((index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0.7, scale: 1 }}
                            animate={{ opacity: 0, scale: 4 }}
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
                        <Spinner className="h-[145%] w-[145%]" color={'#FFFFFF'} /> // Muestra el spinner en lugar del ícono
                    ) : buttonState === ButtonStates.success ? (
                        <Icon className="h-[45%] w-[45%]" color={'#FFFFFF'} as={Check} />
                    ) : buttonState === ButtonStates.error ? (
                        <Icon className="h-[45%] w-[45%]" color={'#FFFFFF'} as={CircleX} />
                    ) : (
                        <Icon className="h-[45%] w-[45%]" color={'#FFFFFF'} as={Power} />
                    )}

                </TouchableRipple>
            </View>
        </View>
    );
};
