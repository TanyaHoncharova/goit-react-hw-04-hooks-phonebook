import { useEffect, useState } from 'react';
 
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './App.css';
import Title from './Components/Title';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';


export default function App() {
  const [contacts, setContacts] = useState(()=>{
    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  })

  const [filter, setFilter] = useState('');

 useEffect(()=>{
    window.localStorage.setItem('contacts',JSON.stringify(contacts))
  },[contacts])


  
  const addContact = (name, number) => {
    // if (handleCoincidence(name.toLowerCase())) {
    //   return
    // };

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    console.log(contact);
    setContacts((prev) => { return [...prev, contact] });
    
  };
  

  
  const deleteContact = e => {
    const contactId = e.currentTarget.id;
    setContacts(contacts.filter(contact => contact.id !== contactId));
     setFilter('');
  };
  
  const changeFilter = e => {
    setFilter(e.currentTarget.value);

  };

  
  const getVisibleContact = () =>  {
    if (!contacts) return []

    const normalizedFilter = filter.toLowerCase();
   return  contacts.filter(({name})=> name.toLowerCase().includes(normalizedFilter))
  };
  
  const  handleCoincidence = currentName => {
    if (!contacts) {return }

    if (contacts.find(({ name }) => name.toLowerCase() === currentName)) {
      alert(`${currentName} is already in contacts`);
      return true;
    }
  };
  const visibleContacts = getVisibleContact();
  

  return (
    <div className="App">
     <Title>Phonebook</Title>
      <ContactForm contacts={contacts} onSubmit={addContact} coincidence={handleCoincidence} />
      <Filter value={filter} onChange={changeFilter} />
      
      {visibleContacts !== 0 ? (
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />) : (
        <h3>No contact</h3>
      )}
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
  

