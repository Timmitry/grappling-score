import * as React from 'react';

export default function WithDataFetching(WrappedComponent) {
  return class WithDataRenderingComponent extends React.Component {
    componentDidMount() {
      this.props.fetchData(this.props.url);
    }

    render() {
      if (this.props.error) {
        return <div>Error: {this.props.error.message}</div>;
      }
      if (this.props.isLoading) {
        return <div>Loading...</div>;
      }

      return <WrappedComponent {...this.props} />
    }
  }
}
