let form = document.forms.namedItem('form') as HTMLFormElement;
let addButton = form['add_button'] as HTMLButtonElement;
let editButton = form['edit_button'] as HTMLButtonElement;
let table = document.querySelector('.table') as HTMLTableElement;
let index: number;

let users: Array<ObjUser> = [];
class ObjUser {
    login: string;
    password: string;
    email: string;
    constructor(oLogin: string, oPassword: string, oEmail: string) {
        this.login = oLogin;
        this.password = oPassword;
        this.email = oEmail;
    }
}
function addUser(): void {
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

function render(): void {
    table.innerHTML = '';
    for (let i: number = 0; i < users.length; i++) {
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


function deleteUser(event): void {
    if (event.target.name == "delete") {
        let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
        users.splice(index, 1);
        render();
    }
}

function editUser(event): void {
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

function saveEditUser(): void {
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