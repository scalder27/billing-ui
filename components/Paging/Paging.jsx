import {Component, PropTypes } from "react";
import classnames from "classnames";
import "./Pagimg.scss";

const edgeCount = 5;

class Paging extends Component {
    getPage(pageCount, counter) {
        const { CurrentPage, isSmall, onChange } = this.props;

        const paginationActiveClassNames = classnames("pagination-active", {
            "small-pagination-active": isSmall
        });

        const paginationLinkClassNames = classnames("pagination-link base-link-twin", {
            "small-pagination-link": isSmall
        });

        const leftEdge = CurrentPage - edgeCount;
        const rightEdge = CurrentPage + edgeCount;
        if (counter !== 1 && counter !== pageCount && (leftEdge >= counter || rightEdge <= counter)) {
            return leftEdge === counter || rightEdge === counter ? <span key={`ellipsis_${counter}`}>...</span> : null;
        }

        if (CurrentPage === counter) {
            return <span key={`pageNumber_${counter}`} className={paginationActiveClassNames}>{counter}</span>;
        }

        return (
            <span key={`pageNumber_${counter}`} className={paginationLinkClassNames}
                onClick={onChange.bind(this, counter)}>
                {counter}
            </span>
        );
    }

    getPages() {
        const { PageSize, Total} = this.props;
        const pageCount = Math.floor(Total / PageSize) + (Total % PageSize !== 0 ? 1 : 0);
        return _.range(1, pageCount + 1).map(counter => this.getPage(pageCount, counter));
    }

    render() {
        const { PageSize, Total, isSmall } = this.props;

        if (Total <= PageSize) {
            return null;
        }

        const paginationClassNames = classnames("pagination", {
            "small-pagination": isSmall
        });

        const paginationRowClassNames = classnames("pagination-row", {
            "small-pagination-row": isSmall
        });

        return (
            <div className={paginationClassNames}>
                <div className={paginationRowClassNames}>
                    {this.getPages()}
                </div>
            </div>
        );
    }
}

Paging.propTypes = {
    onChange: PropTypes.func.isRequired,
    CurrentPage: PropTypes.number.isRequired,
    PageSize: PropTypes.number.isRequired,
    Total: PropTypes.number.isRequired,
    isSmall: PropTypes.bool.isRequired
};

export default Paging;
