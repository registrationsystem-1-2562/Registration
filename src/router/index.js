import Vue from 'vue'
import Router from 'vue-router'

// unauthentication components
import Home from '../components/Home'
import LoginStudent from '../components/LoginStudent'
import LoginTeacher from '../components/LoginTeacher'

// administrator component
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'
import Upload from '../components/admin/system/Upload'
import SchoolYear from '../components/admin/system/SchoolYear'
import Statistic from '../components/admin/system/Statistic'
import ManageYear from '../components/admin/system/ManageYear'

// teacher component
import TeacherDashBoard from '../components/teacher/Dashboard'
import Notice from "../components/teacher/system/Notice"
import Profile from '../components/teacher/system/Profile'
import RegYear from '../components/teacher/system/RegYear'

// student component
import StudentDashboard from '../components/student/Dashboard'
import SelectProject from '../components/student/system/SelectProject'
import ViewProfile from '../components/student/system/ViewProfile'
import ViewProject from '../components/student/system/ViewProject'
import StudentProfile from '../components/student/system/Profile'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/slogin',
            name: 'LoginStudent',
            component: LoginStudent
        },
        {
            path: '/tlogin',
            name: 'LoginTeacher',
            component: LoginTeacher
        },
        {
            path: '/alogin',
            name: 'Login',
            component: Login,
        },
        {
            // admin route
            path: '/admin/:id',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'schoolyear',
                    component: SchoolYear
                },
                {
                    path: 'upload',
                    component: Upload
                },
                {
                    path: 'statistic',
                    component: Statistic
                },
                {
                    path: 'manage',
                    component: ManageYear
                }
            ]
        },
        {
            // teacher route
            path: '/teacher/:id',
            component: TeacherDashBoard,
            children: [
                {
                    path: 'notice',
                    component: Notice
                },
                {
                    path: 'profile',
                    component: Profile
                },
                {
                    path: 'reg',
                    component: RegYear
                }
            ]
        },
        {
            // student route
            path: '/student/:id',
            component: StudentDashboard,
            children: [
                {
                    path: 'select',
                    component: SelectProject
                },
                {
                    path: 'teacher',
                    component: ViewProfile
                },
                {
                    path: 'project',
                    component: ViewProject
                },
                {
                    path: 'profile',
                    component: StudentProfile
                }
            ]
        }
    ]
})