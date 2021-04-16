
// Registration

const registerName = document.querySelector('.registerName')
const registerEmail = document.querySelector('.registerEmail')
const registerPassword = document.querySelector('.registerPassword')
const registerBtn = document.querySelector('.registerBtn')
const show1 = document.querySelector('.show_container1')
const show3 = document.querySelector('.show_container3')

// closedAllertBtn

const closed1 = document.querySelector('.closed1')
closed1.addEventListener('click' , e => {
    e.preventDefault();
    show1.classList.remove('appear')
})

const closed3 = document.querySelector('.closed3')
closed3.addEventListener('click' , e => {
    e.preventDefault();
    show3.classList.remove('appear')
})


registerBtn.addEventListener('click' , e => {
    e.preventDefault()

    if(registerName.value === '' && registerEmail.value === '' && registerPassword.value === ''){
        show1.classList.toggle('appear')
    }else{
        if(registerName.value === 'admin' && registerEmail.value === 'admin' && registerPassword.value === 'admin'){
            registerName.value = ''
            registerEmail.value = ''
            registerPassword.value = ''
            localStorage.setItem('isAuth' , "true")
            window.location.reload()
        }else{
            show3.classList.toggle('appear')
            registerName.value = ''
            registerEmail.value = ''
            registerPassword.value = ''
            localStorage.setItem('isAuth' , "false")
        }
    }
})

// Checking Autorization

window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth')
    isAuth === 'true' ? window.open('index.html' , '_self') : null
})