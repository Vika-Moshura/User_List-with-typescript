let form = document.forms.namedItem('form');
let addButton = form['add_button'];
let editButton = form['edit_button'];
let table = document.querySelector('.table');
let index;
let users = [];
class ObjUser {
    login;
    password;
    email;
    constructor(oLogin, oPassword, oEmail) {
        this.login = oLogin;
        this.password = oPassword;
        this.email = oEmail;
    }
}

function addUser() {
    event.preventDefault();
    if (form.login.validity.valid && form.login.validity.valid && form.email.validity.valid) {
        users.push(new ObjUser(`${form.login.value}`, `${form.password.value}`, `${form.email.value}`));
        render();
        form.reset();
        document.querySelector('.alert').classList.remove('visible');
        document.querySelector('.alert').classList.add('invisible');
    } else {
        document.querySelector('.alert').classList.remove('invisible');
        document.querySelector('.alert').classList.add('visible');
    }
}

function render() {
    table.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let tr = `
        <tr class="data">
        <td class="number">${i + 1}</td>
        <td class="login">${users[i].login}</td>
        <td class="password">${users[i].password}</td>
        <td class="email">${users[i].email}</td>
        <td><input  class="button1" type="button" name="edit" value="Edit"></td>
        <td><input  class="button1" type="button" name="delete" value="Delete"></td>
        </tr>`;
        table.insertAdjacentHTML('beforeend', tr);
    }
}

function deleteUser(event) {
    if (event.target.name == "delete") {
        let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
        users.splice(index, 1);
        render();
    }
}

function editUser(event) {
    if (event.target.name == "edit") {
        index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
        form.login.value = users[index].login;
        form.password.value = users[index].password;
        form.email.value = users[index].email;
        addButton.classList.remove('visible');
        addButton.classList.add('invisible');
        editButton.classList.remove('invisible');
        editButton.classList.add('visible');
    }
}

function saveEditUser() {
    event.preventDefault();
    if (form.login.validity.valid && form.login.validity.valid && form.email.validity.valid) {
        users.splice(index, 1, new ObjUser(`${form.login.value}`, `${form.password.value}`, `${form.email.value}`));
        render();
        form.reset();
        document.querySelector('.alert').classList.remove('visible');
        document.querySelector('.alert').classList.add('invisible');
    } else {
        document.querySelector('.alert').classList.remove('invisible');
        document.querySelector('.alert').classList.add('visible');
    }
}
addButton.addEventListener('click', addUser);
table.addEventListener('click', deleteUser);
table.addEventListener('click', editUser);
editButton.addEventListener('click', saveEditUser);