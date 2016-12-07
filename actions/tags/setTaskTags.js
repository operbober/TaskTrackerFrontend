import Request from '../request'

export default (tagsData, callback) => {
    Request.post('/api/tasks/tags', tagsData)
        .then((task)=>
        {
            callback(null, task);

        })
        .catch((err)=>{
            callback(err, null);
        });
}