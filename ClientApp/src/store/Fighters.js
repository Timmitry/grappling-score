import { fetchData } from './Helpers';

const hasErroredType = 'FIGHTERS_HAS_ERRORED';
const isLoadingType = 'FIGHTERS_IS_LOADING';
const fetchDataSuccessType = 'FIGHTERS_FETCH_DATA_SUCCESS';
const setPageType = 'FIGHTERS_SET_PAGE';

const initialState = {
  fighters: [],
  isLoading: true,
  error: null,
  currentPage: 1,
};

const hasErrored = error => ({
  type: hasErroredType,
  payload: { error },
});

const isLoading = isLoading => ({
  type: isLoadingType,
  payload: { isLoading }
});

const fetchDataSuccess = fighters => ({
  type: fetchDataSuccessType,
  payload: { fighters }
});

const setPage = pageNumber => ({
  type: setPageType,
  payload: { pageNumber },
});

export const actionCreators = {
  fetchData: fetchData('/api/fighters?search=Gracie', isLoading, hasErrored, fetchDataSuccess),
  changePage: page => dispatch => dispatch(setPage(page)),
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case fetchDataSuccessType:
      return { ...state, fighters: action.payload.fighters };
    case hasErroredType:
      return { ...state, error: action.payload.error };
    case isLoadingType:
      return { ...state, isLoading: action.payload.isLoading };
    case setPageType:
      return { ...state, currentPage: action.payload.pageNumber };
    default:
      return state;
  }
}
