import Request from '../request'

export default (callback) => {
    Request.get('/api/users', {roleName : "ROLE_DEVELOPER"})
        .then((users)=>{
            callback(null ,users);
        })
        .catch((err)=>{
            callback(err);
        });
};