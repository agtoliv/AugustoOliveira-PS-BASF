function handleSubmit(event) {
    event.preventDefault();

    // Captura os valores dos campos de entrada existentes
    const firstname = document.querySelector('input[name=firstname]').value;
    const lastname = document.querySelector('input[name=lastname]').value;
    const email = document.querySelector('input[name=email]').value;
    const tel = document.querySelector('input[name=tel]').value;
    const city = document.querySelector('input[name=city]').value;
    // Captura o valor da área de texto de descrição, se aplicável
    const description = document.querySelector('#descriptionField textarea') ? document.querySelector('#descriptionField textarea').value.trim() : "";
    // Captura o valor da área de texto de observações
    const observations = document.querySelector('.obs textarea').value.trim();

    // Verifica se a opção "secondoption" está selecionada para a descrição
    const isSecondOptionSelected = document.querySelector('input[name="option"][value="secondoption"]').checked;

    // Coleta os dados dos produtos selecionados e seus volumes
    const products = [];
    for (let i = 1; i <= 15; i++) {
        const productCheckbox = document.getElementById(`p${i}`);
        if (productCheckbox.checked) {
            const volumeInput = document.getElementById(`volume${i}`).value;
            products.push({
                product: productCheckbox.value,
                volume: volumeInput || '0', // Caso não haja volume, envia '0'
            });
        }
    }

    // Prepara os dados para envio, incluindo os produtos, volumes, descrição e observações
    const data = {
        firstname,
        lastname,
        email,
        tel,
        city,
        products: JSON.stringify(products), // Converte a lista de produtos em uma string JSON
    };

    // Inclui descrição se "secondoption" estiver selecionada e descrição estiver preenchida
    if (isSecondOptionSelected && description !== "") {
        data.description = description;
    }

    // Sempre inclui observações, se houver
    if (observations !== "") {
        data.observations = observations;
    }

    fetch('https://api.sheetmonkey.io/form/nAgMX6GjWHZpsrWrD5ZrtC', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then(data => {
        console.log('Data submitted successfully:', data);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

document.querySelector('form').addEventListener('submit', handleSubmit);


// Função para validar os campos
function validateField(field, regex, customValidation) {
    const trimmedValue = field.value.trim();

    if (trimmedValue === '') {
        displayErrorMessage(field, 'Preencha o campo vazio');
        return false;
    } else if (!regex.test(trimmedValue) || (customValidation && !customValidation(trimmedValue))) {
        displayErrorMessage(field, 'Entrada inválida');
        return false;
    } else {
        clearErrorMessage(field);
        return true;
    }
}

// Função de validação personalizada para o campo de email
function customEmailValidation(email) {
    // Verifica se o email é composto apenas por uma única letra repetida
    const lowercaseEmail = email.toLowerCase();
    const firstChar = lowercaseEmail.charAt(0);

    if (/^[a-z]$/.test(firstChar) && new RegExp(`^${firstChar}+$`).test(lowercaseEmail)) {
        // Se for uma única letra repetida, considerar inválido
        return false;
    }

    // Aqui você pode adicionar outras verificações personalizadas se necessário

    // Caso contrário, considerar válido
    return true;
}

// Função para exibir mensagem de erro
function displayErrorMessage(field, message) {
    field.nextElementSibling.textContent = message;
    field.style.borderColor = 'red';
}

// Função para limpar mensagem de erro
function clearErrorMessage(field) {
    field.nextElementSibling.textContent = '';
    field.style.borderColor = '';
}

// Adicionar ouvintes de eventos para os campos
['firstname', 'lastname', 'email'].forEach(function (id) {
    var field = document.getElementById(id);

    field.addEventListener('blur', function () {
        if (id === 'email') {
            validateField(field, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, customEmailValidation);
        } else {
            validateField(field, /^[a-zA-Z ]{2,30}$/);
        }
    });

    field.addEventListener('focus', function () {
        clearErrorMessage(field);
    });
});

// Validar campos no formulário
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');

    validateField(firstname, /^[a-zA-Z ]{2,30}$/);
    validateField(lastname, /^[a-zA-Z ]{2,30}$/);
    validateField(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, customEmailValidation);
});

// Adicionar estilos CSS para a mensagem de erro
var style = document.createElement('style');
style.innerHTML = `
    .error-message {
        color: red;
        font-size: 12px;
        display: block;
    }
`;
document.head.appendChild(style);

var celularNumber = document.getElementById("tel");

celularNumber.addEventListener("input", () => {
    // Remover caracteres não numéricos por regex
    var cleanValue = celularNumber.value.replace(/\D/g, "").substring(0, 11);

    // Dividir a string em um array de caracteres individuais.
    var numArray = cleanValue.split("");

    // Variável que recebe o número formatado
    var numFormated = "";

    // Se a quantidade é maior que zero
    if (numArray.length > 0) {
        numFormated += `(${numArray.slice(0, 2).join("")})`;
    }

    if (numArray.length > 2) {
        numFormated += ` ${numArray.slice(2, 7).join("")}`;
    }

    if (numArray.length > 7) {
        numFormated += `-${numArray.slice(7, 11).join("")}`;
    }

    // Atribuir o número formatado ao campo de input
    celularNumber.value = numFormated;
});

// Adiciona eventos de foco nos campos para remover a borda vermelha e a mensagem de erro
document.getElementById('tel').addEventListener('focus', function () {
    clearError(this);
});

document.getElementById('city').addEventListener('focus', function () {
    clearError(this);
});

// Adiciona evento de saída do campo para validar o telefone
document.getElementById('tel').addEventListener('blur', function () {
    validatePhone(this);
});

// Adiciona evento de saída do campo para validar a cidade
document.getElementById('city').addEventListener('blur', function () {
    validateCity(this);
});

function clearError(input) {
    input.classList.remove('error');
    input.nextElementSibling.innerHTML = '';
}

function validatePhone(input) {
    clearError(input);

    // Pode adicionar aqui a lógica para validar o número de telefone se necessário

    // Exemplo simples: verifica se há pelo menos 8 dígitos
    if (input.value.length < 8 && input.value.length > 0) {
        showError(input, 'Telefone inválido');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputCity = document.getElementById('city');
    const errorMessage = document.querySelector('.error-message');

    inputCity.addEventListener('input', function() {
        // Remove dígitos do valor atualmente inserido, permitindo somente texto
        inputCity.value = inputCity.value.replace(/\d+/g, '');

        // Validação adicional para mostrar mensagem de erro se necessário
        const isValid = /^[A-Za-z\s]+$/.test(inputCity.value);
        if (!isValid && inputCity.value.length > 0) {
            errorMessage.textContent = "Por favor, insira somente texto, sem números.";
        } else {
            errorMessage.textContent = "";
        }
    });

    inputCity.addEventListener('keypress', function(event) {
        // Impede a digitação de números
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    });
});

function showError(input, message) {
    input.classList.add('error');
    input.nextElementSibling.innerHTML = message;
}


//////////// condicional//////////

document.addEventListener('DOMContentLoaded', function() {
    const firstOptionRadio = document.querySelector('input[name="option"][value="firstoption"]');
    const secondOptionRadio = document.querySelector('input[name="option"][value="secondoption"]');
    const productFieldset = document.getElementById('productFieldset');
    const descriptionField = document.getElementById('descriptionField');

    // Função para alternar visibilidade
    function toggleVisibility() {
        if (firstOptionRadio.checked) {
            productFieldset.style.display = '';
            descriptionField.style.display = 'none';
        } else if (secondOptionRadio.checked) {
            productFieldset.style.display = 'none';
            descriptionField.style.display = '';
        }
    }

    // Adicionando listeners aos botões de rádio
    firstOptionRadio.addEventListener('change', toggleVisibility);
    secondOptionRadio.addEventListener('change', toggleVisibility);

    // Inicializando estado visível
    toggleVisibility(); // Garante que a visibilidade esteja correta ao carregar a página
});

function setupProductHandlers(productNumber) {
    var volumeId = 'volume' + productNumber;
    var pId = 'p' + productNumber;
    var volumeBoxId = 'volumeBox' + productNumber;

    function incrementValue(event) {
        event.preventDefault();
        event.stopPropagation();
        var value = parseInt(document.getElementById(volumeId).value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById(volumeId).value = value;
    }

    function decrementValue(event) {
        event.preventDefault();
        event.stopPropagation();
        var value = parseInt(document.getElementById(volumeId).value, 10);
        value = isNaN(value) ? 0 : value;
        if (value > 1) {
            value--;
            document.getElementById(volumeId).value = value;
        }
    }

    document.getElementById(pId).addEventListener('change', function() {
        var volumeBox = document.getElementById(volumeBoxId);
        if (this.checked) {
            volumeBox.style.display = 'block';
        } else {
            volumeBox.style.display = 'none';
        }
    });

    document.getElementById('increment' + productNumber).addEventListener('click', incrementValue);
    document.getElementById('decrement' + productNumber).addEventListener('click', decrementValue);
}

// Configurar para produtos de 1 a 15
for (var i = 1; i <= 15; i++) {
    setupProductHandlers(i);
}


///////desabilitar botão
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.submit-button button');
    const radio = document.querySelector('.agreement-radio');

    // Inicialmente desabilita o botão de envio
    disableSubmitButton();

    radio.addEventListener('click', function() {
        // Verifica se o botão de rádio já estava marcado antes do clique
        if (this.dataset.checked === "true") {
            this.checked = false;
            this.dataset.checked = "false";
            disableSubmitButton();
        } else {
            this.dataset.checked = "true";
            enableSubmitButton();
        }
    });

    function disableSubmitButton() {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ccc';
        submitButton.style.color = '#666';
        submitButton.style.cursor = 'not-allowed';
    }

    function enableSubmitButton() {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = ''; // Restaura a cor original
        submitButton.style.color = ''; // Restaura a cor do texto original
        submitButton.style.cursor = ''; // Restaura o cursor original
    }
});

//validação pro usuário
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    let isValid = true; // Flag para verificar a validade geral do formulário

    // Valida cada campo e atualiza a flag `isValid` conforme necessário
    ['firstname', 'lastname', 'email'].forEach(function(id) {
        const field = document.getElementById(id);
        if (id === 'email') {
            isValid &= validateField(field, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, customEmailValidation);
        } else {
            isValid &= validateField(field, /^[a-zA-Z ]{2,30}$/);
        }
    });

    if (isValid) {
        console.log('Formulário válido, enviando dados...');

        // Aqui você colocaria a lógica de envio dos dados, por exemplo, uma chamada AJAX ou fetch
        // Simulando um envio de dados assíncrono com um setTimeout
        setTimeout(() => {
            // Mostra uma mensagem para o usuário
            alert('Seus dados foram enviados com sucesso!');

            // Recarrega a página
            window.location.reload();
        }, 1000); // Ajuste o tempo conforme necessário para simular o atraso do envio
    }
});
