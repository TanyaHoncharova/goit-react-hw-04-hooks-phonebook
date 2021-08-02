import React from 'react';
import propTypes from 'prop-types';

import style from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
return   (
    <ul className={style.list}>
      { contacts &&  contacts.map(({id, name, number}) => {
        return (
          <li key={id} className={style.item}>
            <span>{name}</span><span>{number}</span>
            <button
              className={style.btn}
              type="button"
              id={id}
              onClick={onDeleteContact}
            >
              Delete</button>
          </li>
        );
      })}
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