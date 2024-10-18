import { AppRoutes } from '@/constants/AppRoutes';
import log from '@/utils/logger';
import { createNavigationContainerRef } from '@react-navigation/native';

class NavigationService {
  private static navigationRef = createNavigationContainerRef();

  static getRef() {
    return this.navigationRef;
  }

  static isReady() {
    return this.navigationRef.isReady();
  }

  static navigate(routeName: string, params?: object) {
    if (this.isReady()) {
      log.debug(`Navegando a: ${routeName}`);
      this.navigationRef.navigate(routeName, params);
    } else {
      log.warn('Referencia de navegación no está lista');
    }
  }

  static getCurrentRoute(): string {
    if (this.isReady()) {
      const currentRoute = this.navigationRef.getCurrentRoute();
      return currentRoute ? currentRoute.name : "";
    }

    log.warn('Referencia de navegación no está lista, devolviendo default ' + AppRoutes.Access);
    return AppRoutes.Access;
  }

  static goBack() {
    if (this.isReady()) {
      log.debug('Regresando a la ruta anterior');
      this.navigationRef.goBack();
    } else {
      log.warn('Referencia de navegación no está lista');
    }
  }
}

export default NavigationService;
