import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { editTaskToLocalStorage } from 'actions/localStorage';
import { editTask } from "reducers/booking.reducer";
import InputAreaField from "../form-controls/InputAreaField";
import InputField from "../form-controls/InputField";
import SelectField from "../form-controls/SelectField";
import TimeField from "../form-controls/TimeField";

const priorityList = [
  { value: 0, label: "High" },
  { value: 1, label: "Medium" },
  { value: 2, label: "Low" },
];

const statusList = [
  { value: 0, label: "New" },
  { value: 1, label: "Doing" },
  { value: 2, label: "Done" },
  { value: 3, label: "Closed" },
];

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function EditTaskForm({ task, changeOpenDrawer }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    taskName: yup.string().required("Please enter task name!"),
  });


  console.log(task.startTime);
  const form = useForm({
    defaultValues: {
      taskName: task.taskName,
      startTime: task.startTime.format("YYYY-MM-DDTHH:mm:ss"),
      endTime: task.endTime.format("YYYY-MM-DDTHH:mm:ss"),
      description: task.description,
      priority: task.priority,
      status: task.status,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {

    changeOpenDrawer(false);
    const id = task.id;
    const editedTask = {
      ...values,
      startTime: moment(values.startTime),
      endTime: moment(values.endTime),
      id
    }
    const action = editTask({ id, editedTask });
    dispatch(action);
    editTaskToLocalStorage(id, editedTask);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="taskName" label="Name" form={form} />
        <TimeField name="startTime" label="Start Time" form={form} />
        <TimeField name="endTime" label="End Time" form={form} />
        <InputAreaField name="description" label="Description" form={form} />
        <SelectField
          name="priority"
          label="Priority"
          options={priorityList}
          form={form}
        />
        <SelectField
          name="status"
          label="Status"
          options={statusList}
          form={form}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditTaskForm;
