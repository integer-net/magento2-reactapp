
const initialState = {
  products: []
};

export default (
  state = initialState,
  { payload, type, error }
) => {
  switch (type) {
    default: {
      return state;
    }
  }
};