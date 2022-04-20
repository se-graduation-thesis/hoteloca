import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import * as yup from "yup";
import { addNewTask } from 'reducers/booking.reducer';
import InputAreaField from "../form-controls/InputAreaField";
import InputField from "../form-controls/InputField";
import SelectField from "../form-controls/SelectField";
import TimeField from "../form-controls/TimeField";
import { addTaskToLocalStorage } from 'actions/localStorage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import "./AddTask.scss";
const priorityList = [
  { value: 0, label: 'High' },
  { value: 1, label: 'Medium' },
  { value: 2, label: 'Low' },
];

const statusList = [
  { value: 0, label: 'New' },
  { value: 1, label: 'Doing' },
  { value: 2, label: 'Done' },
  { value: 3, label: 'Closed' },
]

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function AddTaskForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Wifi', color: "primary" },
    { key: 1, label: 'Dọn phòng', color: "secondary" },
    { key: 2, label: 'Hồ bơi', color: "info" },
    { key: 3, label: 'Massage', color: "error" },
    { key: 4, label: 'Xông hơi', color: "success" },
  ]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    taskName: yup.string().required("Please enter task name!"),
  });

  const form = useForm({
    defaultValues: {
      taskName: "",
      startTime: moment(props.dateChoice).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(props.dateChoice).format('YYYY-MM-DDT00:00:00'),
      description: "",
      priority: 0,
      status: 0
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log("Submit Data: ", values);
    console.log("Submit Start Time: ", moment(values.startTime).format("YYYY-MM-DD"));
    console.log(uuid());
    const newTask = {
      ...values,
      id: uuid(),
      startTime: moment(values.startTime),
      endTime: moment(values.endTime)
    }
    console.log('NEW TASK: ', newTask);
    dispatch(addNewTask(newTask));
    addTaskToLocalStorage(newTask);
    form.reset();
    props.handleStateForm(false);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className="detail">Thông tin đặt phòng</Typography>
          </Grid>
          <Grid item xs={6}>
            <InputField name="soDienThoai" label="Số điện thoại" form={form} />
            <InputField name="hoTen" label="Họ tên" form={form} />
            <TimeField name="startTime" label="Ngày đến" form={form} />
          </Grid>
          <Grid item xs={6}>
            <InputField name="email" label="Email" form={form} />
            <InputField name="hoTen" label="Số CMND" form={form} />
            <TimeField name="endTime" label="Ngày đi" form={form} />
          </Grid>
          <Grid item xs={12} >
            <Typography className="detail">Dịch vụ sử dụng</Typography>
            <p>Các dịch vụ đang có sẵn tại phòng</p>
            {
              chipData.map((e) => (
                <Chip style={{ margin: 5 }} color={e.color} label={e.label} />
              ))
            }
            <br></br>
            <div className="div-add">
              <span className="div-lable-span">Thêm các dịch vụ mới</span>
              <IconButton aria-label="delete" color="secondary" onClick={handleClickOpen}>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Add
        </Button>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTaskForm;
