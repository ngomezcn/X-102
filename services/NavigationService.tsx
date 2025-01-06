import { AppRoutes } from '@/constants/AppRoutes';
import log from '@/utils/logger';
import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';
import { NavigationState } from '@react-navigation/native';
import { useHeading } from '@/hooks/useHeading';

type NavigationListener = (prevRoute: string, currentRoute: string) => void;

class NavigationService {
  private static navigationRef: NavigationContainerRef<any> = createNavigationContainerRef();
  public static listeners: Array<NavigationListener> = [];
  private static currentRoute: string | null = null;

  private static prevRoute: string = AppRoutes.Access;

  static getRef() {
    return this.navigationRef;
  }

  static isReady(): boolean {
    return this.navigationRef.isReady();
  }

  static subscribe(listener: NavigationListener): () => void {
    this.listeners.push(listener);
    // Devuelve una función para desuscribirse
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notifyListeners(prevRoute: string | null, currentRoute: string | null): void {
    this.listeners.forEach((listener) => {
      listener(prevRoute || '', currentRoute || '');
    });
  }

  static handleStateChange(state: NavigationState | undefined): void {
    if (!state || !state.routes || state.routes.length === 0) return;

    const route = state.routes[state.index];
    const newRoute = route.name;
    if (newRoute !== this.currentRoute) {
      const prevRoute = this.currentRoute;
      this.currentRoute = newRoute;
      this.prevRoute = prevRoute || "";
      this.notifyListeners(prevRoute || "", newRoute);
    }
  }

  static navigate(routeName: string, params?: object): void {
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

  static goBack(): void {
    this.navigate(this.prevRoute)
   /*const { goBackRoute } = useHeading();

    if(goBackRoute != null) {
      this.navigate(goBackRoute);
      return;
    } else { 
      this.navigate(this.prevRoute)
    }*/
  }
}

export default NavigationService;