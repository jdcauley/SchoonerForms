/**
 * ContactController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Mandrill",
    auth: {
        user: '',
        pass: ''
    }
});

module.exports = {

  new: function(req, res){
    var params = req.params.all();

    Contact.create(params, function(err, contact){

      if (err){ res.send(500, err);

      }else{
          console.log(contact.firstname + ',' + contact.lastname + ',' + contact.email + ',' + contact.subject + ',' + contact.message)
          console.log()
          var mailOptions = {
            from:       contact.firstname + ' ' + contact.lastname + '<' + contact.email + '>',
            to:         'jordan@wearegoodcitizen.com',
            subject:    contact.subject,
            html: contact.message
          }

// send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            console.log(error);
          }else{
            console.log("Message sent: " + response.message);
          }
          res.json({success: 'yes'});
    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
        });

      }
    });


  }

};
