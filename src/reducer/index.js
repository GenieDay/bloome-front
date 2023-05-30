const initState = {
  userToken: "",
  userName: "",
  userId: "",
}

// ACTION
export const ADD_NUM = "ADD_NUM";

// REDUCER
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NUM:
      return {
        ...state,
        num: action.data,
      };
    default:
      return state;
  }
};

export default reducer;