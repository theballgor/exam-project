import React, {useState} from 'react'
import styles from './UserTable.module.scss'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import UserTableItem from "../UserTableItem/UserTableItem";
import UserTablePaginationActions from './UserTablePaginationActions'
import {useDispatch, useSelector} from "react-redux";
import {adminGetUsersLoading} from "../../redux/admin/admin.actions";
import Loader from "../Loader/Loader";

const UserTable = () => {

    const {users, totalCount, isGetUsersLoading} = useSelector(state => state.admin)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch()

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        if ((newPage + 1) * rowsPerPage > users.length && users.length % rowsPerPage === 0) {
            dispatch(adminGetUsersLoading(newPage, rowsPerPage))
        }
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <>
            {
                isGetUsersLoading ?
                    <div className={styles.loaderContainer}>
                        <Loader/>
                    </div>
                    :
                    <TableContainer component={Paper}>
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">id</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Firstname</TableCell>
                                    <TableCell align="center">Lastname</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {(rowsPerPage > 0
                                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : users
                                    ).map((user, index) => (
                                        <UserTableItem key={index} user={user}/>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </>
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5]}
                                        colSpan={3}
                                        count={totalCount || 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={UserTablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}

export default UserTable