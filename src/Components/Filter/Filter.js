import React from 'react';
import propsTypes from 'prop-types'
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
    <label className={styles.label}>
        Find contacts by name
        <input className={styles.input} type="text" value={value} onChange={onChange}/>
    </label>
);

Filter.defaultProps = {
    value: ' '
}
Filter.propsTypes = {
    value: propsTypes.string,
    onChange: propsTypes.isPequired
}
export default Filter;