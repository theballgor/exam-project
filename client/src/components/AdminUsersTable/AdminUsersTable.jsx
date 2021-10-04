import React from 'react'
import List from "../List/List";

const AdminUsersTable = () => {

    const items = [
        {
            id: '1',
            email: 'user1@gmail.com',
            username: 'username1',
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

    ]

    return (
        <List source={items} pageCount={0} />
    )
}

export default AdminUsersTable