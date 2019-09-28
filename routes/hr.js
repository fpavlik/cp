
function hr(req, res, next) {
    var Role = require('../helpers/ClassRoles');
    var output = {};

    Role.getAllRoles()
    .then(data => {

        output.roles = data;
        return Role.getAllUsersWithData()
    })
    .then(data => {
        var tempArr = [];
        output.users = data;
        
        for (let i = 0; i < output.users.length; i++) {
            const el = output.users[i];
            tempArr.push(Role.getSumExperience(el.id))            
        }

        return Promise.all(tempArr)
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const exp = data[i];
            
            for (let j = 0; j < output.users.length; j++) {
                const users = output.users[j];

                if (users.id == exp[0].userId) { 
                    var temp = new Date(exp[0].beginOfWork);
                    var now = new Date();
                    var experiense = now.getFullYear() - temp.getFullYear();
                    output.users[j].experiense = experiense;
                }
            }
            
        }
    
        console.log("TCL: hr ->  output.users",  output.users)
    res.render('hr', {roles : output.roles, users : output.users});
    })
    .catch(err => {
        console.log("TCL: hr -> err", err)
        res.render('error', {message : err, error : err})
    });

}


module.exports = hr;