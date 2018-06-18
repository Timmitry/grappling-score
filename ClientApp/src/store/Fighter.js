const hasErroredType = 'FIGHTER_HAS_ERRORED';
const isLoadingType = 'FIGHTER_IS_LOADING';
const fetchDataSuccessType = 'FIGHTER_FETCH_DATA_SUCCESS';

const initialState = {
  // fighter: {
    firstName: '',
    lastName: '',
    score: 0,
    isLoading: true,
    error: null,
  // }
};

const hasErrored = error => ({
  type: hasErroredType,
  payload: { error },
});

const isLoading = isLoading => ({
  type: isLoadingType,
  payload: { isLoading }
});

const fetchDataSuccess = fighter => ({
  type: fetchDataSuccessType,
  payload: { fighter }
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
      return { ...state, ...action.payload.fighter };
    case hasErroredType:
      return { ...state, error: action.payload.error };
    case isLoadingType:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
}
