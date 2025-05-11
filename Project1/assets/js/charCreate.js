//first checks if the browser is old
legacy();

//all the data
const selectMenu = [
  ['What position would you like?', '0', '--Select an Option--', 'Melee', 'Ranged'],
  ['What class would you like?', '1', '--Select an Option--', 'Swordsman', 'Spearman'],
  ['What class would you like?', '2', '--Select an Option--', 'Bowman', 'Gunman'],
  ['What weapon would you like?', '3', '--Select an Option--', 'Shortsword', 'Bastard Sword', 'Longsword'],
  ['What weapon would you like?', '4', '--Select an Option--', 'Short Spear', 'Long Spear', 'Halberd'],
  ['What weapon would you like?', '5', '--Select an Option--', 'Shortbow', 'Composite Bow', 'Longbow'],
  ['What weapon would you like?', '6', '--Select an Option--', 'Flintlock', 'Musket', 'Rifle']
];

//array for holding the menu selections
var selections = [];

//the global variables which consists of the number on the menu, container/loadout id, and the result strings/textNodes
var menuNum = 0;
var container = document.getElementById('container');
var pLoadout = document.getElementById('pLoadout');
var resultsText = '';
var results = '';

//calls these two functions first to display the previous loadout if there is cookies/local storage for it as well as builds the first menu
displayLoadout();
dynamicSelect(menuNum);

//function for building the next menu by choosing what piece of data to pull and removes childs till it reaches the menu that was changed
function nextMenu(depth, index, option)
{
  //does nothing if the select option was selected
  if(index == 0)
  {

  }
  else
  {
    //removes childs depending on depth
    if(depth == 0)
    {
      results = '';
      selections = [];
      selections.push(option);
      menuNum = 0;
      while(container.childElementCount > 2)
      {
        container.removeChild(container.lastChild);
        container.removeChild(container.lastChild);
      }
    }
    else if(depth == 1 || depth == 2)
    {
      results = '';
      selections.splice(1, selections.length);
      selections.push(option);
      menuNum = depth;
      while(container.childElementCount > 4)
      {
        container.removeChild(container.lastChild);
        container.removeChild(container.lastChild);
      }
    }
    //finds the next menu position in the data using menuNum and the current index of the option selected to choose the path
    if(menuNum == 0)
    {
      menuNum += parseInt(index);
      dynamicSelect(menuNum);
    }
    else if(menuNum == 1 || menuNum == 2)
    {
      menuNum *= 2;
      menuNum += parseInt(index);
      dynamicSelect(menuNum);
    }
    else
    {
      //if last menu is selected prints out the results and builds the form using the function form()
      let r = document.createElement('div');
      selections.splice(2, selections.length);
      selections.push(option);
      if(results != '')
      {
        container.removeChild(container.lastChild);
        container.removeChild(container.lastChild);
        resultsText = 'You are in a ' + selections[0] + ' position as a ' + selections[1] + ' using a ' + selections[2] + '!';
        results = document.createTextNode(resultsText);
        container.append(r);
        r.append(results);
      }
      else
      {
        resultsText = 'You are in a ' + selections[0] + ' position as a ' + selections[1] + ' using a ' + selections[2] + '!';
        results = document.createTextNode(resultsText);
        container.append(r);
        r.append(results);
      }
      form();
    }
  }
}

//dynamically builds the question textNodes and the options from the data
function dynamicSelect(qNum)
{
  //builds the question textNode
  let question = document.createTextNode(selectMenu[qNum][0]);
  let select = document.createElement('select');
  let q = document.createElement('div');
  select.onchange = function()
  {
    nextMenu(select.options[select.selectedIndex].value, select.selectedIndex, select.options[select.selectedIndex].text)
  };

  container.appendChild(q);
  q.appendChild(question);
  container.appendChild(select);

  //builds the options
  for(i = 2; i < selectMenu[qNum].length; i++)
  {
    let option = document.createElement('option');
    option.text = selectMenu[qNum][i];
    option.value = selectMenu[qNum][1];
    select.appendChild(option);
  }
}

//builds the form with header, name, email, comment, and submit button
function form()
{
  let h = document.createElement('div');
  let n = document.createElement('div');
  let e = document.createElement('div');
  let c = document.createElement('div');
  let s = document.createElement('div');
  let form = document.createElement('form');
  let header = document.createTextNode('Submit your loadout!');
  let name = document.createElement('input');
  let email = document.createElement('input');
  let comment = document.createElement('input');
  let submit = document.createElement('input');

  name.setAttribute('type', 'text');
  name.setAttribute('placeholder', 'Name');
  name.setAttribute('name', 'Name');
  name.setAttribute('required', '');
  email.setAttribute('type', 'email');
  email.setAttribute('placeholder', 'Email');
  email.setAttribute('name', 'Email');
  email.setAttribute('required', '');
  comment.setAttribute('type', 'textarea');
  comment.setAttribute('placeholder', 'Comment');
  comment.setAttribute('name', 'Comment');
  comment.setAttribute('required', '');
  submit.setAttribute('type', 'submit');
  form.setAttribute('id', 'f');
  form.setAttribute('onsubmit', 'saveLoadout()');

  container.appendChild(form);
  form.appendChild(h);
  h.appendChild(header);
  form.appendChild(n);
  n.appendChild(name);
  form.appendChild(e);
  e.appendChild(email);
  form.appendChild(c);
  c.appendChild(comment);
  form.appendChild(s);
  s.appendChild(submit);
}

//function for saving the form data and selected menu options as cookies and localStorage
function saveLoadout()
{
  let form = document.getElementById('f');
  for(i = 0; i < form.elements.length - 1; i++)
  {
    SetCookie(form.elements[i].name, form.elements[i].value, 3000);
    localStorage.setItem(form.elements[i].name, form.elements[i].value);
  }
  SetCookie('Loadout', resultsText, 3000);
  localStorage.setItem('Loadout', resultsText);
}

//displays the data saved from the cookies/localStorage an does nothing if there is no data
function displayLoadout()
{
  let head = document.createTextNode('Previous Loadout');
  let n = document.createElement('div');
  let e = document.createElement('div');
  let c = document.createElement('div');
  let l = document.createElement('div');
  if(GetCookie('Name') !== null)
  {
    let name = document.createTextNode('Name: ' + GetCookie('Name'));
    let email = document.createTextNode('Email: ' + GetCookie('Email'));
    let comment = document.createTextNode('Comment: ' + GetCookie('Comment'));
    let loadout = document.createTextNode('Loadout: ' + GetCookie('Loadout'));
    pLoadout.appendChild(head);
    pLoadout.appendChild(n);
    n.appendChild(name)
    pLoadout.appendChild(e);
    e.appendChild(email)
    pLoadout.appendChild(c);
    c.appendChild(comment)
    pLoadout.appendChild(l);
    l.appendChild(loadout)
  }
  else if(localStorage.getItem('Name') !== null)
  {
    let name = document.createTextNode('Name: ' + localStorage.getItem('Name'));
    let email = document.createTextNode('Email: ' + localStorage.getItem('Email'));
    let comment = document.createTextNode('Comment: ' + localStorage.getItem('Comment'));
    let loadout = document.createTextNode('Loadout: ' + localStorage.getItem('Loadout'));
    pLoadout.appendChild(head);
    pLoadout.appendChild(n);
    n.appendChild(name)
    pLoadout.appendChild(e);
    e.appendChild(email)
    pLoadout.appendChild(c);
    c.appendChild(comment)
    pLoadout.appendChild(l);
    l.appendChild(loadout)
  }
  else
  {

  }
}

//redirects for older browsers
function legacy()
{
  if(!document.getElementById)
  {
    window.location = 'legacy.html';
  }
}
