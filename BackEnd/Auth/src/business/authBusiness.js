const User = require('../models/login');
const DefaultErrorResponse = require('../models/outputModel/defaultErrorResponse');


class AuthBusiness { }
AuthBusiness.prototype.register = async function (_req) {
    var validate = validateAtCreation(_req.body);

    if (!validate.hasError) {
        var ul = await User.create(_req.body);
        validate.success("Usuario inserido com sucesso!", ul);
        return validate;
    }
    
    return validate;
}

function validateAtCreation(_body) {
    var response = new DefaultErrorResponse();

    const { email, password, username } = _body;

    if (email == '' || email == null || email == undefined) {
        response.addErro("Campo obrigatório", "Email");
    }
    if (password == '' || password == null || password == undefined) {
        response.addErro("Campo obrigatório", "Password");
    }
    if (username == '' || username == null || username == undefined) {
        response.addErro("Campo obrigatório", "UserName");
    }
    return response;
}

module.exports = AuthBusiness;