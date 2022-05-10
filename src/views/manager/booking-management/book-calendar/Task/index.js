import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StarIcon from "@mui/icons-material/Star";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Divider, Fab, FormControlLabel, Popover, Slider, Switch, Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskFromLocalStorage, editTaskToLocalStorage } from 'actions/localStorage';
import { deleteTask, editTask } from "reducers/booking.reducer";
import EditTaskDrawer from "../EditTask/EditTaskDrawer";
import "./Task.scss";

const useStyles = makeStyles((theme) => ({
  popoverWrapper: {
    padding: "12px",
    width: "400px",
  },
}));

// const priorityMapping = ["High", "Medium", "Low"];
const sliderMarks = [
  {
    value: 0,
    label: "New",
  },
  {
    value: 1,
    label: "Doing",
  },
  {
    value: 2,
    label: "Done",
  },
];

function Icon({ trangThai, fontSizeValue }) {
  const className = classNames({
    icon: true,
    "icon-done": trangThai === 1,
    "icon-doing": trangThai === 2,
    "icon-new": trangThai === 0,
    "icon-closed": trangThai === 3,
  });
  if (trangThai === 2)
    return (
      <CheckCircleIcon
        className={className}
        style={{ fontSize: fontSizeValue ? fontSizeValue : null }}
      />
    );
  if (trangThai === 1)
    return (
      <TimelapseIcon
        className={className}
        style={{ fontSize: fontSizeValue ? fontSizeValue : null }}
      />
    );
  if (trangThai === 0)
    return (
      <RadioButtonUncheckedIcon
        className={className}
        style={{ fontSize: fontSizeValue ? fontSizeValue : null }}
      />
    );
  if (trangThai === 3)
    return (
      <BlockIcon
        className={className}
        style={{ fontSize: fontSizeValue ? fontSizeValue : null }}
      />
    );
}

function sliderLabel(value) {
  const trangThaiMapping = ["New", "Medium", "Low"];
  return trangThaiMapping[value];
}

function Task({ task }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handleChangeOpenDrawer = (value) => {
    setIsOpenDrawer(value);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteTask = () => {
    const action = deleteTask(task.id);
    dispatch(action);
    deleteTaskFromLocalStorage(task.id);
  };

  const handleClickDelete = () => {
    handleClose();
    handleClickOpenDialog();
  };

  const handleClickEdit = () => {
    handleClose();
    setIsOpenDrawer(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSlider = (event, newValue) => {
    console.log('Slider >>>>>', newValue);
    const editedTask = {
      ...task,
      trangThai: newValue
    }
    dispatch(editTask({ id: task.id, editedTask }));
    editTaskToLocalStorage(task.id, editedTask);
  };

  const handleChangeSwitch = (event) => {
    console.log('>>>>>>', event.target.checked);
    const checked = event.target.checked;
    const editedTask = {
      ...task,
      trangThai: checked ? 3 : 0
    }
    dispatch(editTask({ id: task.id, editedTask }));
    editTaskToLocalStorage(task.id, editedTask);
    console.log({ id: task.id, editedTask });
  };

  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   console.log('Task: re-render');
  //   console.log('Anchor: ', anchorEl);
  // })

  return (
    <div className="task">
      <Icon trangThai={task.trangThai} />
      <div
        className={classNames({
          "task-name": true,
          "task-name--done": task.trangThai === 1,
          "task-name--doing": task.trangThai === 2,
          "task-name--new": task.trangThai === 0,
          "task-name--closed": task.trangThai === 3,
        })}
        onClick={handleClick}
      >
        {task.phieuThueid.khachHangid.ho} {task.phieuThueid.khachHangid.ten}
      </div>
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box component="div" className={classes.popoverWrapper}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Box component="div" className="edit-icon">
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  onClick={handleClickEdit}
                >
                  <EditIcon />
                </Fab>
              </Box>
              <DeleteIcon className="delete-icon" onClick={handleClickDelete} />
              <i
                style={{
                  content: "",
                  width: "0px",
                  height: "28px",
                  borderLeft: "1px solid #D5DAD5",
                  margin: "0 14px 0 16px",
                }}
              ></i>
              <CloseIcon onClick={handleClose} className="close-icon" />
            </Box>
          </Box>
          <Box component="div">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "default !important",
              }}
              className="task"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Icon trangThai={task.trangThai} fontSizeValue="26px" />
                <Typography
                  sx={{
                    color: "gray",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginLeft: "6px",
                  }}
                >
                  {task.phieuThueid.khachHangid.ho} {task.phieuThueid.khachHangid.ten}
                </Typography>
              </Box>
            </Box>

            <Box
              component="div"
              sx={{ fontSize: "14px", marginLeft: "37px !important" }}
            >
              {moment(task.startTime).format("dddd, MMMM DD YYYY")}
            </Box>

            <Box
              sx={{ display: "flex", marginTop: "12px", alignItems: "center" }}
            >
              <AccessTimeIcon style={{ fontSize: "18px" }} />
              <Typography sx={{ marginLeft: "18px" }}>
                {moment(task.startTime).format("LTS")} -{" "}
                {moment(task.endTime).format("LTS")}
              </Typography>
            </Box>

            {task.trangThai !== 3 && (
              <Box component="div" className="trangThai-slider">
                <Slider
                  // aria-label="Temperature"
                  size="small"
                  defaultValue={task.trangThai}
                  marks={sliderMarks}
                  // getAriaValueText={sliderLabel}
                  // valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={2}
                  onChange={handleChangeSlider}
                  // color="secondary"
                  className={classNames({
                    'trangThai-slider--new': task.trangThai === 0,
                    'trangThai-slider--doing': task.trangThai === 2,
                    'trangThai-slider--done': task.trangThai === 1,
                  })}
                />
              </Box>
            )}

            <Box component="div">
              <FormControlLabel
                control={
                  <Switch
                    checked={task.trangThai === 3}
                    onChange={handleChangeSwitch}
                    name="gilad"
                  />
                }
                label="Task Closed"
              />
            </Box>

            <Divider style={{ margin: "10px 0" }} />
            <Typography style={{ fontSize: "14px" }}>
              {task.description}
            </Typography>
          </Box>
        </Box>
      </Popover>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete a task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteTask} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <EditTaskDrawer
        task={task}
        isOpenDrawer={isOpenDrawer}
        changeOpenDrawer={handleChangeOpenDrawer}
        onDelete={handleClickDelete}
      />
    </div>
  );
}

export default Task;
