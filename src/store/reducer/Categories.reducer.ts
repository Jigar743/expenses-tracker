const initialState = {
  categories: [],
};

const categoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    default:
      return state;
  }
};

export default categoriesReducer;
