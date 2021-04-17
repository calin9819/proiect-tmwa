const stringifyParams = (params) => {
    let result = '?';
    for (let key in params) {
        result = result + '&' + key + '=' + params[key]; 
    }

    return result;
}

export default stringifyParams;