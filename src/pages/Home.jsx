import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import FormOne from '../components/FormOne';
import FormTwo from '../components/FormTwo';
import FormThree from '../components/FormThree';

const steps = ['Form 1', 'Form 2', 'Form 3'];

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [validatedStep, setValidatedStep] = useState(-1);
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*\d{2})(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2}).{8,}$/;

    if (!emailRegex.test(formData.emailId)) {
      enqueueSnackbar('Invalid Email', { variant: 'error' });
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      enqueueSnackbar('Invalid Password', { variant: 'error' });
      return false;
    }

    if (activeStep >= 1) {
      const firstNameRegex = /^[a-zA-Z]{2,50}$/;
      const lastNameRegex = /^[a-zA-Z]*$/;
      const addressRegex = /^.{10,}$/;
      if (!firstNameRegex.test(formData.firstName)) {
        enqueueSnackbar('Invalid First Name', { variant: 'error' });
        return false;
      }

      if (!lastNameRegex.test(formData.lastName)) {
        enqueueSnackbar('Invalid Last Name', { variant: 'error' });
        return false;
      }

      if (!addressRegex.test(formData.address)) {
        enqueueSnackbar('Invalid Address', { variant: 'error' });
        return false;
      }
    }

    if (activeStep === 2) {
      const phoneNumberRegex = /^\d{10}$/;
      if (!formData.countryCode) {
        enqueueSnackbar('Select a country code', { variant: 'error' });
        return false;
      }

      if (!phoneNumberRegex.test(formData.phoneNumber)) {
        enqueueSnackbar('Invalid Phone Number', { variant: 'error' });
        return false;
      }

      if (!acceptTnC) {
        enqueueSnackbar('Accept Terms and Conditions', { variant: 'error' });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setValidatedStep(activeStep);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    if (validatedStep < step - 1) {
      enqueueSnackbar(`Form ${activeStep + 1} has not been validated`, {
        variant: 'error',
      });
    } else {
      setActiveStep(step);
    }
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <FormOne
            emailId={formData.emailId}
            password={formData.password}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 1:
        return (
          <FormTwo
            firstName={formData.firstName}
            lastName={formData.lastName}
            address={formData.address}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 2:
        return (
          <FormThree
            countryCode={formData.countryCode}
            phoneNumber={formData.phoneNumber}
            setFormData={setFormData}
            formData={formData}
            acceptTnC={acceptTnC}
            setAcceptTnC={setAcceptTnC}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/submit`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        navigate('/posts');
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    }
  };

  return (
    <div className="bg-light form-container d-flex flex-column justify-content-center align-items-center">
      <Container className="d-flex justify-content-center my-5">
        <div>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
      </Container>
      <div>{getStepContent(activeStep)}</div>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack} className="mx-2">
          Back
        </Button>
        {activeStep !== 2 ? (
          <Button onClick={handleNext} disabled={activeStep === steps.length - 1} className="mx-2">
            Save and Next
          </Button>
        ) : (
          <Button onClick={onSubmit} className="mx-2">
            Save All
          </Button>
        )}

        <Button className="mx-2">Save</Button>
      </div>
    </div>
  );
};

export default Home;
