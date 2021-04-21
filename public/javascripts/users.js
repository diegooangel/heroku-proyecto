
const URL_SERVER = 'http://localhost:3000';


const deleteUser = async(id) => {

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const date = document.querySelector('#date').value;


    const userUpdated = {
        id_user: id,
        email,
        password,
        date
    }
    console.log(userUpdated);
    const response = await fetch(`${URL_SERVER}/users/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        body: JSON.stringify(userUpdated)
    });

    window.location.href = '/users';

}

const updateUser = async (id) => {

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const date = document.querySelector('#date').value;


    const userUpdated = {
        id_user: id,
        email,
        password,
        date
    }
    console.log(userUpdated);
    const response = await fetch(`${URL_SERVER}/users/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(userUpdated)
    });

    window.location.href = '/users';

}