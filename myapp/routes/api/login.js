const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const config = require('../../local');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'email',
        'password'
    ]);

    if(_.isEmpty(data)) return res.status(400).json({message: 'Credentials not provided'});

    if(!data.email) return res.status(400).json({message: 'Email not provided'});

    if(!data.password) return res.status(400).json({message: 'Password not provided'});

    User.findOne({
        where: {
            email: data.email
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(data.password, user.password, (err, r) => {
                if(r){
                    if(user.verified){
                        jwt.sign({UserId: user.id}, config.JWT_KEY, {
                            expiresIn: '1h'
                        }, (err, token) => {
                            if(err){
                                console.log(err);
                                res.status(500).json();
                            }
                            else{
                                res.status(200).json({token: token});
                            }
                        });
                    }
                    else{
                        res.status(500).json({message: 'Not verified'});
                    }
                }
                else{
                    res.status(404).json({message: 'Wrong username or password'});
                }
            });
        }
        else{
            res.status(404).json({message: 'Wrong username or password'});
        }
    })
});

module.exports = router;