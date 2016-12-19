import Request from '../request'

export default (tag, callback) => {
    Request.get('/api/tasks/byTag/'+tag, {})
        .then((tasks)=>
        {
            callback(null, tasks);
        })
        .catch((err)=>{
            callback(err);
        });
};