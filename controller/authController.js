const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt');

const handleLogin = async(req,res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) {
        return res.status(400).json({'message': 'Username and password are required.'});
    };
    const foundUser = usersDB.users.find(use => use.user === user);
    if(!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        //create a jwt to use other routes in the api that are protected
        res.json({'sucess': `User ${user} is logged in`});
    }
    else {
        res.json(foundUser);
    }

}

module.exports = {handleLogin};