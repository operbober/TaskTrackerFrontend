import Request from '../request'

export default (by, id, callback) => {
    Request.get('/api/tasks/'+by+id, {})
        .then((tasks)=>
        {
            callback(null, tasks);
        })
        .catch((err)=>{
            callback(err);
            
        });
};