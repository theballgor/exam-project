import React, {useState} from 'react'
import styles from './UserTable.module.scss'
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
import UserTableItem from "../UserTableItem/UserTableItem";
import BackIcon from '../../resources/icons/navigate-before-black.svg'
import ForwardIcon from '../../resources/icons/navigate-next-black.svg'
import FirstPageIcon from '../../resources/icons/first-page-black.svg'
import LastPageIcon from '../../resources/icons/last-page-black.svg'

const items = [
    {
        id: '1',
        email: 'user1@gmail.com',
        username: 'username1',
        firstName: 'Ihor',
        lastName: 'Baluk',
        countOfRecords: 10,
    },
    {
        id: '2',
        email: 'user2@gmail.com',
        username: 'username2',
        countOfRecords: 2,
    },
    {
        id: '3',
        email: 'user3@gmail.com',
        username: 'username3',
        countOfRecords: 100,
    },
    {
        id: '4',
        email: 'user4@gmail.com',
        username: 'username4',
        countOfRecords: 54,
    },
    {
        id: '5',
        email: 'user5@gmail.com',
        username: 'username5',
        countOfRecords: 514,
    },
    {
        id: '6',
        email: 'user6@gmail.com',
        username: 'username6',
        countOfRecords: 54,
    },
    {
        id: '7',
        email: 'user6@gmail.com',
        username: 'username6',
        countOfRecords: 54,
    },
    {
        id: '8',
        email: 'user6@gmail.com',
        username: 'username6',
        countOfRecords: 54,
    },
    {
        id: '9',
        email: 'user6@gmail.com',
        username: 'username6',
        countOfRecords: 54,
    },
    {
        id: '10',
        email: 'user6@gmail.com',
        username: 'username6',
        countOfRecords: 54,
    },

]

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

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
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ?
                    <img
                        src={LastPageIcon}
                        alt={'last'}
                        className={styles.icon}
                        data-disabled={page === 0}
                    />
                    :
                    <img
                        src={FirstPageIcon}
                        alt={'first'}
                        className={styles.icon}
                        data-disabled={page === 0}
                    />
                }
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ?
                    <img
                        className={styles.icon}
                        data-disabled={page === 0}
                        src={ForwardIcon}
                        alt={'forward'}
                    />
                    :
                    <img
                        className={styles.icon}
                        data-disabled={page === 0}
                        src={BackIcon}
                        alt={'back'}
                    />
                }
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ?
                    <img
                        className={styles.icon}
                        src={BackIcon}
                        alt={'back'}
                    />
                    :
                    <img
                        className={styles.icon}
                        src={ForwardIcon}
                        alt={'forward'}
                    />
                }
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ?
                    <img
                        src={FirstPageIcon}
                        alt={'first'}
                        className={styles.icon}
                        data-disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    />
                    :
                    <img
                        src={LastPageIcon}
                        alt={'last'}
                        className={styles.icon}
                        data-disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    />
                }
            </IconButton>
        </Box>
    );
}

const UserTable = () => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const handleChangePage = (event, newPage) => {
        console.log(newPage * rowsPerPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">id</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Firstname</TableCell>
                            <TableCell align="left">Lastname</TableCell>
                            <TableCell align="left">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : items
                        ).map((user) => (
                            <UserTableItem key={user.id} user={user}/>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                colSpan={3}
                                count={items.length}
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

export default UserTable



