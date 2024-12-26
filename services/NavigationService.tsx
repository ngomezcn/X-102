
import { AppRoutes } from '@/constants/AppRoutes';
import log from '@/utils/logger';
import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';

type NavigationListener = (prevRoute: string, currentRoute: string) => void;

/*
Ejemplo para usar el subscription

useEffect(() => {
    const listener = (prevRoute: string, currentRoute: string) => {
      // Aqui se podria ejecutar codigo al cambiar de vista
    };
    NavigationService.subscribe(listener);


    return () => {

      // Limpiar la suscripción al desmontar el componente
      NavigationService.listeners = NavigationService.listeners.filter(l => l !== listener);
    };
  }, []);

*/

class NavigationService {
  private static navigationRef: NavigationContainerRef<any> = createNavigationContainerRef();
  public static listeners: Array<NavigationListener> = [];
  private static currentRoute: string | null = null;

  static getRef() {
    return this.navigationRef;
  }

  static isReady(): boolean {
    return this.navigationRef.isReady();
  }

  static subscribe(listener: NavigationListener): void {
    this.listeners.push(listener);
  }

  private static notifyListeners(prevRoute: string, currentRoute: string): void {
    this.listeners.forEach(listener => listener(prevRoute, currentRoute));
  }


  // Se ha de poner la pantalla la lista del AppContainer
  static navigate(routeName: string, params?: object): void {
    if (this.isReady()) {
      const prevRoute = this.getCurrentRoute();
      log.debug(`Navegando a: ${routeName}`);
      this.navigationRef.navigate(routeName, params);
      this.currentRoute = routeName; // Actualizamos la ruta actual
      this.notifyListeners(prevRoute, routeName); // Notificamos a los escuchadores
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

  static goBack(): void {
    if (this.isReady()) {
      const prevRoute = this.getCurrentRoute();
      log.debug('Regresando a la ruta anterior');
      this.navigationRef.goBack();
      const newRoute = this.getCurrentRoute(); // Obtenemos la nueva ruta después de hacer goBack
      this.notifyListeners(prevRoute, newRoute);
    } else {
      log.warn('Referencia de navegación no está lista');
    }
  }
}

export default NavigationService;
