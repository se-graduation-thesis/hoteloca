import * as React from 'react';
import {
  styled, darken, alpha, lighten,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

export default function CalendarContent(props) {
  const dispatch = useDispatch();
  const appointmentList = useSelector(state => state.appointments);
  const [data, setData] = React.useState(appointments);


  return (
    <div>
      <Paper>abc</Paper>
    </div>
  );
}
