import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddTaskForm from "./AddTaskForm";
import * as React from 'react';
import CustomerInfo from './components/customerInfo';
import ReservationInfo from './components/reservationInfo';

const useStyles = makeStyles((theme) => ({
  drawerWrapper: {
    padding: "40px",
  },
}));

const steps = ['Thông tin khách hàng', 'Thông tin đặt phòng', 'Thông tin dịch vụ'];

function AddTaskDrawer(props) {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // console.log(">>>", props.stateForm);
    props.handleStateForm(open);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const list = (anchor) => (
    // <Box
    //   sx={{ width: 700, padding: '20px 30px 30px 30px' }}
    //   role="presentation"
    // >
    //   {/* <IconButton style={{ float: 'right', marginBottom: '20px', cursor: 'pointer' }}
    //     onClick={toggleDrawer(false)}>
    //     <CloseIcon />
    //   </IconButton> */}
    //   <AddTaskForm handleStateForm={props.handleStateForm} dateChoice={props.dateChoice} />
    // </Box>
    <Box sx={{ width: 700, padding: '20px 30px 30px 30px' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Đặt lại</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {activeStep === 0 ?
                <CustomerInfo /> :
                activeStep === 1 ?
                  <ReservationInfo /> :
                  <></>
              }
            </div>
            <div style={{ position: 'fixed', bottom: 100 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto', ml: 40 }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Bước {activeStep + 1} đã hoàn thành
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Kết Thúc'
                        : 'Hoàn Thành Bước'}
                    </Button>
                  ))}
              </Box>
            </div>
          </React.Fragment>
        )}
      </div>
    </Box>
  );

  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>Add Task</Button> */}
      <Drawer anchor="left" open={props.stateForm} onClose={toggleDrawer(false)}>
        {list("left")}
      </Drawer>
    </>
  );
}

export default AddTaskDrawer;
