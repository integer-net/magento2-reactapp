import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ columnData, tableData }) => {
  return (
    <tbody>
      {tableData.map(row => (
        <tr>
          {columnData.map(column => (
            <TableBodyColumn key={row.id} rowData={row} {...column} />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

TableBody.propTypes = {
  columnData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired
};

TableBody.defaultProps = {
  columnData: [],
  tableData: []
};

const TableBodyColumn = ({ index, title, data_key, format, rowData }) => {
  return (
    <td data-th={title} className={`col ${index}`}>
      {format(rowData[data_key])}
    </td>
  );
};

TableBodyColumn.propTypes = {
  index: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data_key: PropTypes.string.isRequired,
  format: PropTypes.func.isRequired,
  rowData: PropTypes.object.isRequired
};

TableBodyColumn.defaultProps = {
  index: '',
  title: '',
  data_key: '',
  format: key => key,
  rowData: {}
};
