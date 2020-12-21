import Home from "../../Home";
import Front from "../../layouts/front";
import Login from "../../Login";
import AuthLayout from "../../layouts/auth";
import HelpDetails from "../../HelpDetails";

export const navigationLinks = [
  {title: 'Home', component: Home, link: '/', exact: true, useInNavbar: true, transparentNav: true, layout: Front},
  {title: 'Login', component: Login, link: '/login', exact: true, useInNavbar: false, transparentNav: true, layout: AuthLayout},
  {title: 'Help Details', component: HelpDetails, link: '/help/:id', exact: true, useInNavbar: false, transparentNav: true, layout: Front},
  // {title: '', component: Bikers, link: '/bikers', useInNavbar: true},
  // {title: 'Bikers Location', component: Location, link: '/bikers-location', exact: true, useInNavbar: true},
  // {title: 'Photos', component: Photos, link: '/photos', useInNavbar: true},
  // {title: 'Biker', component: Biker, link: '/biker/:id', exact: true},
  // {title: 'Contribute', component: Contribution, link: '/contribute', exact: true, useInNavbar: true},
]