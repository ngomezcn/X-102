import { useEffect, useRef } from 'react';

const useNavigationChange = (callback) => {
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    const currentLocation = location;

    // Ejecuta la función de callback con el valor anterior y el nuevo
    callback(previousLocation.current, currentLocation);

    // Actualiza el valor anterior
    previousLocation.current = currentLocation;
  }, [location, callback]);
};

export default useNavigationChange;
