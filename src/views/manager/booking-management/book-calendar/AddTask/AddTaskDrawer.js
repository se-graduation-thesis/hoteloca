import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import AddTaskForm from "./AddTaskForm";

const useStyles = makeStyles((theme) => ({
  drawerWrapper: {
    padding: "40px",
  },
}));

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

  const list = (anchor) => (
    <Box
      sx={{ width: 700, padding: '20px 30px 30px 30px' }}
      role="presentation"
    >
      {/* <IconButton style={{ float: 'right', marginBottom: '20px', cursor: 'pointer' }}
        onClick={toggleDrawer(false)}>
        <CloseIcon />
      </IconButton> */}
      <AddTaskForm handleStateForm={props.handleStateForm} dateChoice={props.dateChoice} />
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
