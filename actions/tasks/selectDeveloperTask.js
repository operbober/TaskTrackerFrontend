import Request from '../request'

export default (id, developer, callback) =>{
    Request.put('/api/tasks/selectDeveloper/'+id, developer)
        .then((data) =>{
            callback(null, data);
        })
        .catch((err)=>{
            callback(err, null);
        });
}