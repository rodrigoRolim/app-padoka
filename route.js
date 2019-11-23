const appDiv = "container";

let routes = {}
let templates = {}

let template = (name, templateFunction) => {
  console.log(name)
  return templates[name] = templateFunction
}

let route = (path, template) => {
  if (typeof template == 'function') {
    console.log(path+ " " +template)
    return routes[path] = template;
  }
  else if (typeof template == 'string') {
    console.log(path+ " " +template)
    return routes[path] = templates[template]
  }
}

template('template-1', () => {
  console.log(appDiv)
  let myDiv = document.getElementById(appDiv);
  console.log(myDiv)
  myDiv.innerHTML = "";
  const link1 = createLink('view1', 'Go to view1', '#/view1');
  const link2 = createLink('view2', 'Go to view2', '#/view2');

  myDiv.appendChild(link1);
  return myDiv.appendChild(link2)
})

template('template-view1', () => {
  console.log(appDiv)
  let myDiv = document.getElementById(appDiv)
  console.log(myDiv)
  myDiv.innerHTML = ""
  const link1 = createDiv('view1', "<div><h1>this is view 1</h1><a href='#/'>Go back to index</a></div>")
  return myDiv.appendChild(link1)
})

template('template-view2', () => {
  let myDiv = document.getElementById(appDiv)
  console.log(myDiv)
  myDiv.innerHTML = ""
  const link2 = createDiv('view2', "<div><h1>This is view 2</h1><a href='#/'>Go back to index</a></div>")
  return myDiv.appendChild(link2)
})

route('/', 'template-1')
route('/view1', 'template-view1')
route('/view2', 'template-view2')

let createDiv = (id, xmlString) => {
  let d = document.createElement('div')
  d.id = id
  d.innerHTML = xmlString
  return d.firstChild
}

let createLink = (title, text, href) => {
  let a = document.createElement('a')
  let linkText = document.createTextNode(text)
  a.appendChild(linkText)
  a.title = title
  a.href = href
  return a
}
let resolveRoute = (route) => {
  try {
    console.log(route)
    console.log(routes)
    return routes[route]
  } catch (error) {
    throw new Error("The router is not defined")
  }
}
let router = (evt) => {
  console.log(evt)
  const url = window.location.hash.slice(1) || '/'
  const routeResolved = resolveRoute(url);
  console.log(routeResolved());
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)