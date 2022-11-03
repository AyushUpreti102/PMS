import HomePage from './components/HomePage.vue'
import LoginPage from './components/LoginPage.vue'
import SignUp from './components/SignUp.vue'
import dashBoard from './components/dashBoard.vue'
import UserProfile from './components/UserProfile.vue'
import ListOfUsers from './components/ListOfUsers.vue'
export default[
    {path: '/', component: HomePage},
    {path: '/Login', component: LoginPage},
    {path: '/Signup', component: SignUp},
    {path: '/dashBoard', component: dashBoard},
    {path: '/Profile', component: UserProfile},
    {path: '/List', component: ListOfUsers},
]