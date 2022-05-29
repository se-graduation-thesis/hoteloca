import MainScreen from "./components/MainScreen/MainScreen.component";
import firebase, { db, userName } from "views/pages/authentication/auth-forms/firebase";
import { useEffect, useState } from "react";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "actions/actioncreator";
import { connect } from "react-redux";
import Paper from '@mui/material/Paper';
function App(props) {

  const urlparams = new URLSearchParams(window.location.search);
  const roomId = urlparams.get("id");

  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  const connectedRef = db.database().ref(".info/connected");
  const participantRef = firebase.database().ref().child(roomId)

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;
  useEffect(() => {
    async function fetch() {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);
      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            preferences: defaultPreference,
          });
          props.setUser({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          });
          userStatusRef.onDisconnect().remove();
        }
      });
    }
    fetch()
  }, []);



  useEffect(() => {
    if (isStreamSet && isUserSet) {
      participantRef.on("child_added", (snap) => {
        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child("preferences");
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div className="App">
      <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
        <MainScreen />
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.meet.mainStream,
    user: state.meet.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
