import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from 'react';
import CustomerInfo from './components/customerInfo';
import ReservationInfo from './components/reservationInfo';
import ServiceInfo from './components/serviceInfo';
import moment from "moment";
import moment_t from "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import * as actionCustomer from 'actions/customer.action';
import * as actionBillDetail from 'actions/bill-detail.action';
import * as actionBill from 'actions/bill.action';
import * as actionBillService from 'actions/bill-service.action';
import * as actionBillDetailService from 'actions/bill-service-detail.action';
import FinalView from './components/finalView';
import PositionedSnackbar from 'views/manager/hotel-management/components/PositionedSnackbar';

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
    props.handleStateForm(open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // console.log(">>>", props.stateForm);
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

  const [completeButton, setCompleteButton] = React.useState(false);

  const handleCompleteButton = value => setCompleteButton(value);


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
    quocTich: 'Viet Nam',
    soHoChieu: '',
    trangThai: 1,
    ngayThamGia: moment_t.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
    password: ''
  })

  const handleCustomer = (data) => {
    setCustomer(data);
  }

  const account = useSelector((state) => state.account.userAuth);

  const [reservation, setReservation] = React.useState({
    nhanVienid: isJson(account) ? JSON.parse(account).user_id : account.user_id,
    ngayLap: moment_t.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
    ngayVao: moment_t.tz(props.dateChoice, "Asia/Ho_Chi_Minh").format(),
    ngayRa: moment_t.tz(props.dateChoice, "Asia/Ho_Chi_Minh").format(),
    checkIn: null,
    tienCoc: 0,
    trangThai: 1,
    yeuCau: '',
    khachHangid: null
  })

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  React.useEffect(() => {
    setReservation({ ...reservation, ngayVao: moment_t.tz(props.dateChoice, "Asia/Ho_Chi_Minh").format(), ngayRa: moment_t.tz(props.dateChoice, "Asia/Ho_Chi_Minh").format() })
  }, [props.dateChoice])

  const handleReservation = (data) => {
    setReservation(data)
  }

  const [serviceSelect, setServiceSelect] = React.useState([]);

  const handleService = (services) => setServiceSelect(services);

  let params = location.href.split('/');
  let token = params[params.length - 1];

  const [snackbarState, setSnackbarState] = React.useState(false);


  const submit = () => {
    actionCustomer.addCustomer(customer).then((response) => {
      reservation.khachHangid = response.data.id;
      console.log(reservation)
      actionBill.addBill(reservation).then((response) => {
        const phieuThueid = response.data;
        const billDetail = {
          phieuThueid: phieuThueid.id,
          phongId: token,
          ngayVao: phieuThueid.ngayVao,
          ngayRa: phieuThueid.ngayRa,
          trangThai: 1
        }
        dispatch(actionBillDetail.addBillDetail(billDetail));

        if (serviceSelect.length) {
          const billService = {
            ngayLap: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            tongTien: 0,
            ghiChu: "",
            phieuThueid: phieuThueid
          }
          console.log(billService)
          actionBillService.add_bill_service(billService).then((response) => {
            serviceSelect.map((item) => {
              dispatch(actionBillDetailService.add_bill_service_detail({
                dichVuid: item.id,
                hoaDonDichVuid: response.data.id,
                soLuong: item.soLuong
              }))
            })
          })
        }
      })
    }).then();
    setSnackbarState(true);
    setTimeout(function () {
      setSnackbarState(false);
    }, 3000);
    toggleDrawer(false)
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
            <FinalView customer={customer} reservation={reservation} token={token} serviceSelect={serviceSelect} />
            <Button variant="contained" sx={{ ml: 2, width: 610 }} onClick={submit}>LẬP PHIẾU THUÊ</Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Đặt lại</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {activeStep === 0 ?
                <CustomerInfo customer={customer}
                  handleCustomer={handleCustomer}
                  complete={completeButton}
                  handleCompleteButton={handleCompleteButton}
                  handleComplete={handleComplete}
                  completed={completed} /> :
                activeStep === 1 ?
                  <ReservationInfo reservation={reservation}
                    handleReservation={handleReservation}
                    token={token}
                    complete={completeButton}
                    handleCompleteButton={handleCompleteButton}
                    handleComplete={handleComplete}
                    completed={completed} /> :
                  <ServiceInfo token={token}
                    updateService={handleService}
                    complete={completeButton}
                    handleCompleteButton={handleCompleteButton}
                    handleComplete={handleComplete} />
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
                    <Button onClick={() => handleCompleteButton(true)} variant="outlined">
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

      <div>
        <PositionedSnackbar open={snackbarState} message={"Thêm Thành Công."} />
      </div>
    </>
  );
}

export default AddTaskDrawer;
