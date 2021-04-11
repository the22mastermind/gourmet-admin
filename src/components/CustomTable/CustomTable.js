import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomTableRow from '../CustomTableRow/CustomTableRow';
import CustomTableFooter from '../CustomTableFooter/CustomTableFooter';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const renderHeader = (tableHeadings) => (
  <TableRow>
    {tableHeadings.map((heading) => (heading.name === 'Amount' || heading.name === 'PaymentId' || heading.name === 'Status' ? (
      <Hidden xsDown key={heading.id}>
        <StyledTableCell>
          {heading.name}
        </StyledTableCell>
      </Hidden>
    ) : (
      <StyledTableCell key={heading.id}>
        {heading.name}
      </StyledTableCell>
    )))}
  </TableRow>
);

const CustomTable = ({ tableHeadings, data }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" data-testid="orders-table">
        <TableHead>
          {renderHeader(tableHeadings)}
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <CustomTableRow key={order.id} row={order} />
          ))}
          {data.length < 1 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell align="center" colSpan={7}>
                No orders found at the moment
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <CustomTableFooter
          page={page}
          rows={data}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
        />
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  tableHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(
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
};

export default CustomTable;
