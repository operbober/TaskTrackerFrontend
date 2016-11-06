import Request from '../request'

export default (id, callback) =>{
    Request.put('/api/tasks/switchStatus/'+id, {})
        .then((data) =>{
            callback(null, data);
        })
        .catch((err)=>{
            callback(err, null);
        });
}