import React from 'react';
import ReactSelect from 'react-select';

const selectStyles = {
  control: () => {
    const border = '1px solid rgba(0, 0, 0, 0.1)';
    const borderRadius = '4px';

    const background = '#eee';
    const color = '#3e3939';

    const display = 'flex';

    const padding = '0 8px';

    return {
      border,
      color,
      background,
      borderRadius,
      display,
      padding,
    };
  },
  valueContainer: provided => {
    const padding = 'none';
    const fontFamily = "'Roboto', sans-serif";
    const fontSize = '14px';
    const color = '#3e3939';

    return { ...provided, padding, fontFamily, fontSize, color };
  },
  singleValue: provided => {
    const fontFamily = "'Roboto', sans-serif";
    const fontSize = '14px';
    const color = '#3e3939';

    return { ...provided, fontFamily, fontSize, color };
  },
  option: provided => {
    const fontFamily = "'Roboto', sans-serif";
    const fontSize = '14px';
    const color = '#3e3939';
    return { ...provided, fontFamily, fontSize, color };
  },
};

export default function InputSelect({ ...rest }) {
  return (
    <ReactSelect {...rest} placeholder="Selecione" styles={selectStyles} />
  );
}
