import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { dateRangeOptions } from '../lib/data/date';
import { borderRadius } from '../constants/MuiConfigs';
import SvgIcon from './SvgIcon';

interface IPeriodOption {
  label: string;
  value: number;
}

interface ITcPeriodPicker {
  periodOptions?: IPeriodOption[];
}

function TcPeriodPicker({ periodOptions }: ITcPeriodPicker) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box>
      <Box sx={{ width: 'fit-content' }}>
        <Stack
          px={1}
          py={0.5}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            background: '#EDEDED',
            borderRadius: borderRadius.xs,
          }}
        >
          <SvgIcon iconName="icon-calendar" />
          {periodOptions &&
            periodOptions.map((option: IPeriodOption, index: number) => (
              <Typography
                key={index}
                mr={0.5}
                px={1}
                sx={{
                  cursor: 'pointer',
                  background: activeIndex === index ? 'white' : 'inherit',
                  borderRadius: borderRadius.xs,
                  ':hover': {
                    background: '#f8f8f8',
                  },
                }}
                onClick={() => handleItemClick(index)}
              >
                {option.label}
              </Typography>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}

TcPeriodPicker.defaultProps = {
  periodOptions: dateRangeOptions,
};
export default TcPeriodPicker;
