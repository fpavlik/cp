
function suggest(req, res, next) {
    var Role = require('../helpers/ClassRoles');
    var output = {};


    req.query
    console.log("TCL: suggest -> req.query", req.query)
    Role.setAnswer(req.query.user, req.query.role, req.queryanswer)
    res.redirect('back');


}


module.exports = suggest;