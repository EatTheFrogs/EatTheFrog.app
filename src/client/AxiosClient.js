import axios from 'axios';
import { oktaWidget } from '../components/login/OktaSignInWidget';
import { POST_LOGOUT_REDIRECT_URI } from '../config/OktaConfig';

export const forceSignIn = () => {
    oktaWidget.authClient.signOut({
        clearTokensBeforeRedirect: true,
        postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI
    });
}

const successInterceptor = (response) => {
    return response.data;
}

const errorInterceptor = (error) => {
    console.log(JSON.stringify(error))
    if (error?.response?.status === 401) {
        forceSignIn();
        alert(`Authorization error occurred. Please signin and retry.`);
    } 
    return Promise.reject(error);
}

const axiosClient = axios.create();
axiosClient.interceptors.response.use(successInterceptor, errorInterceptor);
axiosClient.defaults.timeout = 10000;
axiosClient.defaults.withCredentials = false;
axiosClient.defaults.baseURL = 'https://EatTheFrog.app/api';
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};


const getAuthHeaderConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

/*
// USER ENDPOINTS
*/
export const getUserRequest = (userUuid, token) => {
    return axiosClient.get(`/user/${userUuid}`, getAuthHeaderConfig(token));
}


/*
// GOAL ENDPOINTS
*/
export const getAllGoalsRequest = (userUuid, token) => {
    return axiosClient.get(`/goals/${userUuid}`, getAuthHeaderConfig(token));
}

export const postGoalRequest = (goal, token) => {
    return axiosClient.post(`/goals/create`, goal, getAuthHeaderConfig(token));
}

export const postGoalObject = (userUuid, name, description) => {
    return {
        "userUuid": userUuid,
        "name": name,
        "description": description
    };
}

export const patchGoalRequest = (goal, token) => {
    return axiosClient.patch(`/goals/update`, goal, getAuthHeaderConfig(token));
}

export const deleteGoalRequest = (goalId, token) => {
    return axiosClient.delete(`/goals/delete/${goalId}`, getAuthHeaderConfig(token));
}


/*
// EVENT ENDPOINTS
*/
export const postEventRequest = (event, token) => {
    return axiosClient.post(`/events/create`, event, getAuthHeaderConfig(token));
}

export const postEventObject = (eventType, completedDate, userUuid, goalId, name, fields) => {
    return {
        "completedDate": completedDate,
        "type": eventType,
        "userUuid": userUuid,
        "goalId": goalId,
        "name": name,
        "fields": fields
    };
}

export const postEventFieldRequest = (eventId, field, token) => {
    return axiosClient.post(`/events/create/${eventId}/field`, field, getAuthHeaderConfig(token));
}
  
export const patchEventRequest = (event, token) => {
    return axiosClient.patch(`/events/update`, event, getAuthHeaderConfig(token));
}

export const patchEventFieldRequest = (eventId, field, token) => {
    return axiosClient.patch(`/events/update/${eventId}/field`, field, getAuthHeaderConfig(token));
}
  
export const deleteEventRequest = (eventId, token) => {
    return axiosClient.delete(`/events/delete/${eventId}`, getAuthHeaderConfig(token));
}

export const deleteEventFieldRequest = (eventId, fieldId, token) => {
    return axiosClient.delete(`/events/delete/${eventId}/field/${fieldId}`, getAuthHeaderConfig(token));
}

/*
// EVENTTEMPLATE ENDPOINTS
*/
export const postEventTemplateRequest = (template, token) => {
    return axiosClient.post(`/templates/create`, template, getAuthHeaderConfig(token));
}

export const postDefaultEventTemplateObject = (userUuid, goalId, name, fields) => {
    return {
        "type": "default",
        "userUuid": userUuid,
        "goalId": goalId,
        "name": name,
        "fields": fields
    };
}

export const postLiftEventTemplateObject = (userUuid, goalId, name, lifts) => {
    return {
        "type": "lift",
        "userUuid": userUuid,
        "goalId": goalId,
        "name": name,
        "lifts": lifts
    };
}

export const postEventTemplateFieldRequest = (templateId, field, token) => {
    return axiosClient.post(`/templates//create/${templateId}/field`, field, getAuthHeaderConfig(token));
}

export const postDefaultFieldObject = (name, fieldType, unit) => {
    return {
        "name": name,
        "type": fieldType,
        "unit": unit
    };
}

export const postLiftFieldObject = (userUuid, goalId, name, lifts) => {
    return {
        "type": "lift",
        "userUuid": userUuid,
        "goalId": goalId,
        "name": name,
        "lifts": lifts
    };
}
  
export const patchEventTemplateRequest = (template, token) => {
    return axiosClient.patch(`/templates/update`, template, getAuthHeaderConfig(token));
}

export const patchEventTemplateFieldRequest = (templateId, field, token) => {
    return axiosClient.patch(`/templates/update/${templateId}/field`, field, getAuthHeaderConfig(token));
}
  
export const deleteEventTemplateRequest = (templateId, token) => {
    return axiosClient.delete(`/templates/delete/${templateId}`, getAuthHeaderConfig(token));
}

export const deleteEventTemplateFieldRequest = (templateId, fieldId, token) => {
    return axiosClient.delete(`/templates/delete/${templateId}/field/${fieldId}`, getAuthHeaderConfig(token));
}