import React, {useEffect} from 'react'
import styles from "./RecordsPage.module.scss"
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    addRecordsRecordAction, deleteRecordsRecordAction, editRecordsRecordAction,
    getRecordsRecordsAction,
    onRecordsRecordChangedAction
} from "../../redux/records/records.actions";
import Record from "../../components/Record/Record";
import Loader from "../../components/Loader/Loader";

const RecordsPage = () => {

    const {record, records, isManageRecordsLoading, isGetRecordsLoading, isLoaded} = useSelector(state => state.records)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoaded) {
            dispatch(getRecordsRecordsAction())
        }
    }, [])

    const onInputChange = event => {
        if (event.target.value.length > 256) {
            return
        }
        dispatch(onRecordsRecordChangedAction(event.target.value))
    }

    const onAddRecordHandler = () => {
        dispatch(addRecordsRecordAction())
    }

    const onEditRecordHandler = (record) => {
        dispatch(editRecordsRecordAction(record))
    }

    const onDeleteRecordHandler = (record) => {
        dispatch(deleteRecordsRecordAction(record))
    }

    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Add record
            </div>
            <div className={styles.addRecordContainer}>
                <div className={styles.inputContainer}>
                    <TextField
                        variant={'outlined'}
                        name={'record'}
                        label={'Add new record'}
                        type={'text'}
                        multiline
                        maxRows={'20'}
                        onChange={onInputChange}
                        className={styles.input}
                        value={record}
                    />
                </div>
                <div className={styles.buttonRow}>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        onClick={onAddRecordHandler}
                        disabled={record.length < 4 || record.length > 256}
                    >
                        Add record
                    </Button>
                </div>
            </div>
            {
                isGetRecordsLoading ?
                    <Loader/>
                    :
                    <>
                        <div className={'pageTitle'}>
                            Your records
                        </div>
                        {
                            isManageRecordsLoading ?
                                <Loader/>
                                :
                                <div className={styles.recordsContainer}>
                                    {
                                        records && records.map(item => (
                                            <Record key={item.id} record={item} onDelete={onDeleteRecordHandler}
                                                    onEdit={onEditRecordHandler}/>
                                        ))
                                    }
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default RecordsPage