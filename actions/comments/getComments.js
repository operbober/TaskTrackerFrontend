import Request from '../request'

export default (callback) => {
    Request.get("/api/comments", {})
        .then((comments)=>
        {
            callback(null, comments);
        })
        .catch((err)=>{
            callback(err);
        });
};