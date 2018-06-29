import React from 'react';

export default class PageNavigator extends React.Component {
  pageSelector(pageNumber, linkText, className) {
    return (
      <a class={className} onClick={() => this.props.clickHandler(pageNumber)} >{linkText}</a>
    );
  }

  pageNumbers(totalNumberOfPages) {
    let lowerPageLimit = this.props.currentPage - 3;
    let upperPageLimit = this.props.currentPage + 3;

    if (lowerPageLimit < 1) {
      upperPageLimit -= (lowerPageLimit - 1);
      lowerPageLimit = 1;
    }
    if (upperPageLimit > totalNumberOfPages) {
      if (lowerPageLimit > 1) {
        lowerPageLimit -= upperPageLimit - totalNumberOfPages;
        if (lowerPageLimit < 1) {
          lowerPageLimit = 1;
        }
      }
      upperPageLimit = totalNumberOfPages;
    }

    const pageNumbers = Array(0);
    for (let i = lowerPageLimit; i <= upperPageLimit; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  render() {
    const totalNumberOfPages = Math.ceil(this.props.count / this.props.pageSize);
    const pageNumbers = this.pageNumbers(totalNumberOfPages);

    return (
      <div class='paginate-container'>
        {this.pageSelector(1, '<<', '')}
        {pageNumbers.map(pageNumber => {
          const className = pageNumber === this.props.currentPage ? 'active' : '';
          return this.pageSelector(pageNumber, pageNumber, className);
        })}
        {this.pageSelector(totalNumberOfPages, '>>', '')}
      </div>
    );
  }
}
