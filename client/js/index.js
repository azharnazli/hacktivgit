function myRepo() {
  $.ajax({
      method: "GET",
      url: `http://localhost:3000/user/`
    })
    .done(mydata => {
      console.log(mydata)
      $(`#myRepo`).append(`<img src="${mydata[0].owner.avatar_url}"/>`)
      $(`#myRepo`).append(`<h3>${mydata[0].owner.login}</h3>`)
    })
}


function getStarList() {
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
      if (!filtered.length == 0) {
        response.forEach((el, idx) => {
          if (el.owner.login == filtered) {
            starredRepo += `<td> <a href="${el.owner.html_url}" >${el.owner.login}</a></td>`
            starredRepo += `<td><a href="${el.html_url}" >${el.name}</a></tr>`
          }
        })

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


$(document).ready(function () {
  myRepo()
  getStarList()
})

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
    url : `http://localhost:3000/user/createRepo`,
    data : {
      repoName : repoName
    }
  })
  .done( (newRepo)=> {
    swal({
      title: `success create ${repoName}`,
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
  .done( ()=> {
    swal({
      title : `Unstar ${username} with repository ${repository} success`
    })
    getStarList()
  })
  .fail(function (jqXHR, textStatus) {
    console.log(`request failed ${textStatus}`)
  })
  
}