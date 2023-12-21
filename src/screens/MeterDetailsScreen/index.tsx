import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMeterDetailsProps } from "./props";
import { IMeter, IMeterForm, MeterTypeEnum } from "../../utils/types";
import { Alert, Breadcrumb, Button, Input, message, Select } from "antd";
import { BreadCrumbsBlock } from "../../styles";
import { ControlButtonsBlock, MeterCard, UpdateMeterForm } from "./styles";
import { useFormik } from "formik";
import { convertMeterToFormValues, getErrorMessage } from "../../utils/helpers";
import { meterFormValidator } from "../../utils/validators";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { metersAPI } from "../../utils/api";
import { isEqual } from "lodash";

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
  const initMeterFormValues: IMeterForm = useMemo(() => {
    return convertMeterToFormValues(meter);
  }, [meter]);
  const isLoading = useMemo<boolean>(
    () => isUpdateLoading || isMetersLoading,
    [isMetersLoading, isUpdateLoading],
  );

  const {
    values: { display_name, api_name, active, type, used_for_billing },
    handleChange,
    errors,
    handleSubmit,
    handleBlur,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik<IMeterForm>({
    onSubmit: async ({
      display_name,
      api_name,
      active,
      type,
      used_for_billing,
    }) => {
      try {
        setUpdateLoading(true);
        if (!meter) throw new Error("Meter not found");
        const { data } = await metersAPI.updateMeter(meter.id, {
          active: active === "true" ? true : false,
          used_for_billing: used_for_billing === "true" ? true : false,
          display_name,
          api_name,
          type,
        });
        updateMeter(meter.id, data);
        message.success("Meter was successfully added.");
      } catch (err: unknown) {
        message.error(getErrorMessage(err));
      } finally {
        setUpdateLoading(false);
      }
    },
    initialValues: initMeterFormValues,
    validate: meterFormValidator,
    enableReinitialize: true,
  });

  const handleSelectChange = useCallback((param: string) => {
    return (
      value: unknown,
      option:
        | DefaultOptionType
        | BaseOptionType
        | (DefaultOptionType | BaseOptionType)[],
    ): void => {
      setFieldValue(param, value);
    };
  }, []);

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
  }, [meters, isMetersLoading, error]);

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
          <UpdateMeterForm onSubmit={handleSubmit}>
            <Input
              addonBefore={"Name"}
              placeholder="Name"
              name={"display_name"}
              value={display_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={
                touched.display_name && errors.display_name
                  ? "error"
                  : undefined
              }
            />
            <Input
              addonBefore={"Api Name"}
              placeholder="Api Name"
              name={"api_name"}
              value={api_name}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.api_name && errors.api_name ? "error" : undefined}
            />
            <Select
              value={active}
              onChange={handleSelectChange("active")}
              options={[
                { value: "true", label: "True" },
                { value: "false", label: "False" },
              ]}
            />
            <Select
              value={used_for_billing}
              onChange={handleSelectChange("used_for_billing")}
              options={[
                { value: "true", label: "True" },
                { value: "false", label: "False" },
              ]}
            />
            <Select
              value={type}
              onChange={handleSelectChange("type")}
              options={Object.values(MeterTypeEnum).map((value) => ({
                value,
                label: value,
              }))}
            />
            <ControlButtonsBlock>
              <Button
                onClick={() => handleSubmit()}
                type={"primary"}
                disabled={isEqual(initMeterFormValues, {
                  display_name,
                  api_name,
                  active,
                  type,
                  used_for_billing,
                })}
              >
                Update
              </Button>
              <Button
                onClick={() => resetForm({ values: initMeterFormValues })}
                type="primary"
                disabled={isEqual(initMeterFormValues, {
                  display_name,
                  api_name,
                  active,
                  type,
                  used_for_billing,
                })}
                danger
              >
                Reset
              </Button>
            </ControlButtonsBlock>
          </UpdateMeterForm>
        )}
      </MeterCard>
    </>
  );
};
