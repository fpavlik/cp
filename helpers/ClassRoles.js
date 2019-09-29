class Roles {
    constructor (idP, header, status, urlImg, body, date, id) {
        this.idP = idP;
        this.header = header;
        this.status = status;
        this.urlImg = urlImg;
        this.body = body;
        this.date = date;
        this.id = id;
    }

    static getAllRoles() {
        var con = require('./Connect');
        var sql = "SELECT * FROM roles ORDER BY roles.leave DESC";

        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
                
            });
        });
    }

    static getAllUsersWithData() {
        var con = require('./Connect');
        var sql = "SELECT users.name as userName, roles.name as roleName, users.leave, users.id \
        FROM users \
        INNER JOIN roles on users.role = roles.id;";

        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
        });

    }

    static getSumExperience(userId) {
        var con = require('./Connect');
        var sql = "SELECT userId, beginOfWork FROM experience WHERE userId = "+ con.escape(userId)+" ORDER BY beginOfWork ASC LIMIT 1;";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });

        })
    }

    static getRoleById(id) {
        var con = require('./Connect');
        var sql = "SELECT * FROM roles WHERE id = "+con.escape(id)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result[0]);
            });

        });
    }

    static getAllUserByRole (roleId) {
        var con = require('./Connect');
        var sql = "SELECT users.name, users.leave, users.id FROM users \
        WHERE role = "+con.escape(roleId)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });

        });
    }

    static getSkillsByRole(roleId) {
        var con = require('./Connect');
        var sql = "SELECT * FROM skills INNER JOIN roleSkills ON roleSkills.skillId = skills.id WHERE roleSkills.roleId = "+ con.escape(roleId)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });

        });
    }

    static getCourseBySkillId(skillId) {
        var con = require('./Connect');
        var sql = "SELECT skillsCourses.skillId as skillId, courses.link, courses.id as courseId, courses.name FROM courses \
        INNER JOIN skillsCourses on skillsCourses.courseId = courses.id \
        WHERE skillsCourses.skillId = "+con.escape(skillId)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });

        });
    }

    static getUserById(userId) {
        var con = require('./Connect');

        var sql ="SELECT users.id, users.name, users.leave, roles.name as roleName FROM users \
        INNER JOIN roles ON users.role = roles.id \
        WHERE users.id = "+con.escape(userId)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    }

    static getSkillsByUser(userId) {
        var con = require('./Connect');

        var sql = "SELECT * FROM skills \
        INNER JOIN skillsUsers on skills.id = skillsUsers.skillId \
        WHERE skillsUsers.userId = "+ con.escape(userId);
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    }

    static getSuggestRolesById(userId) {
        var con = require('./Connect');

        var sql = "SELECT roles.name, suggestRoles.status, roles.id as roleId FROM roles \
        INNER JOIN suggestRoles ON suggestRoles.roleId = roles.id \
        WHERE suggestRoles.userId = "+con.escape(userId)+";";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    }


}

module.exports = Roles;