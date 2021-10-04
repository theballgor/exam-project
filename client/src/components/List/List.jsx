import React, {useState} from 'react'
import ListItem from "../ListItem/ListItem";
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, useTheme
} from "@material-ui/core";
import {log} from "nodemon/lib/utils";


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <span>last</span> :  <span>first</span>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <span>right</span> : <span>left</span>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <span>left</span> :<span>right</span>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <span>first</span> : <span>last</span>}
            </IconButton>
        </Box>
    );
}

const List = ({source, pageCount}) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - source.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">id</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? source.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : source
                        ).map((row) => (
                            <TableRow onClick={()=> console.log(row)} key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.username}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.countOfRecords}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={source.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </>
    )
}

export default List



