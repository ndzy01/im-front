const SET_USERNAME = 'SET_USERNAME';

export interface User {
  user: string;
}

interface SetUserName {
  type: typeof SET_USERNAME;
  payload: string | number;
}

const initState: User = { user: '' };

export function User(state = initState, action: SetUserName) {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function setUserName(user: string | number) {
  return {
    type: SET_USERNAME,
    payload: user,
  };
}
