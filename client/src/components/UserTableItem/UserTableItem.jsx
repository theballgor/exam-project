import React, {useState} from 'react'
import styles from './UserTableItem.module.scss'
import {IconButton, TableCell, TableRow} from "@material-ui/core"
import TrashIconBlack from "../../resources/icons/trash-black.svg";
import TrashIconWhite from "../../resources/icons/trash-white.svg";
import CancelIcon from '../../resources/icons/close-white.svg'
import {useDispatch} from "react-redux";
import {adminDeleteUser} from "../../redux/admin/admin.actions";

const UserTableItem = ({user}) => {

    const [isDeleting, setIsDeleting] = useState(false)
    const dispatch = useDispatch()

    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting)
    }

    const onDeleteClick = () => {
        toggleIsDeleting()
        dispatch(adminDeleteUser(user))
    }

    return (
        <TableRow data-isdeleteing={isDeleting} className={styles.root} key={user.id}>
            <TableCell align={'center'} component="th" scope="row">
                {user.id}
            </TableCell>
            <TableCell align={'center'} component="th" scope="row">
                {user.email}
            </TableCell>
            <TableCell align={'center'}>
                {user.username}
            </TableCell>
            <TableCell align={'center'}>
                {user.firstName}
            </TableCell>
            <TableCell align={'center'}>
                {user.lastName}
            </TableCell>
            <TableCell align={'center'}>
                {user.countOfRecords}
            </TableCell>
            <TableCell align={'center'}>
                {
                    isDeleting ?
                        <>
                            <IconButton
                                onClick={toggleIsDeleting}
                                aria-label="previous page"
                            >
                                <img
                                    src={CancelIcon}
                                    alt={'cancel'}
                                />
                            </IconButton>
                            <IconButton
                                onClick={onDeleteClick}
                                aria-label="previous page"
                            >
                                <img
                                    src={TrashIconWhite}
                                    alt={'Delete'}
                                />
                            </IconButton>
                        </>
                        :
                        <IconButton
                            onClick={toggleIsDeleting}
                            aria-label="previous page"
                        >
                            <img
                                src={TrashIconBlack}
                                alt={'back'}
                            />
                        </IconButton>
                }

            </TableCell>
        </TableRow>
    )
}

export default UserTableItem