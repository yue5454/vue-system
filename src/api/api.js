import Axios from 'axios'
import VueCookie from 'vue-cookie'

const apiPrefix = 'https://ueys86rk5l.execute-api.us-west-2.amazonaws.com/v1';
const lilyTest = 'https://26zaald1sl.execute-api.us-east-1.amazonaws.com/test';
		
Axios.interceptors.request.use((config) => {

	config.headers.Accept = 'application/json';
	return config;

},(err) => {
	return Promise.reject(err);
});

const getConfig = (type, url, data) => {
	let config = {
		method: type,
		url: url,
	}
	if (data) {
		if(type == 'get'){
			config.params = data;
		} else {
			config.data = data;
		}
	}
	config.headers = {'dcca_token':VueCookie.get('token')};
	return config;
}

// login
export const Login = (params) => {let config = getConfig('post',`${apiPrefix}/users/login`,params); return Axios(config);}
export const Register = (params) => {let config = getConfig('post',`${apiPrefix}/users`,params); return Axios(config);}

// Model
export const getModelList = () => {let config = getConfig('get',`${apiPrefix}/models`); return Axios(config);}
export const createModel = (params) => {let config = getConfig('post',`${apiPrefix}/models`,params); return Axios(config);}
export const updateModel = (params) => {let config = getConfig('put',`${apiPrefix}/models/${params.id}`,params); return Axios(config);}
export const deleteModel = (params) => {let config = getConfig('delete',`${apiPrefix}/models?model_id=${params.model_id}`,params); return Axios(config);}
export const modelInfo = (params) => {let config = getConfig('get',`${apiPrefix}/models/${params.model_id}`,params); return Axios(config);}

// Device
export const getDeviceList = (params) => {let config = getConfig('get',`${apiPrefix}/devices?offset=${params.offset}&limit=${params.limit}`); return Axios(config);}
export const createDevice = (params) => {let config = getConfig('post',`${apiPrefix}/devices`, params); return Axios(config);}
export const deleteDevice = (params) => {let config = getConfig('delete',`${apiPrefix}/devices/${params.id}`); return Axios(config);}
export const deviceInfo = (params) => {let config = getConfig('get',`${apiPrefix}/devices/${params.id}`); return Axios(config);}
export const generateDeviceNO = (params) => {let config = getConfig('get',`${apiPrefix}/est/device?fuid=${params.fuid}`); return Axios(config);}
export const bindTags = (params) => {let config = getConfig('post',`${apiPrefix}/devices/tags`, params); return Axios(config);}

// Solution
export const getSolutionList = () => {let config = getConfig('get',`${apiPrefix}/solutions`); return Axios(config);}
export const deleteSolution = (params) => {let config = getConfig('delete',`${apiPrefix}/solutions`, params); return Axios(config);}
export const createSolution = (params) => {let config = getConfig('post',`${apiPrefix}/solutions`, params); return Axios(config);}
export const editSolution = (params) => {let config = getConfig('put',`${apiPrefix}/solutions`, params); return Axios(config);}
export const solutionInfo = (params) => {let config = getConfig('get',`${apiPrefix}/solutions/${params.id}`); return Axios(config);}
export const deploySolution = (params) => {let config = getConfig('post',`${apiPrefix}/tasks`, params); return Axios(config);}

// task
export const getTaskList = () => {let config = getConfig('get',`${apiPrefix}/tasks`); return Axios(config);}
export const taskInfo = (params) => {let config = getConfig('get',`${apiPrefix}/tasks/${params.id}`); return Axios(config);}
export const deleteTask = (params) => {let config = getConfig('delete',`${apiPrefix}/tasks?task_ids=${params.task_ids}`); return Axios(config);}

// app
export const getAppList = (params) => {let config = getConfig('get',`${apiPrefix}/applications`, params); return Axios(config);}
export const createApp = (params) => {let config = getConfig('post',`${apiPrefix}/applications`,params); return Axios(config);}
export const updateApp = (params) => {let config = getConfig('put',`${apiPrefix}/builder/projects/${params.name}`,params); return Axios(config);}
export const deleteApp = (params) => {let config = getConfig('delete',`${apiPrefix}/applications/${params.id}`); return Axios(config);}
export const appInfo = (params) => {let config = getConfig('get',`${apiPrefix}/builder/projects/${params.project_id}`); return Axios(config);}
export const getMirrorList = () => {let config = getConfig('get', `${apiPrefix}/applications/mirrors`); return Axios(config);}
export const getVendorList = () => {let config = getConfig('get', `${apiPrefix}/vendors`); return Axios(config);}

// Tag
export const getTags = () => {let config = getConfig('get',`${apiPrefix}/devices/tags`); return Axios(config);}
export const getVersions = () => {let config = getConfig('get',`${apiPrefix}/solution/images/version`); return Axios(config);}

// builder
export const getBuilderList = (params) => {let config = getConfig('get',`${apiPrefix}/builder/projects`, params); return Axios(config);}
export const createBuilder = (params) => {let config = getConfig('post',`${apiPrefix}/builder/projects`,params); return Axios(config);}
export const updateBuilder = (params) => {let config = getConfig('put',`${apiPrefix}/builder/projects/${params.name}`,params); return Axios(config);}
export const deleteBuilder = (params) => {let config = getConfig('delete',`${apiPrefix}/builder/projects/${params.project_id}`); return Axios(config);}
export const builderInfo = (params) => {let config = getConfig('get',`${apiPrefix}/builder/projects/${params.project_id}`); return Axios(config);}
export const startBuilder = (params) => {let config = getConfig('post',`${apiPrefix}/builder/projects/${params.project_id}`,params); return Axios(config);}
export const getEnvironments = () => {let config = getConfig('get',`${apiPrefix}/builder/environments`); return Axios(config);}
export const getRepositories = () => {let config = getConfig('get',`${apiPrefix}/builder/repositories`); return Axios(config);}

// user test 
export const getUserList = (params) => {let config = getConfig('post', `${lilyTest}/test`, params); return Axios(config);}



