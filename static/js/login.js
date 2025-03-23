function authenticateUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem('count') !==  null) {
        localStorage.setItem('count', 0);
    }

    const count = Number(localStorage.getItem('count')); 

    if (count === 0) { 
        localStorage.setItem('auth_token', 0);
        localStorage.setItem('count', 1);
    }

    let auth_token = localStorage.getItem('auth_token'); 

    console.log('token atual:', auth_token);

    if (email === "" || password === "") {

        showMessageError();

    } else {

        fetch('http://127.0.0.1:5001/authenticate', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, auth_token })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
            localStorage.setItem('auth_token', data);

            if (data !== null) {
                window.location.href = "http://127.0.0.1:5000/panel";
            }
            
        })
        .catch(error => console.error('Erro:', error));

    }

    
}


function showMessageError() {

    M.toast({html: 'Email ou senha inválidos!', classes: 'custom-toast', displayLength: 1000});
    
}
