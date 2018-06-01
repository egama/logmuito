const { DefaultResponse, ErrorsResponse } = require('../response/defaultResponse');

const error_test_not_valid = 'Value is invalid';
const error_value_required = 'Value is required';
const error_min_length_required = 'Min length required';
const error_max_length_required = 'Max length required';

class SchemaValidate {
    /**
     * Method for Validation Schema 
     * @param {object} _schema Schema object to validate
     * @param {object} _obj Object with value for compare
     */
    static Validate(_schema, _obj) {
        var response = new DefaultResponse();

        var _sso = _schema.schema.obj;
        var __aPSO = Object.keys(_sso);

        __aPSO.forEach(el => {
            var _vl = _obj[el], _s_el = _sso[el];

            if (_s_el.default != undefined && _s_el.default != null)
                _vl = _s_el.default;

            if (_s_el.required && (_vl == '' || _vl == undefined || _vl == null))
                response.addErro(error_value_required, el);

            if (_s_el.minlength != undefined && _s_el.minlength != null && _s_el.minlength < _vl.length)
                response.addErro(error_min_length_required, el);

            if (_s_el.maxlength != undefined && _s_el.maxlength != null && _s_el.maxlength > _vl.length)
                response.addErro(error_max_length_required, el);

            if (_s_el.test != undefined && _s_el.test != null && _s_el.test != '' && !new RegExp(_s_el.test).test(_vl)) {
                response.addErro(error_test_not_valid, el);
            }
        });

        return response;
    }
}

module.exports.SchemaValidate = SchemaValidate;