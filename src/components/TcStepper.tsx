import {
  Stepper,
  Step,
  StepLabel,
  StepperProps,
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { palette } from '../constants/MuiConfigs';

interface TcStepperProps extends StepperProps {
  labels: string[];
}

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor: palette.grey.main,
    borderRadius: 1,
  },
}));

const VerticalColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    marginTop: '-8px',
    marginBottom: '-8px',
    marginLeft: '8px',
    minHeight: 'calc(24px + 1.5rem)',
    borderLeftWidth: '6px',
    borderColor: palette.grey.main,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: palette.white.main,
  zIndex: 1,
  color: palette.secondary.main,
  fontWeight: 'bold',
  width: 50,
  height: 50,
  fontSize: '27px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
  ...(ownerState.active && {
    border: `solid 4px ${palette.primary.main}`,
  }),
  ...(ownerState.completed && {
    backgroundColor: palette.primary.main,
    color: palette.white.main,
  }),
}));

function ColorlibStepIcon({
  active,
  completed,
  className,
  icon,
}: StepIconProps) {
  const icons: { [index: string]: number } = {
    1: 1,
    2: 2,
    3: 3,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

function TcStepper({ labels, ...props }: TcStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stepper
      {...props}
      connector={
        isMobile ? <VerticalColorlibConnector /> : <ColorlibConnector />
      }
    >
      {labels &&
        labels.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
    </Stepper>
  );
}

export default TcStepper;
