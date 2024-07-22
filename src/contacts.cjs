const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, "../db/contacts.json");

// TODO: udokumentuj każdą funkcję
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading contacts: ${err.message}`);
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(contact => contact.id === contactId);
        return contact || null;
    } catch (err) {
        console.error(`Error getting contact: ${err.message}`);
        return null;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);

        if (contacts.length === updatedContacts.length) {
            console.log(`Contact with id ${contactId} not found`);
            return null;
        }

        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), "utf-8");
        console.log(`Contact with id ${contactId} has been removed`);
        return true;
    } catch (err) {
        console.error(`Error removing contact: ${err.message}`);
        return false;
    }
}

async function addContact(name, email, phone) {
    try {
        const { nanoid } = await import('nanoid');
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        };

        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
        console.log(`Contact added: ${JSON.stringify(newContact, null, 2)}`);
        return newContact;
    } catch (err) {
        console.error(`Error adding contact: ${err.message}`);
        return null;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}