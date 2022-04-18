import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import EditTaskForm from "./EditTaskForm";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  drawerWrapper: {
    padding: "40px",
  },
}));

function EditTaskDrawer({ task, isOpenDrawer, changeOpenDrawer, onDelete }) {
  //   const [isOpen, setIsOpen] = React.useState(true);
  //   const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    changeOpenDrawer(open);
  };

  const handleDelete = () => {
    toggleDrawer(false);
    onDelete();
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 380, padding: "20px 30px 30px 30px" }}
      role="presentation"
    >
      <Box
        component="div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <DeleteIcon className="delete-icon" onClick={handleDelete}/>
        <i
          style={{
            content: "",
            width: "0px",
            height: "28px",
            borderLeft: "1px solid #D5DAD5",
            margin: "0 14px 0 16px",
          }}
        ></i>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={toggleDrawer(false)}
        />
      </Box>

      <EditTaskForm task={task} changeOpenDrawer={changeOpenDrawer} />
    </Box>
  );

  return (
    <>
      <Drawer anchor="left" open={isOpenDrawer} onClose={toggleDrawer(false)}>
        {list("left")}
      </Drawer>
    </>
  );
}

export default EditTaskDrawer;
