const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const path = require('path');

 const contactsPath =path.join(__dirname,'db','contacts.json'); ;


// TODO: задокументировать каждую функцию
async function listContacts() {
  const res = await fs.readFile(contactsPath,{encoding:'utf8'});
  const parsed = JSON.parse(res);
 return parsed
  }
  
  async function getContactById(contactId) {
    const parsedContacts = await listContacts()
    const contact=parsedContacts.find((el)=>el.id===contactId) 
if(!contact){
  return null;
}
    return contact
  }
  
  async function removeContact(contactId) {
    const parsedContacts = await listContacts();
    const contactIndex=parsedContacts.findIndex(contact => contact.id === contactId);
    if(contactIndex<0){
      return null;
  }
    parsedContacts.splice(contactIndex,1);
  
    await fs.writeFile(contactsPath,JSON.stringify(parsedContacts,null,2));}
  
  async function addContact(name, email, phone) {
  const newContact={
    id:nanoid(),
    name,
    email,
    phone
  }
  const parsedContacts = await listContacts();
  parsedContacts.push(newContact);
  await fs.writeFile(contactsPath,JSON.stringify(parsedContacts,null,2));
  return newContact;
  }
  module.exports ={
    listContacts,
    getContactById,
    removeContact,
    addContact
  }