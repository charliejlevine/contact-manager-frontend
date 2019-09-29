import * as mongoose from 'mongoose';
import { UserSchema, ContactSchema } from '../models/userModels';

const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);

export const deleteContact = (req: any, res: any) => {
	const contactId = req.body.contactId;

	if (typeof contactId === 'undefined') {
		res.json({message: "Contact ID needed to delete contact."});
	} else {
		Contact.findByIdAndDelete(contactId, function (err, contact) {
			if (err) {
				res.json({message: "Error trying to delete contact."});
			} else {
				res.json({message: "Sucessfully deleted contact."});
			}
		});
	}
}

export const getAllContacts = (req: any, res: any) => {
	const userId = req.body.id;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to get contacts."});
	} else {
		Contact.find({userId: userId}).then((contacts) => {
			res.json({messsage: "Getting all contacts successfully.", contacts: contacts});
		}).catch(err => {
			console.log(err);
		});
	}
}

export const addNewContact = (req: any, res: any) => {
	const userId = req.body.id;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to add contact."});
	} else {
		const info = [req.body.firstname, req.body.lastname, req.body.phone, 
			req.body.email, req.body.address, req.body.notes];
		
		for (let i = 0; i < info.length; i++) {
			if (typeof info[i] === 'undefined')
				info[i] = "";
		}

		const newContact = new Contact({
			_id: new mongoose.Types.ObjectId,
			userId: userId,
			firstname: info[0],
			lastname: info[1],
			phone: info[2],
			email: info[3],
			address: info[4],
			notes: info[5]
		});

		newContact.save((err, user) => {
			if (err) {
				res.json({message: "Unknown error"});
			} else {
				res.send(user);
			}
		}).catch(err => {
			console.log(err);
		});
	}
}

export const loginUser = (req: any, res: any) => {
	const username = req.body.username;
	const password = req.body.password;

	if (typeof username === 'undefined') {
		res.json({message: "Username required to login.", id: ""});
	} else if (typeof password === 'undefined') {
		res.json({message: "Password required to login.", id: ""});
	} else {
		User.findOne({'username' : username}, function (err, user: any) {
			if (err) {
				res.json({message: "Username does not exist", id: ""});
			} else {
				if (user.password == password) {
					res.json({message: "Logged in", id: user._id});
				} else {
					res.json({message: "Incorrect password", id: ""});
				}
			}
		});
	}
}

export const addNewUser = (req: any, res: any) => {
	let newUser = new User({
		_id: new mongoose.Types.ObjectId,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	newUser.save((err, user) => {
		if (err) {
			/* // Check which error.
			if (err.errors.username.kind == "required") {
				res.json({
					message: "Username required.",
					id: ""
				});
			} else if (err.errors.username.kind == "unique") {
				res.json({
					message: "Username already taken.",
					id: ""
				});
			} else if (err.errors.email.kind == "required") {
				res.json({
					message: "Email required.",
					id: ""
				});
			} else if (err.errors.email.kind == "unique") {
				res.json({
					message: "Email already in use.",
					id: ""
				});
			} else { */
			res.send(err);

/* 				res.json({
					message: "Unknown error.",
					id: ""
				});
			} */
		} 
		// No errors, user can be created :).
		else {
			res.json({
				message: "User successfully created.",
				id: user._id
			});
		}
	}).catch(err => {
		console.log(err);
	});
};
