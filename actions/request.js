'use strict';

import request from 'superagent';
import cookie from 'react-cookie';

const LOGIN_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic dGFza3RyYWNrZXI6dGFza3RyYWNrZXI='
};

const HEADERS = {
    Accept: 'application/json'
};

const SERVER = "http://localhost:3000";

var builder = (httpMethod, apiMethod, params) => {

    let paramsTransport = httpMethod === 'get'
        ? 'query'
        : 'send';
    var headers = apiMethod === "/api/login"
        ? LOGIN_HEADERS
        : Object.assign(HEADERS, {'Authorization' : cookie.load('authToken')});
    apiMethod = SERVER + apiMethod;

    return new Promise((resolve, reject) => {
        request[httpMethod](apiMethod)
            .set(headers)
            [paramsTransport](params)
            .end((err, res) => {
                if (err || !res || !res.ok) {
                    reject(err);
                } else {
                    resolve(res.body, res);
                }
            });
    });
};

export default {
    get(apiMethod, params) {
        return builder('get', apiMethod, params);
    },

    post(apiMethod, params) {
        return builder('post', apiMethod, params);
    },

    put(apiMethod, params) {
        return builder('put', apiMethod, params);
    },

    delete(apiMethod, params) {
        return builder('delete', apiMethod, params);
    }
};
