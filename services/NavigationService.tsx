import { createNavigationContainerRef } from '@react-navigation/native';

class NavigationService {
  public static navigationRef = createNavigationContainerRef();

  static getRef() {
    return this.navigationRef;
  }

  static isReady() {
    return this.navigationRef.isReady();
  }

  static navigate(routeName: string, params?: object) {
    if (this.isReady()) {
      console.log(`Navegando a: ${routeName}`);
      this.navigationRef.navigate(routeName, params);
    } else {
      console.warn('Referencia de navegación no está lista');
    }
  }

  static getCurrentRoute(): string {
    if (this.isReady()) {
      const currentRoute = this.navigationRef.getCurrentRoute();
      return currentRoute ? currentRoute.name : "";
    }

    console.warn('Referencia de navegación no está lista');
    return "Access";
  }

  static goBack() {
    if (this.isReady()) {
      console.log('Regresando a la ruta anterior');
      this.navigationRef.goBack();
    } else {
      console.warn('Referencia de navegación no está lista');
    }
  }
}

export default NavigationService;
