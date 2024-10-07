import React from 'react';

export const PointContext = React.createContext<{
  appliedPoints: string | null;
  setAppliedPoints: (points: string) => void;
}>({
  appliedPoints: null,
  setAppliedPoints: () => {}
});

export function PointProvider(props: React.PropsWithChildren) {
  const [appliedPoints, setAppliedPoints] = React.useState<string | null>(null);

  return (
    <PointContext.Provider value={{ appliedPoints, setAppliedPoints }}>
      {props.children}
    </PointContext.Provider>
  );
}

export function usePoint() {
  return React.useContext(PointContext);
}
