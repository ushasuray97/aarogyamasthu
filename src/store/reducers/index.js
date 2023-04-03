import { combineReducers } from 'redux';
import {loginSlice} from './LoginSlice';
import {logoutSlice} from './logoutSlice';
/// Manage Screen
import {manageScreenSlice} from "./resourceAllocation/manageScreen/GetManageScreen";
import {postManageScreenSlice} from "./resourceAllocation/manageScreen/PostManageScreen";
import {putManageScreenSlice} from "./resourceAllocation/manageScreen/EditManageScreen";
import {deleteManageScreenSlice} from "./resourceAllocation/manageScreen/DeleteManageScreen";
/// Manage Role
import { manageRoleSlice } from './resourceAllocation/manageRole/GetManageRole';
import { postManageRoleSlice } from './resourceAllocation/manageRole/PostMangeRole';
import { putManageRoleSlice } from './resourceAllocation/manageRole/EditManageRole';
import { deleteManageRoleSlice } from './resourceAllocation/manageRole/DeleteManageRole';
//Manage Users
import {createUserSlice} from './resourceAllocation/manageUser/createuserSlice'
import {getUsersSlice} from './resourceAllocation/manageUser/getUsersSlice'
import {getDepartmentsSlice} from './resourceAllocation/manageUser/getDepartmentSlice'
import {getRolesSlice} from './resourceAllocation/manageUser/getRoleSlice'
import { updateUserSlice } from './resourceAllocation/manageUser/updateUser';
import { resetLinkSlice } from './resourceAllocation/manageUser/resetLinkSlice';
import { deleteUserSlice } from './resourceAllocation/manageUser/deleteUserSlice';
//Manage Profile
import { getUserSlice } from './manageProfile/getUser';
//Manage Projects
import {addProjectSlice} from './manageProjects/addProjectSlice';
import { getProjectsSlice } from './manageProjects/getProjectSlice';

export const reducer = combineReducers({ 
   /// Login 
   loginUser: loginSlice.reducer,
   logoutUser:logoutSlice.reducer,
   /// Manage Screen
   manageScreen: manageScreenSlice.reducer,
   postManageScreen: postManageScreenSlice.reducer,
   putManageScreen: putManageScreenSlice.reducer,
   deleteManageScreen: deleteManageScreenSlice.reducer,
   /// Manage Role
   manageRole: manageRoleSlice.reducer,
   postManageRole: postManageRoleSlice.reducer,
   putManageRole: putManageRoleSlice.reducer,
   deleteManageRole: deleteManageRoleSlice.reducer,
   //Manage Users
    getRolesSlice:getRolesSlice.reducer,
    getDepartmentsSlice:getDepartmentsSlice.reducer,
    createUserSlice:createUserSlice.reducer,
    getUsersSlice:getUsersSlice.reducer,
    updateUserSlice:updateUserSlice.reducer,
    resetLinkSlice:resetLinkSlice.reducer,
    deleteUser: deleteUserSlice.reducer,
    //Manage Profile
    getUser:getUserSlice.reducer,
    //Manage Projects
    addProject:addProjectSlice.reducer,
    getProjects:getProjectsSlice.reducer

})     