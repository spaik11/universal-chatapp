import {
  SET_NAME,
  SET_ROOM,
  SET_LANGUAGE,
} from "../Redux-constants/joinConstants";

export const set_Name = (name) => (dispatch) => {
  dispatch({
    type: SET_NAME,
    payload: name,
  });
};
export const set_Room = (room) => (dispatch) => {
  dispatch({
    type: SET_ROOM,
    payload: room,
  });
};
export const set_Language = (language) => (dispatch) => {
  dispatch({
    type: SET_LANGUAGE,
    payload: language,
  });
};
