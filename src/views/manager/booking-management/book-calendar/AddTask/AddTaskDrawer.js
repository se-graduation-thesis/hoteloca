import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from 'react';
import CustomerInfo from './components/customerInfo';
import ReservationInfo from './components/reservationInfo';
import ServiceInfo from './components/serviceInfo';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import * as actionCustomer from 'actions/customer.action';
import * as actionBillDetail from 'actions/bill-detail.action';
import * as actionBill from 'actions/bill.action';

const useStyles = makeStyles((theme) => ({
  drawerWrapper: {
    padding: "40px",
  },
}));

const steps = ['Thông tin khách hàng', 'Thông tin đặt phòng', 'Thông tin dịch vụ'];

function AddTaskDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

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

  // ===================================================================

  const [customer, setCustomer] = React.useState({
    ho: '',
    ten: '',
    cmnd: '',
    diaChi: '',
    dienThoai: '',
    email: '',
    quocTich: 'Việt Nam',
    soHoChieu: '',
    trangThai: 1,
    password: ''
  })

  const handleCustomer = (title, value) => {
    setCustomer({ ...customer, [title]: value });
  }

  const account = useSelector((state) => state.account.userAuth);

  const [reservation, setReservation] = React.useState({
    nhanVienid: JSON.parse(account).user_id,
    ngayLap: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
    ngayVao: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
    ngayRa: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
    tienCoc: '',
    trangThai: 1,
    yeuCau: '',
    khachHangid: null
  })

  const handleReservation = (title, value) => {
    setReservation({ ...reservation, [title]: value })
  }

  let params = location.href.split('/');
  let token = params[params.length - 1];

  const submit = () => {
    actionCustomer.addCustomer(customer).then((response) => {
      reservation.khachHangid = response.data.id;
      actionBill.addBill(reservation).then((resonpe) => {
        const billDetail = {
          phieuThueid: response.data.id,
          phongId: token
        }
        dispatch(actionBillDetail.addBillDetail(billDetail));
      })
    }).then();

    toggleDrawer(false)
    window.alert("Đặt phòng thành công")
  }


  const list = (anchor) => (
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
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography> */}
            <Button variant="contained" fullWidth sx={{ mt: 20 }} onClick={submit}>ADD</Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Đặt lại</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {activeStep === 0 ?
                <CustomerInfo customer={customer} handleCustomer={handleCustomer} /> :
                activeStep === 1 ?
                  <ReservationInfo reservation={reservation} handleReservation={handleReservation} /> :
                  <ServiceInfo token={token} />
              }
            </div>
            <div style={{ position: 'fixed', top: 650 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Quay lại
                </Button>
                <Box sx={{ flex: '1 1 auto', ml: 35 }} />
                <Button onClick={handleNext} sx={{ mr: 1 }} variant="outlined">
                  Tiếp theo
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Bước {activeStep + 1} đã hoàn thành
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete} variant="outlined">
                      {completedSteps() === totalSteps() - 1
                        ? 'Kết Thúc'
                        : 'Hoàn Thành Bước ' + (activeStep + 1)}
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
