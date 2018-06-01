const User = require('../models/login');
const { DefaultResponse, ErrorsResponse, SchemaValidate } = require('lot-validate');

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
AuthBusiness.prototype.authenticate = async function (_req) {
    var response = SchemaValidate.Validate(User, _req.body);
    return response;
}

function validateAtCreation(_body) {
    var response = new DefaultResponse();

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