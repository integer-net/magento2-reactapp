import React from 'react';
import PropTypes from 'prop-types';

const TableFooter = ({ columnData, tableData, footerData }) => {
  if (!footerData) {
    return '';
  }
  return (
    <tfoot>
      <tr>
        {columnData.map(column => (
          <td key={column.index}>
            {footerData.hasOwnProperty(column.index)
              ? footerData[column.index](tableData)
              : ''}
          </td>
        ))}
      </tr>
    </tfoot>
  );
};

export default TableFooter;

TableFooter.propTypes = {
  columnData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  footerData: PropTypes.object.isRequired
};

TableFooter.defaultProps = {
  columnData: [],
  tableData: [],
  footerData: {}
};
