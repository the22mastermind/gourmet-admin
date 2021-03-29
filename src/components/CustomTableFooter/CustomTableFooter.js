import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions';

const CustomTableFooter = ({ page, rows, rowsPerPage, handleChangePage }) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[{ label: 'All', value: -1 }]}
        colSpan={7}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </TableRow>
  </TableFooter>
);

CustomTableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      total: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      paymentId: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      Contents: PropTypes.arrayOf(
        PropTypes.shape({
          itemId: PropTypes.number.isRequired,
          itemName: PropTypes.string.isRequired,
          cost: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        }),
      ).isRequired,
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default CustomTableFooter;
