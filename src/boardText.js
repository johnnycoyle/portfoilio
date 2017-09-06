// const boardText = [" ", "WORK", "CONTACT"," "];

// const boardText = ["","         "];

let emptyMenu = 
"                      "+
"                      "+
"                      "+
"                      "

let workMenu = 
"react-rpm             "+
"spotify mixtape       "+
"ui mockups            "+
"travelboardjs         ";

let aboutMenu = 
"front end js developer"+
" react|webpack|css3   "+
" redux|express|sass   "+
" node |testing|jquery ";

let contactMenu =
"                e-mail"+
"                github"+
"              linkedin"+
"     los angeles based";

let boardText = [
"asj!we$jal#$aaS6&9sksd"+
"                      "+
"                      "+
"                      "+
"                      ",
' '];

const startText = " work  about  contact "+emptyMenu;
const unselectedMenu = " work  about  contact ";

boardDisplay = {
  none: {
    none:   " work  about  contact "+emptyMenu,
    work:   " WORK  about  contact "+workMenu,
    about:  " work  ABOUT  contact "+aboutMenu,
    contact:" work  about  CONTACT "+contactMenu
  },
  work: {
    none:   " WORK  about  contact "+emptyMenu,
    work:   " WORK  about  contact "+workMenu,
    about:  " WORK  ABOUT  contact "+aboutMenu,
    contact:" WORK  about  CONTACT "+contactMenu
  },
  about: {
    none:   " work  ABOUT  contact "+emptyMenu,
    work:   " WORK  ABOUT  contact "+workMenu,
    about:  " work  ABOUT  contact "+aboutMenu,
    contact:" work  ABOUT  CONTACT "+contactMenu
  },
  contact: {
    none:   " work  about  CONTACT "+emptyMenu,
    work:   " WORK  about  CONTACT "+workMenu,
    about:  " work  ABOUT  CONTACT "+aboutMenu,
    contact:" work  about  CONTACT "+contactMenu
  }
}




