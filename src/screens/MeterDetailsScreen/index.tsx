import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMeterDetailsProps } from "./props";
import { IMeter } from "../../utils/types";
import { Alert, Breadcrumb } from "antd";
import { BreadCrumbsBlock } from "../../styles";
import { MeterCard } from "./styles";
import { MeterDetailsForm } from "../../components";

export const MeterDetailsScreen: FC<IMeterDetailsProps> = ({
  metersQuery: { isLoading: isMetersLoading, error },
  meters,
  operations: { updateMeter },
}) => {
  const { meterId } = useParams();
  const [isUpdateLoading, setUpdateLoading] = useState<boolean>(false);
  const [meter, setMeter] = useState<IMeter | undefined>(undefined);
  const [meterError, setMeterError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const isLoading = isUpdateLoading || isMetersLoading;

  const breadcrumbItems = useMemo(
    () => [
      {
        title: "Home",
        onClick: () => navigate("/"),
      },
      { title: meter?.display_name },
    ],
    [navigate, meter],
  );

  useEffect(() => {
    const meter = meters?.find((meter: IMeter) => meter.id === meterId);
    if (!isMetersLoading && !error) {
      if (meters && !meter)
        return setMeterError("Meter wasn't found in meters list");
      return setMeter(meter);
    }
  }, [meterId, meters, isMetersLoading, error]);

  return (
    <>
      <BreadCrumbsBlock>
        <Breadcrumb items={breadcrumbItems} />
      </BreadCrumbsBlock>
      <MeterCard
        loading={isLoading}
        title={meter?.display_name}
        bordered={false}
        style={{ width: 500 }}
      >
        {meterError ? (
          <Alert
            message="Error"
            description={meterError}
            type="error"
            showIcon
          />
        ) : (
          <MeterDetailsForm
            meter={meter}
            setLoading={setUpdateLoading}
            updateMeter={updateMeter}
          />
        )}
      </MeterCard>
    </>
  );
};
