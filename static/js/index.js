

function getDataTable(data) {
    console.log(data)
    data = JSON.parse(data)
    

    const tableData = document.getElementById("table-data");
                    
    if (Array.isArray(data)) {
        console.log(data)

        data.forEach(item => {
            console.log("Item:", item); 

            let row = document.createElement('tr');
        
            row.innerHTML = `
                <td>${item.name}</td>
                <td></td>
                <td></td>
                <td></td>
                <td style="padding: 0%;">
                    <button onclick="insertDataStudentByID(, 'info')" data-target="modal-generic" class="waves-effect waves-light btn blue btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                             viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                    </button>

                    <button onclick="insertDataStudentByID(, 'edit')" data-target="modal-generic" class="waves-effect waves-light btn green btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                            viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>

                    <button data-target="modal-delete" class="waves-effect waves-light btn red btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                             viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>

                </td>
            `;
        
            tableData.appendChild(row);
            modalDelete(item.id);
            

        });       

    } else {
        console.error('Dados fornecidos não são um array!');
    }

    

    modalGeneric();
    modalCreate();

    document.getElementById('update-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('id_').value;
        const name = document.getElementById('name_').value;
        const email = document.getElementById('email_').value;
        const gender = parseInt(document.getElementById('gender-select').value);
        const birthdate = document.getElementById('birthdate_').value;
        const phone = document.getElementById('phone_').value;
        const state = parseInt(document.getElementById('state-select').value);
        const city = document.getElementById('city_').value;
        const neighborhood = document.getElementById('neighborhood_').value;
        const address = document.getElementById('address_').value;
        const number = document.getElementById('number_').value;

        const formData = new FormData();

        formData.append('id', id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);
        formData.append('phone', phone);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('neighborhood', neighborhood);
        formData.append('address', address);
        formData.append('number', number);
        
        fetch('http://127.0.0.1:5001/student', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('message').textContent = "Erro na requisição!";
        });
    });
    

    
}
//-----------CREATE DATA---------------
function createStudent() {

    const card = document.getElementById('panel-create')
    card.style.backgroundColor = '#43A047';
    document.getElementById('title-card-create').innerText = 'Adcionar novo aluno';
    insertDataGenderCreate();
    insertDataStateCreate();
    insertDataPaymentCreate();
    insertDataPlanCreate();
    
}

function createNewStudent() {

    const id = null;
    const name = document.getElementById('name_create').value;
    const email = document.getElementById('email_create').value;
    const gender =  parseInt(document.getElementById('gender-select-create').value);
    const birthdate = document.getElementById('birthdate_create').value;
    const phone = document.getElementById('phone_create').value;
    const state =  parseInt(document.getElementById('state-select-create').value);
    const city = document.getElementById('city_create').value;
    const neighborhood = document.getElementById('neighborhood_create').value;
    const address = document.getElementById('address_create').value;
    const number = document.getElementById('number_create').value;
    const plan =  parseInt(document.getElementById('plan-select-create').value);
    const payment =  parseInt(document.getElementById('payment-select-create').value);

       
    fetch('http://127.0.0.1:5001/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, email, gender, birthdate, phone, state, city, neighborhood, address, number, plan, payment })
    })
    .then(data => {
        console.log('Dados atualizados:', data);
    })
    .catch(error => console.error('Erro:', error));

}

//-----------DELETE DATA---------------
function deleteStudent(id) {

    fetch('http://127.0.0.1:5001/student',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        }),
    })
        .then(response => {
            if (response.ok) {
                location.reload(true);
            } else {
                console.error('Erro ao deletar o recurso:', response.status);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });    
}

//-------------GET DATA----------------
function getDataStudent(idStudent) {
    return fetch(`http://127.0.0.1:5001/search?id=${idStudent}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json(); 
    });
}

function getDataGender() {

    return fetch('http://127.0.0.1:5001/gender', {method: 'GET'})
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json(); 
    });
}

function getDataState() {

    return fetch('http://127.0.0.1:5001/state', {method: 'GET'})
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json(); 
    });
}

function getDataPayment() {
    return fetch('http://127.0.0.1:5001/payment', {method: 'GET'})
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json(); 
    });
}

function getDataPlan() {
    return fetch('http://127.0.0.1:5001/plan', {method: 'GET'})
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json(); 
    });
}

//------------INSERT DATA---------------

function insertDataGenderCreate() {
    getDataGender()
        .then(data => {
            let selectElement = document.getElementById('gender-select-create');
    
            data.forEach(data => {

                let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);

            });


            M.FormSelect.init(selectElement);  
    })
    .catch(error => console.error('Erro:', error));
}

function insertDataStateCreate() {
    getDataState()
        .then(data => {

            let selectElement = document.getElementById('state-select-create');

            data.forEach(data => {

                let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);
                
            });

            M.FormSelect.init(selectElement);

        })
        .catch(error => console.error('Erro:', error));
}

function insertDataPaymentCreate() {
    getDataPayment()
        .then(data => {

            let selectElement = document.getElementById('payment-select-create');

            data.forEach(data => {

                let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);
                
            });

            M.FormSelect.init(selectElement);

        })
        .catch(error => console.error('Erro:', error));
}

function insertDataPlanCreate() {
    getDataPlan()
        .then(data => {

            let selectElement = document.getElementById('plan-select-create');

            data.forEach(data => {

                let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);
                
            });

            M.FormSelect.init(selectElement);

        })
        .catch(error => console.error('Erro:', error));
}

function insertDataGenderByID(id, type) {
    getDataGender()
        .then(data => {

            let selectElement = document.getElementById('gender-select');

            data.forEach(data => {

                if (type == "info") {
                    if (id == data.id) {
                        let newOption = document.createElement('option');
                        newOption.value = data.id;
                        newOption.text = data.name;
                        newOption.selected = true;
                        selectElement.add(newOption);
                    }
                }else{
                    let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);
                }
            });

            M.FormSelect.init(selectElement);

        })
        .catch(error => console.error('Erro:', error));
}

function insertDataStateByID(id, type) {
    getDataState()
        .then(data => {

            let selectElement = document.getElementById('state-select');

            data.forEach(data => {

                if (type == "info") {
                    if (id == data.id) {
                        let newOption = document.createElement('option');
                        newOption.value = data.id;
                        newOption.text = data.name;
                        newOption.selected = true;
                        selectElement.add(newOption);
                    }
                }else{
                    let newOption = document.createElement('option');
                    newOption.value = data.id;
                    newOption.text = data.name;
                    selectElement.add(newOption);
                }
                
            });

            M.FormSelect.init(selectElement);

        })
        .catch(error => console.error('Erro:', error));
}

function insertDataStudentByID(id,type) {
    getDataStudent(id)
        .then(data => {

            if (type == "info") {
                document.getElementById('id_').value = id;
                document.querySelector(`#name_`).value = data.name;
                document.querySelector('#name_').setAttribute('readonly', true);
                document.querySelector(`#email_`).value = data.email;
                document.querySelector('#email_').setAttribute('readonly', true);
                document.querySelector(`#birthdate_`).value = data.birthday;
                document.querySelector('#birthdate_').setAttribute('readonly', true);
                document.querySelector(`#phone_`).value = data.phone;
                document.querySelector('#phone_').setAttribute('readonly', true);
                document.querySelector(`#city_`).value = data.city;
                document.querySelector('#city_').setAttribute('readonly', true);
                document.querySelector(`#neighborhood_`).value = data.neighborhood;
                document.querySelector('#neighborhood_').setAttribute('readonly', true);
                document.querySelector(`#address_`).value = data.address;
                document.querySelector('#address_').setAttribute('readonly', true);
                document.querySelector(`#number_`).value = data.number;
                document.querySelector('#number_').setAttribute('readonly', true);
                document.getElementById('modalidade_').innerText = data.plan.name;
                document.getElementById('pagemento_').innerText = data.payment.name;
                document.getElementById('total_').innerText = data.plan.value - data.payment.discount;
                insertDataGenderByID(data.gender.id,"info");
                insertDataStateByID(data.state.id,"info"); 
                const card = document.getElementById('panel')
                card.style.backgroundColor = '#2196F3';
                document.getElementById('title-card').innerText = 'Informações sobre os alunos';
                const btn = document.getElementById('btn-generic');
                btn.classList.add('disabled');
       
                
                
            } else {

                document.getElementById('id_').value = id;
                document.querySelector(`#name_`).value = data.name;
                document.querySelector('#name_').removeAttribute('readonly');
                document.querySelector(`#email_`).value = data.email;
                document.querySelector('#email_').removeAttribute('readonly');
                document.querySelector(`#birthdate_`).value = data.birthday;
                document.querySelector('#birthdate_').removeAttribute('readonly');
                document.querySelector(`#phone_`).value = data.phone;
                document.querySelector('#phone_').removeAttribute('readonly');
                document.querySelector(`#city_`).value = data.city;
                document.querySelector('#city_').removeAttribute('readonly');
                document.querySelector(`#neighborhood_`).value = data.neighborhood;
                document.querySelector('#neighborhood_').removeAttribute('readonly');
                document.querySelector(`#address_`).value = data.address;
                document.querySelector('#address_').removeAttribute('readonly');
                document.querySelector(`#number_`).value = data.number;
                document.querySelector('#number_').removeAttribute('readonly');
                document.getElementById('modalidade_').innerText = data.plan.name;
                document.getElementById('pagemento_').innerText = data.payment.name;
                document.getElementById('total_').innerText = data.plan.value - data.payment.discount;
                insertDataGenderByID(data.gender.id);
                insertDataStateByID(data.state.id);
                const card = document.getElementById('panel')
                card.style.backgroundColor = '#43A047';
                document.getElementById('title-card').innerText = 'Editar informações do aluno';
                const btn = document.getElementById('btn-generic')
                btn.classList.remove('disabled');

            }
           
        })
        .catch(error => console.error('Erro:', error));
}

//---------------MODAL-------------------
function modalDelete(id) {
    
    const modal = document.createElement('div');
    modal.classList.add('container', 'modal-delete');
    modal.id = `modal-delete${id}`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="card-panel" style="background-color: #F44336 !important;  transform: translateY(-10px);">
                <h4 class="center white-text">Confirmar exclusão?</h4>
            </div>
            <div class="container" style="padding: 0% !important;"> 
                <p class="center">Você tem certeza que deseja apagar os dados desse aluno?</p>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Não</a>
            <button onclick="deleteStudent(${id})" 
                    class="waves-effect waves-light btn-opcoes" 
                    style="border: none !important; background-color: #fafafa !important;">
                Sim
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    M.Modal.init(modal);
}

function modalGeneric() {

        const modal = document.createElement('div');
        modal.classList.add('container', 'modal-info');
        modal.id = `modal-generic`;
        modal.innerHTML = `
            <div class="modal-content" >
                <div class="card-panel" id="panel">
                    <h4 id="title-card" class="center white-text"></h4>
                </div>
                <div class="container-generic" style="padding: 0% !important;"> 
                    <div class="row">
                        <form class="col s12" id="update-form">
                            <input type="hidden" id="id_" name="id">
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="name_" name="name" type="text" class="validate">
                                    <label for="name_" class="active" style="color: black !important;">Nome</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="email_" name="email" type="email" class="validate">
                                    <label for="email_" class="active" style="color: black !important;">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <select id="gender-select" name="gender">
                                    </select>
                                    <label style="color: black !important;">Genero</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="birthdate_" type="text" class="datepicker" name="birthdate">
                                    <label for="birthdate_" class="active" style="color: black !important;">Data de Nascimento</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="phone_" type="text" class="validate" name="phone">
                                    <label for="phone_" class="active" style="color: black !important;">Celular</label>
                                </div>
                                <div class="input-field col s6">
                                    <select id="state-select" name="state">
                                    </select>
                                    <label style="color: black !important;">Estado</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="city_" type="text" class="validate" name="city">
                                    <label for="city_" class="active" style="color: black !important;">Cidade</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="neighborhood_" type="text" class="validate" name="neighborhood">
                                    <label for="neighborhood_" class="active" style="color: black !important;">Bairro</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="address_" type="text" class="validate" name="address">
                                    <label for="address_" class="active" style="color: black !important;">Rua</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="number_" type="text" class="validate" name="number">
                                    <label for="number_" class="active" style="color: black !important;">Numero</label>
                                </div>
                            <div/>
                            <div class="row">
                                <div class="col s12">
                                    <table class="responsive-table striped">
                                        <thead>
                                          <tr>
                                              <th>Modalidade</th>
                                              <th>Pagemento</th>
                                              <th>Total</th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          <tr>
                                            <td><p id="modalidade_">1</p></td>
                                            <td><p id="pagemento_">2</p></td>
                                            <td><p id="total_">3</p></td>
                                          </tr>
                                        </tbody>
                                    </table>
                                <div/>
                            <div/>

                            <div class="row">
                                <div class="col s12">
                                    <div class="center-align" style="display: flex; justify-content: center;">
                                        <button id="btn-generic" type="submit" class="btn green darken-1 waves-effect waves-light btn-custom" 
                                            style="margin-top: 20px; gap: 10px; width: 250px; display: flex; align-items: center; justify-content: center; right: 5">
                                            <i class="material-icons" style="font-size: 2rem !important;">save</i>
                                            <span>Salvar Aluno</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
            
                        </form>
                    </div>
                </div>
            </div>
         `;

        document.body.appendChild(modal);
        M.Modal.init(modal);

        const calendar = modal.querySelector(`#birthdate_`);
        M.Datepicker.init(calendar, {
            format: 'dd/mm/yyyy',
            yearRange: [1900, new Date().getFullYear()],
            i18n: {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'OK',
            months: [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            monthsShort: [
                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
            ],
            weekdays: [
                'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
            ],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        }
        });

        const selects = modal.querySelectorAll('select');
        M.FormSelect.init(selects);

        $(`#phone_`).mask('(00) 0.0000-0000');

    
}

function modalCreate() {
    const modal = document.createElement('div');
    modal.classList.add('container', 'modal-create');
    modal.id = `modal-create`;
    modal.innerHTML = `
            <div class="modal-content" >
                <div class="card-panel" id="panel-create">
                    <h4 id="title-card-create" class="center white-text"></h4>
                </div>
                <div class="container-generic" style="padding: 0% !important;"> 
                    <div class="row">
                        <form class="col s12" id="update-form">
                            <input type="hidden" id="id_">
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="name_create" type="text" class="validate">
                                    <label for="name_create" class="active" style="color: black !important;">Nome</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="email_create" type="email" class="validate">
                                    <label for="email_create" class="active" style="color: black !important;">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <select id="gender-select-create">
                                    </select>
                                    <label style="color: black !important;">Genero</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="birthdate_create" type="text" class="datepicker" >
                                    <label for="birthdate_create" class="active" style="color: black !important;">Data de Nascimento</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="phone_create" type="text" class="validate">
                                    <label for="phone_create" class="active" style="color: black !important;">Celular</label>
                                </div>
                                <div class="input-field col s6">
                                    <select id="state-select-create">
                                    </select>
                                    <label style="color: black !important;">Estado</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="city_create" type="text" class="validate">
                                    <label for="city_create" class="active" style="color: black !important;">Cidade</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="neighborhood_create" type="text" class="validate">
                                    <label for="neighborhood_create" class="active" style="color: black !important;">Bairro</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="address_create" type="text" class="validate">
                                    <label for="address_create" class="active" style="color: black !important;">Rua</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="number_create" type="text" class="validate">
                                    <label for="number_create" class="active" style="color: black !important;">Numero</label>
                                </div>
                            <div/>
                            <div class="row">
                                <div class="col s12">
                                    <table class="responsive-table striped">
                                        <thead>
                                          <tr>
                                              <th>Modalidade</th>
                                              <th>Pagemento</th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          <tr>
                                            <td>
                                                <div class="input-field col s12">
                                                <select id="plan-select-create">
                                                </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="input-field col s12">
                                                <select id="payment-select-create">
                                                </select>
                                                </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                <div/>
                            <div/>

                            <div class="row">
                                <div class="col s12">
                                    <div class="center-align" style="display: flex; justify-content: center;">
                                        <button id="btn-generic" onclick="createNewStudent()" class="btn green darken-1 waves-effect waves-light btn-custom" 
                                            style="margin-top: 20px; gap: 10px; width: 250px; display: flex; align-items: center; justify-content: center; right: 5">
                                            <i class="material-icons" style="font-size: 2rem !important;">save</i>
                                            <span>Adcionar Aluno</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
            
                        </form>
                    </div>
                </div>
            </div>
     `;

    document.body.appendChild(modal);
    M.Modal.init(modal);

    const calendar = modal.querySelector(`#birthdate_create`);
    M.Datepicker.init(calendar, {
        format: 'dd/mm/yyyy',
        yearRange: [1900, new Date().getFullYear()],
        i18n: {
        cancel: 'Cancelar',
        clear: 'Limpar',
        done: 'OK',
        months: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthsShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        weekdays: [
            'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
        ],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    }
    });

    const selects = modal.querySelectorAll('select');
    M.FormSelect.init(selects);

    $(`#phone_create`).mask('(00) 0.0000-0000');

}




