import React, {createContext, ReactNode, useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
interface ScreenContextProps {
  fontScale: number;
  height: number;
  scale: number;
  width: number;
  isTabletType: boolean;
  isPortrait:boolean
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {fontScale, height, scale, width} = useWindowDimensions();

  let isTabletType = isTablet();
  let isPortrait = height > width;
  const value = {
    fontScale,
    height,
    scale,
    width,
    isTabletType,
    isPortrait
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export const useScreenContext = (): ScreenContextProps => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error(
      'useScreenContext must be used within a ScreenContextProvider',
    );
  }
  return context;
};
