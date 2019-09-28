
function user(req, res, next) {
    var Role = require('../helpers/ClassRoles');
    var output = {};nnn

    Role.getUserById(req.query.id)
    .then(data => {
        output.role = data;
        return Role.getAllUserByRole(req.query.id)
    })
    .then(data => {
        var tempArr = [];
        output.users = data;
        output.usersCount = data.length;
        
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
        
        return Role.getSkillsByRole(req.query.id)
    })
    .then(data => {
    output.skills = data;
        var tempArr = [];
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            tempArr.push(Role.getCourseBySkillId(el.id))
        }
        
        return Promise.all(tempArr)
    })
    .then(data => {
        for (let i = 0; i < output.skills.length; i++) {
            const skill = output.skills[i];
            
            for (let j = 0; j < data.length; j++) {
                const course = data[j];

                if (course[0]) {
                    if(skill.id == course[0].skillId) {
                        output.skills[i].courseId = course[0].courseId;
                        output.skills[i].link = course[0].link;
                        output.skills[i].courseName = course[0].name;
                    }
                }
                
            }
        }
        
        res.render('user', {role: output.role, users: output.users, skills: output.skills, usersCount : output.usersCount})
    })
    .catch(err => {
        console.log("TCL: hr -> err", err)
        res.render('error', {message : err, error : err})
    });
}


module.exports = user;