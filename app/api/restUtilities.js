
function getDataUnauthorized(URL, options={"headers": {}}){

    return fetch(URL, options)
        .then(response => {
            //console.log('Received response: ' + JSON.stringify(response, null, 4));
            //console.log('Received response: ' + response.status);
            //console.log('Received response status text: ' + response.statusText);

            if (response.status >= 200 && response.status<300) {
                return response.text()
                    .then(responseText => {
                        console.log('Server response: ' + responseText);
                        let jsonData = undefined;
                        try{
                            jsonData = JSON.parse(responseText);
                        } catch(e){
                        }
                        if(jsonData.error === true){
                            let errorText = '';
                            if(_.isArray(jsonData.errors)){
                                jsonData.errors.forEach(errText => {
                                    errorText += '\n' + errText;
                                });
                            } else {
                                errorText = JSON.stringify(jsonData.errors);
                            }
                            throw Error(errorText);
                        } else if(jsonData.data !== undefined){
                            jsonData = jsonData.data;
                        }
                        return jsonData;
                    });
            }
            else {
                if (response.status == 404 ){
                    return {
                        notFound: true
                    }
                } else {
                    throw new Error(response.statusText);
                }
            }
        });
};


export {
    getDataUnauthorized,
}