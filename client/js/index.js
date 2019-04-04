function checkLogin() {
  if (!localStorage.getItem('token')) {
    $('#login').empty()
    $('#loginform').show()
  }
}


function myRepo() {
  $.ajax({
      method: "GET",
      url: `http://localhost:3000/user/`
    })
    .done(mydata => {
      $(`#myRepo`).append(`<img src="${mydata[0].owner.avatar_url}"/>`)
      $(`#myRepo`).append(`<h3>${mydata[0].owner.login}</h3>`)
    })
}


function getStarList() {
  if (event) {
    event.preventDefault()
  }
  let filtered = $(`#filtered-user`).val()
  $.ajax({
      method: 'GET',
      url: "http://localhost:3000/user/getStar",
    })
    .done(function (response) {
      let starredRepo = ` <table cellpadding=15 >
    <tr>
      <th>Username</th>
      <th>Repository Name</th>
    </tr>
    <tr>`


      if (filtered) {
        if (filtered.length !== 0) {
          response.forEach((el, idx) => {
            if (el.owner.login == filtered) {
              starredRepo += `<td> <a href="${el.owner.html_url}" >${el.owner.login}</a></td>`
              starredRepo += `<td><a href="${el.html_url}" >${el.name}</a></tr>`
            }
          })
        }
      } else {
        response.forEach((el, idx) => {
          starredRepo += `<td> <a href="${el.owner.html_url}" >${el.owner.login}</a></td>`
          starredRepo += `<td><a href="${el.html_url}" >${el.name}</a></tr>`
        })
      }
      starredRepo += ` </table>`

      $('#starred-repo').html(starredRepo)

      $(`#filtered-user`).val('')
    })
    .fail(function (jqXHR, textStatus) {
      console.log(`request failed ${textStatus}`)
    })
}

function search() {
  event.preventDefault()
  swal({
    title: "Search Repo!",
    button: "Ok!",
  });

  let inputId = $(`#user`).val()
  $.ajax({
      method: "POST",
      url: `http://localhost:3000/user/otherRepo/`,
      data: {
        username: inputId
      }
    })
    .done((response => {
      let data = ` <table rules="rows" cellpadding=10 >
        <tr>
        <th>No.</th>
        <th>Repository Name</th>
        </tr>
        <tr>`
      response.forEach((el, idx) => {
        data += `<td>${idx+1}</td>`
        data += `<td><a href="${el.html_url}" >${el.name}</a></tr>`
      })
      data += ` </table>`

      $('#list-user').html(data)
      $(`#user`).val('')
    }))
    .fail(function (jqXHR, textStatus) {
      console.log(`request failed ${textStatus}`)
    })
}

function newRepository() {
  event.preventDefault()
  let repoName = $('#repo-name').val()

  $.ajax({
      method: "POST",
      url: `http://localhost:3000/user/createRepo`,
      data: {
        repoName: repoName
      }
    })
    .done((newRepo) => {
      swal({
        title: `success create ${newRepo}`,
        button: "OK"
      })
      $('#repo-name').val('')
    })
    .fail(function (jqXHR, textStatus) {
      console.log(`request failed ${textStatus}`)
    })
}

function unstar() {
  event.preventDefault()
  let username = $(`#unstar-username`).val()
  let repository = $(`#unstar-repository`).val()
  console.log(username)
  console.log(repository)
  $.ajax({
      url: `http://localhost:3000/user/unstar/${username}/${repository}`,
      method: 'DELETE'
    })
    .done(() => {
      swal({
        title: `Unstar ${username} with repository ${repository} success`
      })
      getStarList()
    })
    .fail(function (jqXHR, textStatus) {
      console.log(`request failed ${textStatus}`)
    })

}

// function onSignIn(googleUser) {
//   const profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); 
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); 
//   const id_token = googleUser.getAuthResponse().id_token

//   $.ajax({
//     url : `http://localhost:3000/user/login`,
//     method : "POST",
//     data : {
//       token : id_token
//     }
//   })
//   .done( (data)=> {
//     localStorage.setItem('token', id_token)
//   })
//   .fail(function (jqXHR, textStatus) {
//     console.log(`request failed ${textStatus}`)
//   })
// }

function initialize() {
  gapi.load('auth2', function() {
    gapi.auth2.init({ client_id: `248246929203-7t0997i779dpose00fq3i982mi1v7ono.apps.googleusercontent.com`})
    .then(()=> {
      renderButton()
    })
  })
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function onSuccess(googleUser) {
  // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
    const id_token = googleUser.getAuthResponse().id_token
  
    $.ajax({
      url : `http://localhost:3000/user/login`,
      method : "POST",
      data : {
        token : id_token
      }
    })
    .done( (data)=> {
      localStorage.setItem('token', id_token)
      $('#loginform').hide()
      $('#login').show()
    })
    .fail(function (jqXHR, textStatus) {
      console.log(`request failed ${textStatus}`)
    })
  }
  function onFailure(error) {
    console.log(error);
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.removeItem('token')
      console.log('User signed out.');
      $('#login').hide()
      $('#loginform').show()
    });
  }
  
  
  $(document).ready(function () {
    checkLogin()
    myRepo()
    getStarList()
  })