const hasErroredType = 'MATCHES_HAS_ERRORED';
const isLoadingType = 'MATCHES_IS_LOADING';
const fetchDataSuccessType = 'MATCHES_FETCH_DATA_SUCCESS';

const initialState = {
  matches: [],
  isLoading: true,
  error: null,
};

const hasErrored = error => ({
  type: hasErroredType,
  payload: { error },
});

const isLoading = isLoading => ({
  type: isLoadingType,
  payload: { isLoading }
});

const fetchDataSuccess = matches => ({
  type: fetchDataSuccessType,
  payload: { matches }
});

export const actionCreators = {
  fetchData: url => (
    async (dispatch) => {
      dispatch(isLoading(true));

      try {
        const response = await fetch(url);
        if (!response.ok) { throw Error(response.statusText); }
        dispatch(isLoading(false));
        dispatch(fetchDataSuccess(await response.json()));
      } catch(error) {
        dispatch(hasErrored);
      }
    }
  ),
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case fetchDataSuccessType:
      return { ...state, matches: action.payload.matches };
    case hasErroredType:
      return { ...state, error: action.payload.error };
    case isLoadingType:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
}
