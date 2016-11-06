import Request from '../request'

export default (id, callback) => {
    Request.delete('/api/users/'+id)
        .then(()=>{
            callback(null);
        })
        .catch((err) =>{
            callback(err);
        })
}