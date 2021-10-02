import React, {useEffect, useRef, useState} from 'react'
import styles from './Record.module.scss'
import {TextField} from "@material-ui/core";
import BlackTrashIcon from '../../resources/icons/trash-black.svg'
import WhiteCancelIcon from '../../resources/icons/close-white.svg'
import BlackEditIcon from '../../resources/icons/edit-black.svg'
import WhiteDoneIcon from '../../resources/icons/done-white.svg'

const EDIT = 'edit'
const DELETE = 'delete'
const DEFAULT = 'default'

const Record = ({record, onEdit, onDelete}) => {

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [content, setContent] = useState('')
    const [contentType, setContentType] = useState(DEFAULT)
    const [isContentValid, setIsContentValid] = useState(true)
    const inputRef = useRef(null)

    useEffect(() => {
        setContent(record.content)
    }, [])

    useEffect(() => {
        setContent(record.content)
    }, [record.content])

    useEffect(() => {
        if (isDeleting) {
            setContentType(DELETE)
        } else if (isEditing) {
            setContentType(EDIT)
            inputRef.current.focus()
        } else {
            setContent(record.content)
            setContentType(DEFAULT)
        }
    }, [isDeleting, isEditing])

    const onEditIconClick = () => {
        setIsEditing(!isEditing)
    }

    const onDeleteIconClick = () => {
        setIsDeleting(!isDeleting)
    }

    const onEditSave = () => {
        if (isContentValid) {
            setIsEditing(false)
            onEdit({content, id: record.id})
        }
    }

    const onContentChange = event => {
        setIsContentValid(event.target.value.length >= 4 && event.target.value.length <= 256)

        if (event.target.value.length > 256) {
            return
        }
        setContent(event.target.value)
    }

    const onDeleteConfirmed = () => {
        setIsDeleting(false)
        onDelete(record)
    }

    return (
        <div className={styles.root}>
            <div className={styles.inputContainer}>
                <TextField
                    data-contenttype={contentType}
                    variant={'outlined'}
                    name={'record'}
                    type={'text'}
                    multiline
                    onChange={onContentChange}
                    className={styles.input}
                    value={content}
                    InputProps={{
                        readOnly: !isEditing
                    }}
                    inputRef={inputRef}
                />
            </div>
            <div data-contenttype={contentType} className={styles.buttonRow}>
                {
                    !isEditing && !isDeleting &&
                    <>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} onClick={onEditIconClick} src={BlackEditIcon} alt={'delete'}/>
                        </div>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} onClick={onDeleteIconClick} src={BlackTrashIcon}
                                 alt={'delete'}/>
                        </div>
                    </>
                }
                {
                    isEditing &&
                    <>
                        <div data-isdisabled={!isContentValid} className={styles.iconContainer}>
                            <img aria-disabled={!isContentValid} className={styles.icon} onClick={onEditSave}
                                 src={WhiteDoneIcon} alt={'delete'}/>
                        </div>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} onClick={onEditIconClick} src={WhiteCancelIcon}
                                 alt={'delete'}/>
                        </div>
                    </>
                }
                {
                    isDeleting &&
                    <>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} onClick={onDeleteConfirmed} src={WhiteDoneIcon}
                                 alt={'delete'}/>
                        </div>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} onClick={onDeleteIconClick} src={WhiteCancelIcon}
                                 alt={'delete'}/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Record