import * as React from 'react';
import {
  styled, darken, alpha, lighten,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
  CurrentTimeIndicator,
  TodayButton,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from './task';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const PREFIX = 'Demo';

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
};

const getBorder = theme => (`1px solid ${theme.palette.mode === 'light'
  ? lighten(alpha(theme.palette.divider, 1), 0.88)
  : darken(alpha(theme.palette.divider, 1), 0.68)
  }`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-of-type': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: '#FFFDE7',
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: '#ECEFF1',
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: '#E1F5FE',
  },
  [`&.${classes.opacity}`]: {
    opacity: '0.5',
  },
}));

const StyledDivContent = styled('div')(() => ({
  [`&.${classes.content}`]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
}));

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    flex: 'none',
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));
const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
  [`&.${classes.apptContent}`]: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
}));

const appointmentStyle = {
  backgroundColor: 'Khaki',
  marginRight: 5,
  marginBottom: 5,
  width: '100%',
  padding: "2px 2px 2px 5px",
  borderRadius: 8
}

const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    startDate: new Date(2022, 2, 9, 9, 30),
    endDate: new Date(2022, 2, 9, 11, 30),
    ownerId: 1,
  }, {
    id: 1,
    title: 'Monthly Planning',
    startDate: new Date(2022, 2, 28, 9, 30),
    endDate: new Date(2022, 2, 28, 11, 30),
    ownerId: 1,
  }, {
    id: 2,
    title: 'Recruiting students',
    startDate: new Date(2022, 2, 22, 12, 0),
    endDate: new Date(2022, 2, 22, 13, 0),
    ownerId: 2,
  }, {
    id: 3,
    title: 'Oil Painting',
    startDate: new Date(2022, 2, 22, 14, 30),
    endDate: new Date(2022, 2, 22, 15, 30),
    ownerId: 2,
  }, {
    id: 4,
    title: 'Open Day',
    startDate: new Date(2022, 2, 20, 12, 0),
    endDate: new Date(2022, 2, 20, 13, 35),
    ownerId: 6,
  }, {
    id: 5,
    title: 'Watercolor Landscape',
    startDate: new Date(2022, 2, 6, 13, 0),
    endDate: new Date(2022, 2, 6, 14, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20220816',
    exDate: '20220713T100000Z,20220727T100000Z',
    ownerId: 2,
  }, {
    id: 6,
    title: 'Meeting of Instructors',
    startDate: new Date(2022, 2, 28, 12, 0),
    endDate: new Date(2022, 2, 28, 12, 30),
    rRule: 'FREQ=WEEKLY;BYDAY=TH;UNTIL=20220727',
    exDate: '20220705T090000Z,20220719T090000Z',
    ownerId: 5,
  }, {
    id: 7,
    title: 'Oil Painting for Beginners',
    startDate: new Date(2022, 2, 3, 11, 0),
    endDate: new Date(2022, 2, 4, 12, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=TU;UNTIL=20220801',
    exDate: '20220710T080000Z,20220724T080000Z',
    ownerId: 3,
  }, {
    id: 8,
    title: 'Watercolor Workshop',
    startDate: new Date(2022, 2, 22, 13, 30),
    endDate: new Date(2022, 2, 22, 14, 20),
    ownerId: 3,
  },
];

const resources = [{
  fieldName: 'ownerId',
  title: 'Owners',
  instances: owners,
}];

const StyledDivText = styled('div')(() => ({
  [`&.${classes.text}`]: {
    padding: '0.5em',
    // textAlign: 'center',
  },
}));

const CellBase = React.memo(({
  startDate,
  formatDate,
  onSubmit,
  handleAppointmentData,
  data
}) => {
  const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
  const isFirstMonthDay = startDate.getDate() === 1;
  const currentDate = new Date();
  const dateActive = currentDate.getDate() === startDate.getDate() && currentDate.getMonth() === startDate.getMonth() ? true : false;
  const formatOptions = isFirstMonthDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };
  const rs = data.filter(item => moment(item.startDate).format("YYYY-MM-DD") <= moment(startDate).format("YYYY-MM-DD") && moment(item.endDate).format("YYYY-MM-DD") >= moment(startDate).format("YYYY-MM-DD"))
  const appItem = {
    startDate,
    endDate: startDate,
    title: '',
    allDay: null,
  };
  const handleSubmit = (e) => {
    onSubmit();
    handleAppointmentData(e)
    console.log(e);
  }
  return (
    <StyledTableCell
      onDoubleClick={() => handleSubmit(appItem)}
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
      })}
    >
      <StyledDivText className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </StyledDivText>
    </StyledTableCell>
  );
});


const Appointment = (({ ...restProps }) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = (({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = (({ ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
    </div>
  </StyledToolbarFlexibleSpace>
));

export default function CalendarContent(props) {
  const dispatch = useDispatch();
  const appointmentList = useSelector(state => state.appointments);
  const [data, setData] = React.useState(appointments);
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
      console.log('added  > ', added);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      console.log('changed  > ', changed);
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
      console.log('deleted  > ', deleted);
    }

  }
  const date = new Date();

  const [formState, setFormState] = React.useState(false);
  const [appointmentData, setAppointmentData] = React.useState({
    startDate: null,
    endDate: null,
    title: '',
    allDay: null,
    id: ''
  });

  const handleFormState = () => setFormState(!formState);

  const handleAppointmentData = (item) => setAppointmentData({
    ...appointmentData,
    startDate: item.startDate,
    endDate: item.endDate,
    title: item.title,
    allDay: item.allDay
  });

  return (
    <Paper>
      <Scheduler
        data={data}
        height={700}
      >
        {/* Controls the editing state */}
        <EditingState
          onCommitChanges={commitChanges}
        />

        {/* Manages the current view's state */}
        <ViewState
          defaultCurrentDate={date}
        />

        {/* Renders Scheduler data for a month */}
        <MonthView
          onSubmit={handleFormState}
          timeTableCellComponent={(props) =>
            <CellBase
              onSubmit={handleFormState}
              handleAppointmentData={handleAppointmentData}
              data={data}
              {...props}
            />}
          dayScaleCellComponent={DayScaleCell}
        />

        {/* Renders the Scheduler's week view */}
        <WeekView
          startDayHour={8}
          endDayHour={18}
        />

        {/* Renders Scheduler data for a day */}
        <DayView
          startDayHour={9}
          endDayHour={18}
        />

        {/* Renders appointments */}
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />

        {/* Allows to assign appointments to difference resources */}
        <Resources
          data={resources}
        />

        {/* Renders the Toolbar */}
        <Toolbar
          flexibleSpaceComponent={FlexibleSpace}
        />

        {/* allows a user to switch between views at runtime. */}
        <ViewSwitcher />

        {/* Renders the Scheduler's button that is used to navigate to the today's date */}
        <TodayButton />

        {/* Renders Scheduler's date navigator */}
        <DateNavigator />

        {/* Implements editing in the Scheduler */}
        <EditRecurrenceMenu />

        {/* Display information about the appointment and contains buttons that manage the appointment */}
        <AppointmentTooltip
          showCloseButton
          showDeleteButton
          showOpenButton
        />

        {/* Render a form that visualizes appointment's data and allows a user to modify this data */}
        <AppointmentForm
          visible={formState}
          onVisibilityChange={handleFormState}
          appointmentData={appointmentData}
          onAppointmentDataChange={commitChanges}
        />

        {/* Enables users to edit appointments via drag and drop */}
        <DragDropProvider />

        {/* Display a current time indicator and shade appointments and cell up to the current time */}
        {/* Cái timeline nè anh */}
        <CurrentTimeIndicator
          shadePreviousCells={true}
          shadePreviousAppointments={true}
          updateInterval={10000}
        />
      </Scheduler>
    </Paper>
  );
}
