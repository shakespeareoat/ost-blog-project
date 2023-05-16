export const initialState = {
  blogs: [],
  formBlog: {
    title: "",
    content: "",
    published: false,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_DARFT_BLOG":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
