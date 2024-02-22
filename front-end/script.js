FirebaseFirestore.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().red("form");

document.getElementById("form").addEventListener("submit", submitForm )

function submitForm(e){
    e.preventDefault();

    var firstname = getElementVal('firstname');
    var lastname = getElementVal('lastname');
    var email = getElementVal('email');

    console.log(firstname, lastname, email);
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

fetch('http://localhost:5500/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})




import cors from 'cors';
app.use(cors());


