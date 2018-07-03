import { fetchData } from "./Helpers";

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
  fetchData: fetchData('/api/matches', isLoading, hasErrored, fetchDataSuccess),
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
