function validJSON(data) {
    try {
      data = JSON.parse(data);
      return data;
    } catch (e) {
      return data;
    }
}

function getDataTable(data) {

    data = validJSON(data)

    const tableData = document.getElementById("table-data");
                    
    if (Array.isArray(data)) {

        data.forEach(item => {

            let row = document.createElement('tr');

            const student_id = item.id;
            const payment_id = item.payment.payment_id;
        
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.payment.plan_name}</td>
                <td>${item.payment.method_name}</td>
                <td>${item.payment.plan_value - item.payment.method_discount}</td>
                <td style="padding: 0%;">
                    <button data-item='${JSON.stringify(item)}' onclick="insertDataStudentByID(this, 'info')" data-target="modal-generic" class="waves-effect waves-light btn blue btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                             viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                    </button>

                    <button data-item='${JSON.stringify(item)}' onclick="insertDataStudentByID(this, 'edit')" data-target="modal-generic" class="waves-effect waves-light btn green btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                            viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>

                    <button onclick="modalDelete(${student_id}, ${payment_id})"" data-target="modal-delete" class="waves-effect waves-light btn red btn-opcoes modal-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" style="vertical-align: middle;" 
                             viewBox="0 0 24 24" width="24px" fill="#e8eaed">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>

                </td>
            `;
        
            tableData.appendChild(row);

        });       

    } else {
        console.error('Dados fornecidos não são um array!');
        //console.log(data)
    }

    modalGeneric();
    

    document.getElementById('createOrupdate-form').addEventListener('submit', function(event) {

        event.preventDefault();

    });
    
    
}

function insertDataStudentByID(item, type) {

    data = JSON.parse(item.getAttribute('data-item'));

    const id = document.getElementById('id_');
    const payment = document.getElementById("payment_id");
    const titleCard = document.getElementById("title-card");
    const card = document.getElementById('panel');
    const nameInput = document.getElementById("name_");
    const emailInput = document.getElementById("email_");
    const birthdateInput = document.getElementById("birthdate_");
    const phoneInput = document.getElementById("phone_");
    const cepInput = document.getElementById("cep_");
    const cityInput = document.getElementById("city_");
    const neighborhoodInput = document.getElementById("neighborhood_");
    const addressInput = document.getElementById("address_");
    const numberInput = document.getElementById("number_");
    const totalInput = document.getElementById("total_");
    const btn = document.getElementById('btn-generic');

    nameInput.value = data.name;
    emailInput.value = data.email;
    birthdateInput.value = data.birthday;
    phoneInput.value = data.phone;
    cepInput.value = data.cep;
    cityInput.value = data.city;
    neighborhoodInput.value = data.neighborhood;
    addressInput.value = data.address;
    numberInput.value = data.number;
    id.value = data.id;
    payment.value = data.payment.payment_id;

    document.getElementById('total_').classList.remove('hide');
    document.getElementById('total_info').classList.remove('hide');


    
    setTimeout(() => {

        getTotal()
        .then(total => {
            totalInput.textContent = `R$ ${total}`;
        })
        .catch(error => {
            console.error('Erro ao calcular total:', error);
        });

    }, 500); 


    if (type === "info") {

        card.style.backgroundColor = '#2196F3';
        titleCard.textContent = 'Informações sobre o aluno';
        nameInput.setAttribute('readonly', true);
        emailInput.setAttribute('readonly', true);
        birthdateInput.setAttribute('readonly', true);
        phoneInput.setAttribute('readonly', true);
        cepInput.setAttribute('readonly', true);
        cityInput.setAttribute('readonly', true);
        neighborhoodInput.setAttribute('readonly', true);
        addressInput.setAttribute('readonly', true);
        numberInput.setAttribute('readonly', true);
        btn.classList.add('disabled');

        const genderInput = document.getElementById("gender-select");
        const stateInput = document.getElementById("state-select");
        const planInput = document.getElementById("plan-select");
        const methodInput = document.getElementById("method-select"); 

        genderInput.innerHTML = "";
        stateInput.innerHTML = "";
        planInput.innerHTML = "";
        methodInput.innerHTML = ""; 

        let genderOption = document.createElement('option');
        genderOption.value = data.gender.id;
        genderOption.text = data.gender.name;
        genderOption.selected = true;
        genderInput.appendChild(genderOption);
        
        let stateOption = document.createElement('option');
        stateOption.value = data.state.id;
        stateOption.text = data.state.name;
        stateOption.selected = true;
        stateInput.appendChild(stateOption);

        let planOption = document.createElement('option');
        planOption.value = data.payment.plan_id;
        planOption.text = data.payment.plan_name;
        planInput.appendChild(planOption);

        let methodOption = document.createElement('option');
        methodOption.value = data.payment.method_id;
        methodOption.text = data.payment.method_name;
        methodInput.appendChild(methodOption);
        
        M.FormSelect.init(genderInput);
        M.FormSelect.init(stateInput);
        M.FormSelect.init(planInput);
        M.FormSelect.init(methodInput); 

    } else if (type === "edit") {

        card.style.backgroundColor = '#43A047';
        titleCard.textContent = 'Editar Aluno';
        nameInput.removeAttribute('readonly');
        emailInput.removeAttribute('readonly');
        birthdateInput.removeAttribute('readonly');
        phoneInput.removeAttribute('readonly');
        cepInput.removeAttribute('readonly');
        cityInput.removeAttribute('readonly');
        neighborhoodInput.removeAttribute('readonly');
        addressInput.removeAttribute('readonly');
        numberInput.removeAttribute('readonly');
        btn.classList.remove('disabled');

        selectStateByIdOrName(data.state.id, stateName = null)
        getDataGender(data.gender.id);
        selectPlanById(data.payment.plan_id)
        selectMethodById(data.payment.method_id)


    }

}

function getDataGender(genderId = null) {

    return fetch('http://127.0.0.1:5001/gender', {method: 'GET'})
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao obter dados');
        }
        return response.json();  
        })
        .then(genders => {
            const genderInput = document.getElementById("gender-select"); 

            genderInput.innerHTML = ""; 

            if (Array.isArray(genders)) {
                genders.forEach(gender => {
                    let genderOption = document.createElement('option');
                    genderOption.value = gender.id;
                    genderOption.text = gender.name;
                    genderInput.appendChild(genderOption);
                });

                if (genderId) {
                    genderInput.value = genderId;
                }

                M.FormSelect.init(genderInput); 
            } else {
                console.log(genders);
                console.error('Dados não são array');
            }
        })
        .catch(error => {
            console.error("Erro ao buscar os generos:", error);
        });
}

function getDataState() {
    return fetch('http://127.0.0.1:5001/state', {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao obter dados');
            }
            return response.json();  
        })
}

function selectStateByIdOrName(stateId = null, stateName = null) {

    const stateInput = document.getElementById("state-select");

    getDataState()
        .then(states => {
            stateInput.innerHTML = ""; 

            if (Array.isArray(states)) {
                states.forEach(state => {
                    let stateOption = document.createElement('option');
                    stateOption.value = state.id;
                    stateOption.text = state.name;

                    if (stateId === state.id || stateName === state.name) {
                        stateOption.selected = true;
                    }

                    stateInput.appendChild(stateOption);
                });

                M.FormSelect.init(stateInput);

            } else {
                console.error('Dados não são um array');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar estados:', error);
        });
}

function getDataPlan() {
    return fetch('http://127.0.0.1:5001/plan', { method: 'GET' })
        .then(response => {
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            
            return response.json();
        })
}

function selectPlanById(planId = null) {

    const planInput = document.getElementById("plan-select");

    getDataPlan()
        .then(plans => {
            planInput.innerHTML = "";

            if (Array.isArray(plans)) {
                plans.forEach(plan => {
                    let planOption = document.createElement('option');
                    planOption.value = plan.id;
                    planOption.text = plan.name;
                    planInput.appendChild(planOption);
                });
                if (planId) {
                    planInput.value = planId;
                }
                M.FormSelect.init(planInput); 
            } else {
                console.error('Dados não são array');
            }
        })
        .catch(error => {
            //console.error('Erro ao carregar planos:', error);
        });

}

function selectValuePlanById(planId) {
    return getDataPlan()
        .then(plans => {

            for (let plan of plans) {
                
                if (parseInt(plan.id) === parseInt(planId)) {
                    return plan.value; 
                }
            }

            throw new Error('Plano não encontrado');
        })
        .catch(error => {
            //console.error('Erro ao carregar planos:', error);
            throw error;
        });
}

function getDataMethod() {
    return fetch('http://127.0.0.1:5001/method', { method: 'GET' })
        .then(response => {
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            
            return response.json();
        })
}

function searchCep() {
    const cep = document.getElementById("cep_").value;

    const cityInput = document.getElementById("city_");
    const neighborhoodInput = document.getElementById("neighborhood_");
    const addressInput = document.getElementById("address_");
    const numberInput = document.getElementById("number_");

    return fetch(`https://viacep.com.br/ws/${cep}/json/`, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {

            cityInput.value = data.localidade;
            neighborhoodInput.value = data.bairro;
            addressInput.value = data.logradouro;
            numberInput.value = "";
            selectStateByIdOrName(stateId = null, data.estado);

        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
        });
}

function selectMethodById(methodId = null) {
    
    const methodInput = document.getElementById("method-select"); 

    getDataMethod()
        .then(methods=>{

            methodInput.innerHTML = ""; 

            if (Array.isArray(methods)) {
                methods.forEach(method => {
                    let methodOption = document.createElement('option');
                    methodOption.value = method.id;
                    methodOption.text = method.name;
                    methodInput.appendChild(methodOption);
                });

                if (methodId) {
                    methodInput.value = methodId;
                }

                M.FormSelect.init(methodInput); 
            } else {
                console.error('Dados não são array');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar planos:', error);
        });

}

function selectDiscountMethodById(methodId = null) {
    return getDataMethod()
        .then(methods => {

            for (let method of methods) {
                
                if (parseInt(method.id) === parseInt(methodId)) {
                    
                    return method.discount; 
                }
            }

            throw new Error('Metodo não encontrado');
        })
        .catch(error => {
            console.error('Erro ao carregar o metodo:', error);
            throw error;
        });
}

function getTotal() {

    var planSelectValue = document.getElementById('plan-select').value;

    var methodSelectValue = document.getElementById('method-select').value;

    return selectValuePlanById(planSelectValue)
    .then(planValue => {
        return selectDiscountMethodById(methodSelectValue)
            .then(discountValue => {

                //console.log(planValue - discountValue);
                return planValue - discountValue;

            });
    })
    
}

function createOrUpdateStudent() {

    const id = document.getElementById('id_').value;
    const payment = document.getElementById("payment_id").value;
    const name = document.getElementById('name_').value;
    const email = document.getElementById('email_').value;
    const gender =  parseInt(document.getElementById('gender-select').value);
    const birthdate = document.getElementById('birthdate_').value;
    const phone = document.getElementById('phone_').value;
    const state =  parseInt(document.getElementById('state-select').value);
    const city = document.getElementById('city_').value;
    const neighborhood = document.getElementById('neighborhood_').value;
    const address = document.getElementById('address_').value;
    const number = document.getElementById('number_').value;
    const plan =  parseInt(document.getElementById('plan-select').value);
    const method =  parseInt(document.getElementById('method-select').value);
    const cep = document.getElementById("cep_").value;

    if (id == 0) {

        //console.log(`plan: ${plan}, payment: ${payment}, method: ${method}`);

        fetch('http://127.0.0.1:5001/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, email, gender, birthdate, phone, state, city, neighborhood, address, number, cep, plan, method, payment })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log('Dados atualizados:', data);
            window.location.reload(true);
        })
        .catch(error => console.error('Erro:', error));
        

    } else {

        fetch('http://127.0.0.1:5001/student', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, email, gender, birthdate, phone, state, city, neighborhood, address, number, cep, plan, payment, method })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log('Dados atualizados:', data);
            window.location.reload(true);
        })
        .catch(error => console.error('Erro:', error));
       
    }

}

function createStudent() {

    const card = document.getElementById('panel')
    card.style.backgroundColor = '#43A047';
    document.getElementById('title-card').innerText = 'Adcionar novo aluno';

    document.getElementById('total_').classList.add('hide');
    document.getElementById('total_info').classList.add('hide');
    document.getElementById("name_").value = "";
    document.getElementById("email_").value = "";
    document.getElementById("birthdate_").value = "";
    document.getElementById("phone_").value = "";
    document.getElementById("cep_").value = "";
    document.getElementById("city_").value = "";
    document.getElementById("neighborhood_").value = "";
    document.getElementById("address_").value = "";
    document.getElementById("number_").value = "";
    document.getElementById('id_').value = 0;
    document.getElementById("payment_id").value = 0;
    document.getElementById('method-select').value = 0;
    document.getElementById('plan-select').value = 0;


    selectPlanById();
    selectMethodById();
    selectStateByIdOrName();
    getDataGender();    
    
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
                    <form class="col s12" id="createOrupdate-form">
                        <input type="hidden" id="id_" name="id">
                        <input type="hidden" id="payment_id" name="payment">
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
                            <div class="input-field col s4">
                                <input id="cep_" type="text" class="validate" name="cep">
                                <label for="cep_" class="active" style="color: black !important;">CEP</label>
                            </div>
                            <div class="input-field col s4">
                                <input id="city_" type="text" class="validate" name="city">
                                <label for="city_" class="active" style="color: black !important;">Cidade</label>
                            </div>
                            <div class="input-field col s4">
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
                                            <th>Pagamento</th>
                                            <th id="total_info" >Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="input-field">
                                                    <select id="plan-select" name="plan">
                                                        <option value="" disabled selected>Selecione a modalidade</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="input-field">
                                                    <select id="method-select" name="method">
                                                        <option value="" disabled selected>Selecione o pagamento</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td><p id="total_" style="font-size:20px;">R$ 123 </p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <div class="center-align" style="display: flex; justify-content: center;">
                                    <button id="btn-generic" onclick="createOrUpdateStudent()" class="btn green darken-1 waves-effect waves-light btn-custom" 
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
    $('#cep_').mask('00000-000'); 


    
    document.getElementById("cep_").addEventListener("input", function () {

        const cep = this.value;

        if (cep.length == 9) {
            searchCep();
        }
        
    });


}
  
function modalDelete(student_id, payment_id) {

    const existingModal = document.getElementById(`modal-delete${student_id}`);
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = `modal-delete`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="card-panel red" style="transform: translateY(-10px);">
                <h4 class="center white-text">Confirmar exclusão?</h4>
            </div>
            <div class="container" style="padding: 0% !important;"> 
                <p class="center">Você tem certeza que deseja apagar os dados desse aluno?</p>
            </div>
        </div>
        <div class="modal-footer">
            <button href="#!" 
                    class="modal-close waves-effect waves-light btn btn-delete" >
                Não
            </button>
            <button onclick="deleteStudent(${student_id}, ${payment_id})" 
                    class="waves-effect waves-light btn btn-opcoes" 
                    style="background-color: #fafafa !important; color: #000;">
                Sim
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    M.Modal.init(modal);
}

function deleteStudent(student_id, payment_id) {

    

    fetch('http://127.0.0.1:5001/student',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({student_id, payment_id}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao deletar o recurso: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        location.reload(true); 
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });    
}
