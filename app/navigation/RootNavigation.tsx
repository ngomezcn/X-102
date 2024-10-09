import { createNavigationContainerRef } from '@react-navigation/native';
//import { navigationRef } from './navigation/RootNavigation';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any) {
  if (navigationRef.isReady()) {
    console.log(`Navegando a: ${name}`);
    // @ts-ignore
    navigationRef.navigate(name);
  } else {
    console.log('Referencia de navegación no está lista');
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    const currentRoute = navigationRef.getCurrentRoute();
    console.log('Ruta actual:', currentRoute ? currentRoute.name : 'No disponible');

    return currentRoute ? currentRoute.name : "";
  }

  console.log('Referencia de navegación no está lista');
  return "Access";
}

// Nueva función goBack
export function goBack() {
  if (navigationRef.isReady()) {
    console.log('Regresando a la ruta anterior');
    navigationRef.goBack();
  } else {
    console.log('Referencia de navegación no está lista');
  }
}