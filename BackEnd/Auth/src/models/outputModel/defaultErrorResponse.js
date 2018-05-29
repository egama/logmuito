class ErrorsResponse {
    constructor(_field, _error) {
        this.field = _field;
        this.error = _error;
    }
}

class DefaultErrorResponse {
    constructor() {
        this.errors = [];
        this.messageOk = "";
        this.data = {};
    }

    get hasError() {
        return this.errors.length > 0;
    }

    /**
     * Método que lança erro no objeto
     * @param {string} _error Erro ocorrido
     * @param {string} _field Campo do erro ocorrido
     */
    addErro(_error, _field) {
        var error = new ErrorsResponse();
        error.error = _error;
        error.field = _field;
        this.errors.push(error);
    }

    /**
     * Método que lança objeto de sucesso
     * @param {string} _message Mensagem de sucesso
     * @param {object} _data Objeto de retorno 
     */
    success(_message, _data){
        this.messageOk = _message;
        this.data = _data;
    }
}

module.exports = DefaultErrorResponse;