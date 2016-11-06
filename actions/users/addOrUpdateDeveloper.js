import Request from '../request'

export default (userData, callback) => {
    Request.post('/api/users', userData)
        .then((user)=>{
            callback(null, user);
        })
        .catch((err) =>{
            callback(err);
        })
}