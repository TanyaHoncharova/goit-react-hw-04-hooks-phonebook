import React from 'react';
import propTypes from 'prop-types';
// import Contact from '../Contact'
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
      return (
    <ul className={styles.list}>
      {contacts.length >0 && (contacts.map(({ id, name, number }) => (
        <li className={styles.item} name={name} key={id}>
          {name}: {number}
          <button
            className={styles.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>)
      ))}
    </ul>
  );
};


ContactList.defaultProps  = {
    contacts: []
}

ContactList.propTypes = {
    contacts: propTypes.array,
    onDeleteContact: propTypes.func.isRequired
}
export default ContactList;