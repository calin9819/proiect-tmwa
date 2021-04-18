const stringifyParams = (params) => {
    let result = '?';
    for (let key in params) {
        result = result + '&' + key + '=' + params[key]; 
    }

    return result;
}

export default stringifyParams;


export const dateToString = (date) => {
    console.log(date)
    return date.toISOString().split('T')[0];
};