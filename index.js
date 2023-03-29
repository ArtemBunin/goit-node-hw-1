  
    const contactsRepository = require('./contacts')
    const argv = require("yargs").argv;

    // TODO: рефакторить
    async function invokeAction({ action, id, name, email, phone }) {
      switch (action) {
        case "list":
            const list = await contactsRepository.listContacts();
            console.table(list);
          
          break;
    
        case "get":
          const contact= await contactsRepository.getContactById(id)
          console.table(contact);
          break;
    
        case "add":
         const newContact=await contactsRepository.addContact(name,email,phone)
         console.table(newContact);
          break;
    
        case "remove":
        const deleteContact = await contactsRepository.removeContact(id)
        console.table(deleteContact);
          break;
    
        default:
          console.warn("\x1B[31m Unknown action type!");
      }
    }
    
    invokeAction(argv);