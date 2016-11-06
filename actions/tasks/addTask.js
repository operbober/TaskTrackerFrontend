import Request from '../request'

export default (taskData, callback) => {
    Request.post('/api/tasks', taskData)
        .then((task)=>
        {
            callback(null, task);
        })
        .catch((err)=>{
            callback(err, null);
        });
}