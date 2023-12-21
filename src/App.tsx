import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesList } from "./utils/routes";
import { MainMetersScreen, MeterDetailsScreen } from "./screens";
import { useGetMetersQuery } from "./services/meters";
import { IMeter } from "./utils/types";
import { metersAPI } from "./utils/api";

function App() {
  const [meters, setMeters] = useState<Array<IMeter> | undefined>(undefined);
  const metersQuery = useGetMetersQuery();

  const addNewMeter = useCallback(
    (meter: IMeter) => {
      setMeters([...(meters ?? []), meter]);
    },
    [meters, setMeters],
  );

  const deleteMeter = useCallback(
    async (meterId: string) => {
      await metersAPI.deleteMeter(meterId);
      setMeters(meters?.filter((meter) => meter.id !== meterId));
    },
    [meters, setMeters],
  );

  const updateMeter = useCallback(
    (meterId: string, data: IMeter) => {
      setMeters(
        meters?.map((meter) => {
          if (meter.id === meterId) return data;
          return meter;
        }),
      );
    },
    [meters, setMeters],
  );

  useEffect(() => {
    const { isLoading, error, data } = metersQuery;
    if (!isLoading && !error && data) setMeters(data);
  }, [metersQuery]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={RoutesList.MainMetersScreen}
            element={
              <MainMetersScreen
                meters={meters}
                operations={{ addNewMeter, deleteMeter }}
                metersQuery={metersQuery}
              />
            }
          />
          <Route
            path={RoutesList.MeterDetails}
            element={
              <MeterDetailsScreen
                meters={meters}
                operations={{ updateMeter }}
                metersQuery={metersQuery}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
