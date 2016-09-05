//"headers":{"Authorization": "token "}



function getData(URL,login, password ){
    const headers = login.length>0 ? {"Authorization": "Basic " + btoa(`${login}:${password}`)} : {"Accept": "application/json"};
    const options={
        "method": "GET",
        "headers": headers
    };
    return fetch(URL, options)
        .then(response => {

            if (response.status >= 200 && response.status<300) {
                return response.text()
                    .then(responseText => {
                        //console.log('Server response: ' + responseText);
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

function checkAuthorization(login, password) {
    const URL = "https://api.github.com/users/" + login;
    const fetchOptions = {
        "headers": {
            "Authorization": "Basic " + btoa(`${login}:${password}`)
        }
    };

    return fetch(URL, fetchOptions)
        .then(response => {

            if (response.status >= 200 && response.status < 300) {
                return true;
            } else {
                if (response.status == 401) {
                    return false;
                }
            }

        }).catch(
            error => {
                throw new Error(error)
            }
        );
};

function putData(URL,login, password, data ){
    const headers = login.length>0 ? {"Authorization": "Basic " + btoa(`${login}:${password}`)} : {"Accept": "application/json"};
    const options={
        "method": "PUT",
        "body": JSON.stringify(data),
        "headers": headers
    };
    return fetch(URL, options)
        .then(response => {

            if (response.status >= 200 && response.status<300) {
                return response.status
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

function getRepoList(author, login, password){

    const URL = 'https://api.github.com/users/'+author+'/repos';
    return getData(URL, login, password).then(
        response=> {
            return response.map((repo) => {
                return {
                    repoName: repo.name,
                    owner: repo.owner.login,
                    description: repo.description,
                    stars: repo.stargazers_count,
                    openIssues: repo.open_issues_count
                }
            });
        }
    ).catch(
        error => { throw new Error(error) }
    );
}

export {
    getData,
    checkAuthorization,
    putData,
    getRepoList
}