import Request from '../request'

export default (projectData, callback) => {
    Request.post('/api/projects', projectData)
        .then((project)=>
        {
            callback(null, project);
            
        })
        .catch((err)=>{
            callback(err, null);
        });
}