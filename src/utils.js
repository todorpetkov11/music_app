export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
};

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
};

export function clearUserData() {
    sessionStorage.removeItem('userData');
};

export function paraseQuerystring(string) {
    // const params = string
    //     .split('&')
    //     .map(p => p.split('='))
    //     .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    let params = string.split(' ');
    console.log(params[2])
    return `${params[2]}`;
};