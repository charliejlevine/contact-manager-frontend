import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();

<<<<<<< HEAD
// MongoDB connection.
const URI = "mongodb+srv://admin:password321@maincluster-bmnhf.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});

// BodyParser Setup:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	versionKey: false
}).plugin(uniqueValidator);

const ContactSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: String,
	phone: String,
	email: String,
	address: String,
	notes: String
}, {
	versionKey: false
}).plugin(uniqueValidator);

// Controller
const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// Edit contact.
app.patch('/api/contact', (req, res) => {
    const contactId = req.body.contactId;

    if (typeof contactId === 'undefined') {
		res.json({message: "Contact ID needed to edit contact.", contact: ""});
	} else {
        Contact.findById(contactId, function (err, contact) {
            if (err) {
                res.json({message: "Could not find contact.", contact: ""})
            } else {
                let info = {
                    name: (contact as any).name,
                    phone: (contact as any).phone,
                    email: (contact as any).email,
                    address: (contact as any).address,
                    notes: (contact as any).notes
                }
                
                if (req.body.name !== 'undefined') {
                    info.name = req.body.name;
                }

                if (req.body.phone !== 'undefined') {
                    info.phone = req.body.phone;
                }

                if (req.body.email !== 'undefined') {
                    info.email = req.body.email;
                }

                if (req.body.address !== 'undefined') {
                    info.address = req.body.address;
                }

                if (req.body.notes !== 'undefined') {
                    info.notes = req.body.notes;
                }

                Contact.findByIdAndUpdate(contactId, info, function(error, contact) {
                    if (error) {
                        res.json({message: "ERROR: Couldn't update contact.", contact: ""});
                    } else {
                        res.json({message: "Successfully updated contact", contact: contact});
                    }
                });
            }
        });
    }
});

// Delete contact.
app.delete('/api/contact', (req, res) => {
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
});

// Get All Contacts.
app.post('/api/contact', (req, res) => {
    const userId = req.body.userId;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to get contacts.", contacts: ""});
	} else {
		Contact.find({userId: userId}).then((contacts) => {
			res.json({messsage: "Getting all contacts successfully.", contacts: contacts});
		}).catch(err => {
			res.json({message: "Error trying to get all the contacts.", contacts: ""});
		});
	}
});

// Add New Contact.
app.put('/api/contact', (req, res) => {
    const userId = req.body.id;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to add contact."});
	} else {
		const info = [req.body.name, req.body.phone, 
			req.body.email, req.body.address, req.body.notes];
		
		for (let i = 0; i < info.length; i++) {
			if (typeof info[i] === 'undefined')
				info[i] = "";
		}

		const newContact = new Contact({
			_id: new mongoose.Types.ObjectId,
			userId: userId,
			name: info[0],
			phone: info[1],
			email: info[2],
			address: info[3],
			notes: info[4]
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
});

// Login User.
app.post('/api/user', (req, res) => {
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
});

// Register new user.
app.put('/api/user', (req, res) => {
    let newUser = new User({
		_id: new mongoose.Types.ObjectId,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
    });
    // res.json({message: "test"});

	newUser.save().then(user => {
        res.json({
            message: "User successfully created.",
            id: user._id
        });
    }).catch(err => {
		res.json(err);
	});
});

=======
>>>>>>> ded00c23868ffe7e2d597005100ecf70ee45b65e
app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.app = functions.https.onRequest(app);
