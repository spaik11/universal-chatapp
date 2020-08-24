import {
  SET_NAME,
  SET_ROOM,
  SET_LANGUAGE,
} from "../Redux-constants/joinConstants";

const initialState = {
  name: null,
  room: null,
  lang: "en",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
}
