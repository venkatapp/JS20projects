const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirmPassword');

//show error message
function showError(input, message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

//show success outline
function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

//email validation
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else {
        showError(input, 'Email is not valid')
    }
}
//check required fields
function checkRequired(inputArr){

    inputArr.forEach(function(input){
        console.log(input.id);
        if(input.value.trim() ===''){
            showError(input, `${getNameField(input)} is required`);  
        }else {
            showSuccess(input)
        }
    })

}

//check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getNameField(input)} must be at least ${min} charecters `);
    }else if(input.value.length > max){
        showError(input, `${getNameField(input)} must be less then ${max} charecters `);
    }else {
        showSuccess(input)
    }
} 

//get Field name
function getNameField(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1 !== input2){
        showError(input2, 'password do not match')
    }
}

//Event listner
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 5, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
})