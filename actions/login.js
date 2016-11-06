import Request from './request'

export default (username, password, callback) => {
    var body = {
        grant_type:'password',
        username : username,
        password : password
    };
    Request.post('/api/login', body)
        .then((data) => {
            const authToken = data.token_type+" "+data.access_token;
            callback(null, authToken);
        })
        .catch((err) => {
            callback(err);
        });
};