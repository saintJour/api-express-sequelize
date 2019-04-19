const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const config = require('../../local');
const email = require('./../../utils/email');

const cryptr = new Cryptr(config.CRYPTR_KEY);

router.post('/', async (req, res) => {
    let data = _.pick(req.body, [
        'ProgramId',
        'firstName',
        'lastName',
        'email',
        'password',
        'avatar'
    ]);

    if(_.isEmpty(data)){
        return res.status(400). json({message: 'User data not provided'});
    }

    if(!data.firstName){
        return res.status(400).json({message: 'User firstName not provided'});
    }

    if(!data.lastName){
        return res.status(400).json({message: 'User lastName not provided'});
    }

    if(!data.email){
        return res.status(400).json({message: 'User email not provided'});
    }

    if(!data.password){
        return res.status(400).json({message: 'User password not provided'});
    }

    try{
        let hash = await bcrypt.hash(data.password, 10);
        let emailToken = cryptr.encrypt(data.email);
        data.password = hash;
        data.emailToken = emailToken;
        let user = await User.create(data);
        let checkSender = await email.sendVerificationEmail(data.email, data.emailToken);

        if(checkSender){
            res.status(201).json();
        }
        else{
            await user.destroy();
            res.status(500).json({message: 'Failed to create user'});
        }
    }
    catch(e){
        res.status(500).json(e);
    }
});

router.get('/verify', async (req, res) => {

    if(_.isEmpty(req.query.emailToken)){
        return res.status(400).json({message: 'Email Token not provided'});
    }

    try{

        let email =  await cryptr.decrypt(req.query.emailToken);

        console.log("EMAIL", email);

        let user = await User.findOne({
            where: {
                email: email
            }
        });
        
        if(user){
            await user.update({
                verified: true
            });
            res.status(200).json({message: 'User has been verified'});
        }
        else{
            res.status(404).json({message: 'Not Found'});
        }
    }
    catch(e){
        res.status(500).json(e);
    }   
});



module.exports = router;