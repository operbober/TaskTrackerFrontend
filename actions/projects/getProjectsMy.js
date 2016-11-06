import Request from '../request'

export default (callback) => {
    Request.get("/api/projects/my", {})
        .then((projects)=>
        {
            callback(null, projects);
        })
        .catch((err)=>{
            callback(err);
        });
};