import React from 'react';
import propsTypes from 'prop-types'
import shortid from 'shortid';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
    const inputListId = shortid.generate();
    return (
       <>
    <label className={styles.label} htmlFor={inputListId}>
                Find contacts by name
    </label>
            <input className={styles.input}
                id={inputListId}
                value={value} onChange={onChange} />
        </>    
)};

Filter.defaultProps = {
    value: ' '
}
Filter.propsTypes = {
    value: propsTypes.string,
    onChange: propsTypes.isPequired
}
export default Filter;