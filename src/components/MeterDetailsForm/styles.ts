import styled from "styled-components";
import {Select} from "antd";

export const UpdateMeterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ControlButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;

export const SelectWithTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  
  & > * {
    flex-grow: 1;
  }
`;

export const DetailsSelect = styled(Select)`
  max-width: 300px;
`;