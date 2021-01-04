export const initialState = {
  user: {
    name: null,
    email: null,
    role: null,
    token: null,
  },
  auth: true,
  position: { lat: 2, lng: 2 },
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        auth: true,
      };
    case "SET_POSITION":
      console.log("I'm in the reducer", action.position);
      return {
        ...state,
        position: action.position,
      };
    default:
      return state;
  }
};

export default reducer;
