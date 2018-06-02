class ErrorsResponse {
    /**
     * Class of erro
     * @param {string} _field Field of error
     * @param {string} _error Error message
     */
    constructor(_field, _error) {
        this.field = _field;
        this.error = _error;
    }
}

class DefaultResponse {
    constructor() {
        this.errors = [];
        this.messageOk = "";
        this.data = {};
        this.hasError = false;
    }

    /**
     * en-Us: Method for set error in object
     * pt-Br: Método que lança erro no objeto
     * @param {string} _error Erro ocorrido
     * @param {string} _field Campo do erro ocorrido
     */
    addErro(_error, _field) {
        var error = new ErrorsResponse();
        error.error = _error;
        error.field = _field;
        this.errors.push(error);
        this.hasError = this.errors.length > 0;
    }

    /**
     * en-Us: Method for ser Multiple erros
     * pt-Br: Método que lança multiplos error
     * @param {Array<ErrorsResponse>} _errors 
     */
    addErroRange(_errors) {
        _errors.forEach(x => {
            this.addErro(x.error, x.field);
        });
    }

    /**
     * en-Us: Method for set object with success
     * pt-Br: Método que lança objeto de sucesso
     * @param {string} _message Mensagem de sucesso
     * @param {object} _data Objeto de retorno 
     */
    success(_message, _data) {
        this.messageOk = _message;
        this.data = _data;
    }
}

module.exports.DefaultResponse = DefaultResponse;
module.exports.ErrorsResponse = ErrorsResponse;