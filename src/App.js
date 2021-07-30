import  { useEffect } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import useLocalStorage from './hooks/useLocalStorege';
import './App.css';

import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';


export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const deleteContact = ((contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId))
  });

  const addContact = (name, number) => {
    if (contacts.find((contact) => name.toLowerCase() === contact.name.toLocaleLowerCase())) {
      alert(`${name} is already in contacts.`); return;
    } else if (name && number) {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      setContacts((prev) =>[...prev, contact])
    } else {
      alert(`Please enter a name for contact ${name}!`)
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);

  };

  const totalContactsCount = contacts.length;
  
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = (contacts) => {
    if (contacts.length > 0) {
      contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    } else {
      return 0;
    }
  };
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
         <div className="App">
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={addContact} />

        <h2>Contacts (total: {totalContactsCount}) </h2>
        <Filter value={filter} onChange={changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      </div>
    );

}


App.defaultProps = {
  totalContactsCount: null,
  visibleContactsCount: null
}
App.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape(
        {
          id: PropTypes.any.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.number.isRequired,
        })
    ),
    filter: PropTypes.string,
    totalContactsCount: PropTypes.number,
    visibleContacts: PropTypes.number,
};
  

