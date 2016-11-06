import Request from '../request'

export default (callback) => {
    Request.get('/api/users/me', {})
        .then((user)=>{
            callback(null ,user);
        })
        .catch((err)=>{
            callback(err);
        });
};