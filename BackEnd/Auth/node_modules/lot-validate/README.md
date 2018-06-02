<a><h1 align="center">lot-validate</h1></a>
<p align="center">Best way to validate your <a href="https://www.mongodb.com/">mongo</a> Schemas and best practices of response API.</p>
<p align="center"><a href="https://www.npmjs.com/package/lot-validate">
<img width=40px; src="https://docs.npmjs.com/images/npm.svg" alt="npm download"></a>
</p>

### Features
Focused on backend, lot-validate has the following characteristics

- Response standardization
- Fast development
- Validation of mongo Schemas


## How to use

### Installing

> ##### Node.js
`npm i lot-validate`

### Importing
    const { DefaultResponse, SchemaValidate  } = require("lot-validate")

### Using
> #### For response with error 
>
>```node
>    var  response  =  new  DefaultResponse();
>    if(1 != 2)
>      response.addErro("Different number", "number_field");
>```
>
>>Response:
>
>```node
>    {
>	"errors": [
>		{
>			"field": "number_field",
>			"error": "Different number"
>		}
>	],
>	"messageOk": "",
>	"data": {},
>	"hasError": true
>    }
>```
____

>#### For response with success
>
>
>```node
>    var response = SchemaValidate.Validate(User, _req.body);
>    if (!response.hasError){
>        var dataUser = await User.create(_req.body)
>        response.success("Salvo com sucesso!", dataUser);
>    }
>    return response;
>```

>
>>Response:
>
>```node
>    {
>    "errors": [],
>    "messageOk": "Salvo com sucesso!",
>    "data": {
>        "_id": "5b11da28775d7939748f7d47",
>        "email": "eliveltongama@hotmail.com",
>        "password": "123456",
>        "username": "elivelton.gama"
>    },
>    "hasError": false
>    }
>```


----

>#### Validating mongo Schema
>
>
> ```node
>    public DefaultResponse validating(myObjectRequest)
>	{
>			return SchemaValidate.Validate(mongoSchema, myObjectRequest);
>	}
>```
>
>>Return: object DTO of Response (DefaultResponse)

### Class
Below is the return class and its attributes
>#### DefaultResponse
>
>```node
>	class DefaultResponse {
>		errors: ErrorsResponse[]
>		messageOk: string;
>		data: {}
>		hasError: boolean;
>	}
>```

>#### ErrorsResponse 
>
>```node
>	class ErrorsResponse {
>		field : string
>		error: string;
>	}
>```
