// Função para validar os campos
export function validateField(field, regex, customValidation) {
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
            validateField(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, customEmailValidation);
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
    validateField(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, customEmailValidation);
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

function validateCity(input) {
    clearError(input);

    // Exemplo simples: verifica se o campo está vazio ou possui menos de 3 caracteres
    if (input.value.length < 3 && input.value.length > 0) {
        showError(input, 'Cidade inválida');
    }
}

// Certifique-se de chamar clearError e showError conforme necessário
function clearError(input) {
    input.style.borderColor = '';
    input.nextElementSibling.textContent = '';
}


function showError(input, message) {
    input.classList.add('error');
    input.nextElementSibling.innerHTML = message;
}