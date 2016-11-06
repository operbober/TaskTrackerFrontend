import Request from '../request'

export default (callback) => {
    Request.get("/api/projects", {})
        .then((projects)=>
        {
            callback(null, projects);
        })
        .catch((err)=>{
           callback(err);
        });
};