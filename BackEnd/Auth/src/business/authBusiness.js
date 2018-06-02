const User = require('../models/model/users');
const Company = require('../models/model/company');
const CompanyAddress = require('../models/model/companyAddress');

const { DefaultResponse, ErrorsResponse, SchemaValidate } = require('lot-validate');

class AuthBusiness {
    /**
     * public method for create register at dbCompanies, in Company, CompanyAddress and Users
     * @param {object} _req Request param 
     * @returns {DefaultResponse} object default of response
     */
    async register(_req) {
        const { companyName, companyContact, address, users } = _req.body;
        var response = new DefaultResponse();

        //First: Validate and Create User
        if (!response.hasError)
            response.addErroRange((await userValidateAtCreation({ users })).errors);

        //Secound: Validate and Create Address 
        if (!response.hasError)
            response.addErroRange((await companyAddressValidateAtCreation({ address })).errors);

        //Thrid: Create Company
        if (!response.hasError) {
            response.addErroRange((await companyValidateAtCreation({ companyName, companyContact })).errors);

            if (!response.hasError) {
                var comp = await Company.create({ companyName, companyContact });

                //Create user
                await Promise.all(users.map(async u => {
                    u.company = comp._id;
                    var usr = await User.create(u);
                    comp.users.push(usr);
                }));


                await Promise.all(address.map(async a => {
                    a.company = comp._id;
                    var cA = await CompanyAddress.create(a);
                    comp.address = (cA);
                }));

                var len = comp.companyName.length < 8 ? comp.companyName.length : 8;
                var ram = Math.floor(Math.random() * 1000);
                var dbName = comp.companyName.split(' ').join('').substr(0, len) + ram.toString();
                comp.NameToDb = dbName;

                comp.save();

                response.success("Company created with success!", comp);
                return response;
            }
        }

        return response;
    }

    async authenticate(_req) {
        var response = SchemaValidate.Validate(User, _req.body);
        if (!response.hasError) {
            var dataUser = await User.create(_req.body)
            response.success("Salvo com sucesso!", dataUser);
        }
        return response;
    }
}

/**
 * Private method to Company validate. if body is right
 * @param {object} _body 
 * @returns {DefaultResponse} object default of response
 */
async function companyValidateAtCreation(_body) {
    const { companyName, companyContact } = _body;

    var response = SchemaValidate.Validate(Company, _body);

    if (!response.hasError && (await existsCompany(companyName)))
        response.addErro("Company exists", "companyName");

    return response;
}

/**
 * Private method to Company Address validate. if body is right
 * @param {object} _body Object Request of Company Address
 * @returns {DefaultResponse} object default of response
 */
async function companyAddressValidateAtCreation(_body) {
    const { address } = _body;

    var response = SchemaValidate.ValidateArray(CompanyAddress, address);
    return response;
}

/**
 * Private method to User validate. if body is right
 * @param {object} _body Object Request of User
 * @returns {DefaultResponse} object default of response
 */
async function userValidateAtCreation(_body) {
    const { users } = _body;

    var response = SchemaValidate.ValidateArray(User, users);
    if (!response.hasError) {
        for (var i = 0; i < users.length; i++) {
            if (await existsUser(users[i].email))
                response.addErro("User exist", "email");
        }
    }

    return response;
}

/**
 * Private Method to validate, if exists company where have name  
 * @param {string} _name Name of Company, for validate Schema
 * @return {boolean} The response is a validation if exists company
 */
async function existsCompany(_name) {
    var comp = await Company.find({ companyName: _name });
    return comp.length > 0;
}

/**
 * Private Method to validate, if exists user by email  
 * @param {string} _email Email of User, for validate Schema
 * @return {boolean} The response is a validation if exists user
 */
async function existsUser(_email) {
    var usr = await User.find({ email: _email });
    return usr.length > 0;
}

module.exports = AuthBusiness;