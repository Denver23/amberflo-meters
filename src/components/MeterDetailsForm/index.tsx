import { Button, Input, message, Select } from "antd";
import { IMeterForm, MeterTypeEnum } from "../../utils/types";
import { isEqual } from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import { metersAPI } from "../../utils/api";
import { convertMeterToFormValues, getErrorMessage } from "../../utils/helpers";
import { meterFormValidator } from "../../utils/validators";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { IMeterDetailsForm } from "./props";
import {
  ControlButtonsBlock, DetailsSelect,
  SelectWithTitle,
  UpdateMeterForm,
} from "./styles";

export const MeterDetailsForm: FC<IMeterDetailsForm> = ({
  meter,
  setLoading,
  updateMeter,
}) => {
  const initMeterFormValues: IMeterForm = useMemo(() => {
    return convertMeterToFormValues(meter);
  }, [meter]);

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
        setLoading(true);
        if (!meter) throw new Error("Meter not found");
        const { data } = await metersAPI.updateMeter(meter.id, {
          active: Boolean(active),
          used_for_billing: Boolean(used_for_billing),
          display_name,
          api_name,
          type,
        });
        updateMeter(meter.id, data);
        message.success("Meter was successfully added.");
      } catch (err: unknown) {
        message.error(getErrorMessage(err));
      } finally {
        setLoading(false);
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

  return (
    <UpdateMeterForm onSubmit={handleSubmit}>
      <Input
        addonBefore={"Name"}
        placeholder="Name"
        name={"display_name"}
        value={display_name}
        onChange={handleChange}
        onBlur={handleBlur}
        status={
          touched.display_name && errors.display_name ? "error" : undefined
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
      <SelectWithTitle>
        Active:
        <DetailsSelect
          placeholder={"Active"}
          value={active}
          onChange={handleSelectChange("active")}
          options={[
            { value: 1, label: "True" },
            { value: 0, label: "False" },
          ]}
        />
      </SelectWithTitle>
      <SelectWithTitle>
        Used for billing:
        <DetailsSelect
          placeholder={"Used for billing"}
          value={used_for_billing}
          onChange={handleSelectChange("used_for_billing")}
          options={[
            { value: 1, label: "True" },
            { value: 0, label: "False" },
          ]}
        />
      </SelectWithTitle>
      <SelectWithTitle>
        Type:
        <DetailsSelect
          placeholder={"Type"}
          value={type}
          onChange={handleSelectChange("type")}
          options={Object.values(MeterTypeEnum).map((value) => ({
            value,
            label: value,
          }))}
        />
      </SelectWithTitle>
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
  );
};
