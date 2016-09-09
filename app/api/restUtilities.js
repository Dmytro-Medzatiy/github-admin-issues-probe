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

function parse_link_header(header) {
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = header.split(',');
    var params = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        params[name] = url;
    }
    return params;
}
//owner, repoName, options, login, password
function fetchIssues(URL, login, password) {

    const headers = login.length>0 ? {"Authorization": "Basic " + btoa(`${login}:${password}`),
        "Accept": "application/json"} : {"Accept": "application/json"};
    const options = {
        "method": "GET",
        "headers": headers
    };
    return fetch(URL, options)
        .then(response => {
            let params = response.headers.get("Link").split(',');
            let links = [];
            for (let i = 0; i < params.length; i++) {
                let link = params[i].split(';')[0];
                link = link.substr(1, link.length - 2).trim();
                let rel = params[i].split(';')[1];
                rel = rel.split('\"')[1].trim();
                links.push(
                    {
                        link: link,
                        rel: rel
                    });

            }
            if (response.status >= 200 && response.status < 300) {
                return response.text()
                    .then(responseText => {
                        //console.log('Server response: ' + responseText);
                        let jsonData = undefined;
                        try {
                            jsonData = JSON.parse(responseText);
                        } catch (e) {
                        }
                        if (jsonData.error === true) {
                            let errorText = '';
                            if (_.isArray(jsonData.errors)) {
                                jsonData.errors.forEach(errText => {
                                    errorText += '\n' + errText;
                                });
                            } else {
                                errorText = JSON.stringify(jsonData.errors);
                            }
                            throw Error(errorText);
                        } else if (jsonData.data !== undefined) {
                            jsonData = jsonData.data;
                        }
                        return {
                            jsonData: jsonData,
                            links: links
                        };
                    });
            }
            else {
                if (response.status == 404) {
                    return {
                        notFound: true
                    }
                } else {
                    throw new Error(response.statusText);
                }
            }
        });
}

export {
    getData,
    checkAuthorization,
    putData,
    getRepoList,
    fetchIssues
}