import Request from '../request'

export default (callback) => {
    Request.get("/api/tasks/tags", {})
        .then((tags)=>
        {
            callback(null, tags);
        })
        .catch((err)=>{
            callback(err);
        });
};