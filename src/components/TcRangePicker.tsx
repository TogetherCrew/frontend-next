import { useState } from 'react';
import uuid from 'react-uuid';
import TcButton from './TcButton';

interface Option {
  value: number;
  label: string;
}

function TcRangePicker({ options }: { options: Option[] }) {
  const [selectedRange, setSelectedRange] = useState<Option>(options[0]);

  function handleOptionClick(option: Option) {
    setSelectedRange((prevSelectedRange) =>
      prevSelectedRange === option ? prevSelectedRange : option
    );
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
          key={`${uuid() + option.value}`}
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
