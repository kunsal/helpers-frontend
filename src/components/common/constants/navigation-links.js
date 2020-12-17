import Home from "../../Home";
import Front from "../../layouts/front";

export const navigationLinks = [
  {title: 'Home', component: Home, link: '/', exact: true, useInNavbar: true, transparentNav: true, layout: Front},
  // {title: '', component: Bikers, link: '/bikers', useInNavbar: true},
  // {title: 'Bikers Location', component: Location, link: '/bikers-location', exact: true, useInNavbar: true},
  // {title: 'Photos', component: Photos, link: '/photos', useInNavbar: true},
  // {title: 'Biker', component: Biker, link: '/biker/:id', exact: true},
  // {title: 'Contribute', component: Contribution, link: '/contribute', exact: true, useInNavbar: true},
]