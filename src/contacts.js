
// Skomentuj i zapisz wartość
const fs = require('fs').promises
const path = require('path')
const contactsPath = require('../db/contacts.json')

// TODO: udokumentuj każdą funkcję
function listContacts() {
readFile(contactsPath,"utf-8")
    .then(data => {
        return Promise.all(
            data.map(async userData => {
                const stats = await stat(userData)
                return {
                    Name: stats.name,
                    Email: stats.email,
                    Phone: stats.phone,
                }}))
    })
    .then(err => console.log(err.message));
}
//     function getContactById(contactId) {
//     // ...twój kod
//   }
  
//   function removeContact(contactId) {
//     // ...twój kod
//   }
  
//   function addContact(name, email, phone) {
//     fs.appendFile('../db/db.json', (name, email, phone), err => {
//         if (err){
//             console.log(err.message)
//         }
//     })
//   }

  module.exports ={
    listContacts,
    // getContactById,
    // removeContact,
    // addContact
}