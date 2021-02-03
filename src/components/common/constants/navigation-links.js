import Home from "../../Home";
import Front from "../../layouts/front";
import Login from "../../Login";
import AuthLayout from "../../layouts/auth";
import HelpDetails from "../../HelpDetails";
import Register from "../../Register";
import CreateHelp from "../../CreateHelp";

export const navigationLinks = [
  {title: 'Home', component: Home, link: '/', exact: true, useInNavbar: true, transparentNav: true, layout: Front},
  {title: 'Login', component: Login, link: '/login', exact: true, useInNavbar: false, transparentNav: true, layout: AuthLayout},
  {title: 'Register', component: Register, link: '/register', exact: true, useInNavbar: false, transparentNav: true, layout: AuthLayout},
  {title: 'Help Details', component: HelpDetails, link: '/help/:id', exact: true, useInNavbar: false, transparentNav: true, layout: Front},
  {title: 'Help Request', component: CreateHelp, link: '/request-help', exact: true, useInNavbar: true, transparentNav: true, layout: Front}
]