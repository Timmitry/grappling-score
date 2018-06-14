const fightersHasErroredType = 'FIGHTERS_HAS_ERRORED';
const fightersIsLoadingType = 'FIGHTERS_IS_LOADING';
const fightersFetchDataSuccessType = 'FIGHTERS_FETCH_DATA_SUCCESS';

const initialState = {
  fighters: [],
  isLoading: true,
  error: null,
};

const fightersHasErrored = error => ({
  type: fightersHasErroredType,
  payload: { error },
});

const fightersIsLoading = isLoading => ({
  type: fightersIsLoadingType,
  payload: { isLoading }
});

const fightersFetchDataSuccess = fighters => ({
  type: fightersFetchDataSuccessType,
  payload: { fighters }
});

export const actionCreators = {
  fetchData: url => (
    async (dispatch) => {
      dispatch(fightersIsLoading(true));

      try {
        const response = await fetch(url);
        if (!response.ok) { throw Error(response.statusText); }
        dispatch(fightersIsLoading(false));
        dispatch(fightersFetchDataSuccess(await response.json()));
      } catch(error) {
        dispatch(fightersHasErrored);
      }
    }
  ),
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case fightersFetchDataSuccessType:
      return { ...state, fighters: action.payload.fighters };
    case fightersHasErroredType:
      return { ...state, error: action.payload.error };
    case fightersIsLoadingType:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
}
