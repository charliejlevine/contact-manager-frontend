import { addNewUser, loginUser, addNewContact, getAllContacts, deleteContact } from '../controllers/userController';

const routes = (app: any) => {
	app.route('/api/user')
	.put(addNewUser)
	.post(loginUser);

	app.route('/api/contact')
	.put(addNewContact)
	.post(getAllContacts)
	.delete(deleteContact);
};

export default routes;