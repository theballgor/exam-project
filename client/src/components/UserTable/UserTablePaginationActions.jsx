import {Box, IconButton, useTheme} from "@material-ui/core";
import LastPageIcon from "../../resources/icons/last-page-black.svg";
import styles from "./UserTable.module.scss";
import FirstPageIcon from "../../resources/icons/first-page-black.svg";
import ForwardIcon from "../../resources/icons/navigate-next-black.svg";
import BackIcon from "../../resources/icons/navigate-before-black.svg";
import React from "react";
import {useSelector} from "react-redux";

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const {totalCount, users, isGetUsersLoading} = useSelector(state => state.admin)
    const actualCount = users.length

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
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
                disabled={
                    page >= Math.ceil(count / rowsPerPage) - 1 ||
                    isGetUsersLoading || (actualCount === totalCount && page === totalCount >= actualCount / rowsPerPage)
                }
            >
                {theme.direction === 'rtl' ?
                    <img
                        className={styles.icon}
                        data-disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        src={BackIcon}
                        alt={'back'}
                    />
                    :
                    <img
                        className={styles.icon}
                        data-disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        src={ForwardIcon}
                        alt={'forward'}
                    />
                }
            </IconButton>
        </Box>
    );
}

export default TablePaginationActions