export const fetchData = (url, isLoading, hasErrored, fetchDataSuccess) => () => (
  async (dispatch) => {
    dispatch(isLoading(true));

    try {
      const response = await fetch(url);
      if (!response.ok) { throw Error(response.statusText); }
      const json = await response.json();
      dispatch(isLoading(false));
      dispatch(fetchDataSuccess(json));
    } catch(error) {
      dispatch(hasErrored);
    }
  }
)
