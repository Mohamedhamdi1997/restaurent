const data = [
  {
    id: "gogo",
    icon: "iconsminds-receipt-4",
    label: "Catégorie",
    to: "/app/gogo",
   // subs: [
    //  {
      //  icon: "iconsminds-computer",
        //label: "Informatique",
        //to: "/app/gogo/start"
      //} ,
      //{
        //icon: "iconsminds-open-book",
        //label: "Livre",
        //to: "/app/gogo/start"
      //}  ,
      //{
        //icon: "iconsminds-jacket",
        //label: "Mode",
        //to: "/app/gogo/start"
    //  }     
   // ]
  },
  {
     id: "secondmenu",
     icon: "iconsminds-shopping-cart",
     label: "Panier",
     to: "/app/second-menu",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.second",
  //       to: "/app/second-menu/second"
  //     }
  //   ]
  // },
  // {
  //  id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  },
  {
    id: "bobo",
    icon: "iconsminds-students",
    label: "Scolarité",
    to: "/app/bobo",
         subs: [
      {
        icon: "iconsminds-student-male",
        label: "Eléves",
        to: "/app/bobo/eleves"
      } ,
      {
        icon: "iconsminds-mens",
        label: "Enseignants",
        to: "/app/gogo/start"
      }  ,
      {
        icon: "iconsminds-business-man-woman",
        label: "parents",
        to: "/app/gogo/start"
     }     
    ]
  }

  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow:true
  // }


  
];
export default data;
