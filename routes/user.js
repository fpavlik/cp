function user(req, res, next) {
    var Role = require('../helpers/ClassRoles');
    var output = {};

    Role.getUserById(req.query.id)
        .then(data => {
            output.user = data[0];
            return Role.getSkillsByUser(req.query.id)
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
                        if (skill.id == course[0].skillId) {
                            output.skills[i].courseId = course[0].courseId;
                            output.skills[i].link = course[0].link;
                            output.skills[i].courseName = course[0].name;
                        }
                    }

                }
            }

            return Role.getSumExperience(output.user.id)
        })
        .then(data => {
            var temp = new Date(data[0].beginOfWork);
            var now = new Date();
            var experience = now.getFullYear() - temp.getFullYear();
            output.user.experience = experience;


            return Role.getSuggestRolesById(req.query.id)
        })
        .then(data => {
            output.suggest = data;
            var tempArr = [];

            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                tempArr.push(Role.getSkillsByRole(el.roleId))                
            }

            return Promise.all(tempArr)
        })
        .then(data => {
        console.log("TCL: user -> data", data)
            output.skills = data;
            res.render('user', {
                user: output.user,
                skills: output.skills,
                suggest: output.suggest
            });
        })
        .catch(err => {
            console.log("TCL: hr -> err", err)
            res.render('error', {
                message: err,
                error: err
            })
        });
}


module.exports = user;