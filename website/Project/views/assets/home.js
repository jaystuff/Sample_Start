$(() => {
    requestUsers();

    $('#add-submitButton').click(() => {
        let user = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            phone: $('input[name=phone]').val(),
        }
        
        sendUser(user);
        findUserWithId(user);
        $('#add-page input').val("");

    })

    showHomePage();
    $('#listButton').click(showHomePage)
    $('#newButton').click(showAddPage)
})


function requestUsers() {
    $.ajax({
        type: 'GET',
        url: 'api/user',
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)

}

function sendUser(user) {
    $.ajax({
        type: 'POST',
        url: 'api/user',
        data: JSON.stringify(user),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}

function deleteUser(id) {
    $.ajax({
        type: 'DELETE',
        url: `api/user/${id}`,
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}

function editUser(editedUser) {
    $.ajax({
        type: 'PUT',
        url: `api/user/${editedUser.id}`,
        data: JSON.stringify(editedUser),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}

function findUserWithId (user) {
    $.ajax({
        type: 'POST',
        url: 'api/user/index',
        data: JSON.stringify(user),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(showDetailPage)
    .fail(errorHandler)
}


function successHandler(users) {
    console.log(`Response has ${users.length} users`)
    if (users.length == 0) {
        var $table = $( "<table border='1'><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></table>" );
    } else {
        var $table = $( "<table border='1'><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th></th></table>" );
        for ( let index = 0; index < users.length; index++ ) {
            const user = users[index]
            const $line = $( "<tr></tr>" )
            $line.append( $( "<td></td>" ).html( user.id ) )
            $line.append( $( "<td></td>" ).html( user.name ) )
            $line.append( $( "<td></td>" ).html( user.email ) )
            $line.append( $( "<td></td>" ).html( user.phone ) )
            const detailsButton = $( "<button id='details'>/button>" ).text('DETAILS');
            const editButton = $( "<button id='edit'>/button>" ).text('EDIT');
            const deleteButton = $( "<button id='del'>/button>" ).text('DELETE');
            $line.append(detailsButton); 
            $line.append(editButton); 
            $line.append(deleteButton); 
            $table.append( $line )

            detailsButton.click(() => {
                showDetailPage(users[index]);
            })

            editButton.click(() => {
                showEditPage(users[index]);
            })

            deleteButton.click(() => {
                const choice = confirm("Are you sure to delete this contact member?")
                if (choice == true) {
                    deleteUser(user.id);
                    showHomePage();
                }
            })
        }
    }

    $('#table').empty()
    $table.appendTo( $('#table') )
}


function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}


function showHomePage() {
    $("#home-page").show();
    $("#add-page").hide();
    $("#detail-page").hide();
    $("#edit-page").hide();
}


function showAddPage() {
    $("#home-page").hide();
    $("#add-page").show();
    $("#detail-page").hide();
    $("#edit-page").hide();
}



function showEditPage(user) {

    $('input[name=edit-name]:text').val(`${user.name}`);
    $('input[name=edit-email]:text').val(`${user.email}`);
    $('input[name=edit-phone]:text').val(`${user.phone}`);
    
    $('#edit-page button').remove();
    const submitButton = $("<button class='submit'></button>").text('Submit');
    $('#edit-page').append(submitButton)
    submitButton.click(() => {
        let editedUser = {
            id: user.id,
            name: $('input[name=edit-name]').val(),
            email: $('input[name=edit-email]').val(),
            phone: $('input[name=edit-phone]').val(),
        }
        
        $('#edit-page button').remove();
        editUser(editedUser);
        showHomePage();
    })

    $("#home-page").hide();
    $("#add-page").hide();
    $("#detail-page").hide();
    $("#edit-page").show();
}


function showDetailPage(user) {
    $('#detail-page').empty()

    if (typeof user !== 'object') {
        user = JSON.parse(user)
    }

    $('#detail-page').append( $("<h3></h3>").text("Contact") ) 
    $('#detail-page').append( $("<p></p>").text(`Name: ${user.name}`) )
    $('#detail-page').append( $("<p></p>").text(`Email: ${user.email}`) )
    $('#detail-page').append( $("<p></p>").text(`Phone: ${user.phone}`) )

    const editButton = $("<button id='edit'></button>").text('EDIT');
    editButton.click(() => { 
        showEditPage(user) 
    });

    $('#detail-page').append(editButton)

    const deleteButton = $("<button id='del'></button>").text('DELETE');
    deleteButton.click(() => {
        const choice = confirm("Are you sure to delete this contact member?")
        if (choice == true) {
            deleteUser(user.id);
            showHomePage();
        }
    })

    $('#detail-page').append(deleteButton)
    $("#home-page").hide();
    $("#add-page").hide();
    $("#detail-page").show();
    $("#edit-page").hide();
}


function validateUser(user) {
    if (user.name.length == 0) {
        alert('Invalid name, please re-enter');
        return false;
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(user.email) == false) {
        alert('Invalid email address, please re-enter');
        return false;
    }
    reg = /^[\+]?[(]?[2-9]{1}\d{2}[)]?[-\s\.]?[2-9]{1}\d{2}[-\s\.]?[0-9]{4,6}$/im
    if (reg.test(user.phone) == false) {
        alert('Invalid phone number, please re-enter');
        return false;
    }
    return true;
}