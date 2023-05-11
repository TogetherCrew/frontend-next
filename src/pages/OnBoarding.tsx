import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BoxContainer from '../components/BoxContainer';
import TcStepper from '../components/TcStepper';
import StepOne from '../components/pages/onBoarding/StepOne';
import LoginToDashboard from '../components/pages/onBoarding/LoginToDashboard';
import StepTwo from '../components/pages/onBoarding/StepTwo';
import { ReactComponent as TcLogo } from '../assets/icons/togethercrew-logo.svg';
import StepThree from '../components/pages/onBoarding/StepThree';

function OnBoarding() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  function redirectToDashboard() {
    navigate('/community-insights');
  }

  const labels = [
    'Connect your Discord community',
    'Select time period and channels you want to be analysed',
    'Begin data import',
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -85%)',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <a href="https://togethercrew.com/">
          <TcLogo />
        </a>
      </div>
      <BoxContainer
        width="700px"
        height={
          activeStep === -1 || activeStep === 0
            ? '570px'
            : activeStep === 1
            ? '620px'
            : '500px'
        }
      >
        <>
          {activeStep === -1 || activeStep === 0 ? (
            <Box bgcolor={theme.palette.primary.main} sx={{ padding: '2rem' }}>
              <Typography
                variant="h4"
                color="white.main"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Welcome to Together Crew
              </Typography>
              <Typography
                variant="body1"
                color="white.main"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingTop: '0.5rem',
                }}
              >
                Let’s connect your community.
              </Typography>
            </Box>
          ) : (
            ''
          )}
          <Box
            sx={{
              paddingX: '2rem',
            }}
          >
            <TcStepper
              activeStep={activeStep}
              labels={
                activeStep === -1 || activeStep === 0 ? labels : ['', '', '']
              }
              alternativeLabel
              sx={{
                width: activeStep === -1 || activeStep === 0 ? 'auto' : '26rem',
                paddingTop:
                  activeStep === -1 || activeStep === 0 ? '3.5rem' : '3rem',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </Box>
          {activeStep === -1 || activeStep === 0 ? (
            <StepOne
              isChecked={isChecked}
              handleCheckboxChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(e)
              }
            />
          ) : activeStep === 1 ? (
            <StepTwo goNext={(nextStep) => setActiveStep(nextStep)} />
          ) : (
            <StepThree goNext={() => redirectToDashboard()} />
          )}
        </>
      </BoxContainer>
      {activeStep === -1 || activeStep === 0 ? (
        <Box marginTop="1rem">
          <LoginToDashboard />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}

export default OnBoarding;
