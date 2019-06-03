import React from 'react';
import { TableHead, TableBody, TableFooter } from './index';
import PropTypes from 'prop-types';

/**
 * We can either set default parameter values here, or via Table.defaultProps, as shown in the
 * `TableHead, TableBody, TableFooter` components. Default parameters are standard ES6 syntax:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters
 *
 * defaultProps is a React implementation:
 * https://reactjs.org/docs/typechecking-with-proptypes.html
 */
const Table = ({
  tableId = '',
  tableClass = '',
  tableCaption = false,
  columnData = [],
  tableData = [],
  footerData = false
}) => {
  return (
    <table className={['data', 'table', tableClass].join(' ')} id={tableId}>
      {tableCaption && (
        <caption className="table-caption">{tableCaption}</caption>
      )}
      <TableHead columnData={columnData} />
      <TableBody columnData={columnData} tableData={tableData} />
      <TableFooter
        columnData={columnData}
        tableData={tableData}
        footerData={footerData}
      />
    </table>
  );
};

Table.propTypes = {
  tableId: PropTypes.string,
  tableClass: PropTypes.string,
  tableCaption: PropTypes.string,
  columnData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  footerData: PropTypes.object
};

export default Table;
