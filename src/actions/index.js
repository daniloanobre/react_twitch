import streams from "../apis/streams";
import * as actionTypes from "./actionTypes";
import history from "../history";

export const signIn = userId => {
  return {
    type: actionTypes.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.post("/streams", {
    ...formValues,
    userId: userId
  });

  dispatch({ type: "CREATE_STREAM", payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: actionTypes.FETCH_STREAMS, payload: response.data });
};

export const fetchStream = streamId => async dispatch => {
  const response = await streams.get(`/streams/${streamId}`);

  dispatch({ type: actionTypes.FETCH_STREAM, payload: response.data });
};

export const editStream = (streamId, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${streamId}`, formValues);
  dispatch({ type: actionTypes.EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = streamId => async dispatch => {
  await streams.delete(`/streams/${streamId}`);
  history.push("/");

  dispatch({ type: actionTypes.DELETE_STREAM, payload: streamId });
};
