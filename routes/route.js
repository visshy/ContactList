const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//Retrieving Contacts
router.get('/contacts', function(req, res, next){
    Contact.find(function(err, contacts){
        res.json(contacts);
    })
    
});

//Adding Contacts
router.post('/contact', function(req, res, next){
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save(function(err, contact){
        if(err)
            {
            res.json({msg:'Failed to add contact'});
            } 
            else {
            res.json({msg: 'Contact added successfully'});
             }
    });
});

//Deleting contacts

router.delete('/contact/:id', function(req, res, next){
    Contact.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }else {
            res.json(result);
        }
    });
});

module.exports = router;
