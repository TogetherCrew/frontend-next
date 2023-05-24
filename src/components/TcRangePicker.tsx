import { useState } from 'react';
import TcButton from './TcButton';

interface IOption {
  value: number;
  label: string;
}

interface ITcRangePickerProps {
  options: IOption[];
  updatePeriodRange: (rangeValue: number) => void;
}

function TcRangePicker({ options, updatePeriodRange }: ITcRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<IOption>(options[0]);

  function handleOptionClick(option: IOption) {
    setSelectedRange((prevSelectedRange) =>
      prevSelectedRange === option ? prevSelectedRange : option
    );

    updatePeriodRange(option.value); // Call the updatePeriodRange function to update the period range
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {options.map((option) => (
        <TcButton
          key={option.value}
          variant="contained"
          sx={{
            backgroundColor:
              selectedRange.value === option.value
                ? 'secondary.main'
                : 'grey.darken',
            color:
              selectedRange.value === option.value ? 'white' : 'secondary.main',
            padding: '0.4rem',
            borderRadius: '6px',
            marginRight: '0.5rem',
            marginBottom: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                selectedRange.value === option.value
                  ? 'secondary.main'
                  : 'grey.dark',
            },
          }}
          onClick={() => handleOptionClick(option)}
          label={option.label}
        />
      ))}
    </div>
  );
}

export default TcRangePicker;
