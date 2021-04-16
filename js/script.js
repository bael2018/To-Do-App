

// ThemeSelector

const selector = document.querySelector('.theme-selector')
const body = document.body
const chooseBg = document.querySelector('.choose_container')
const newBg = document.querySelector('.chooseBackGround')
const chooseBtn = document.querySelector('.chooseBtn')

selector.addEventListener('change' , e => {
    e.preventDefault();
    const value = e.target.value;
    if(value === 'default'){
        body.style.background = 'linear-gradient(90deg, rgba(238, 62, 223, 0.704) 0%, rgb(55, 188, 228) 100%, rgba(52, 176, 247, 0.359) 100%)'
        localStorage.setItem('siteTheme' , 'linear-gradient(90deg, rgba(238, 62, 223, 0.704) 0%, rgb(55, 188, 228) 100%, rgba(52, 176, 247, 0.359) 100%)')
        localStorage.setItem('theme' , 'default')
        chooseBg.classList.remove('appear')
    }else if(value === 'gradient1'){
        body.style.background = 'linear-gradient(90deg, rgba(80,104,255,1) 0%, rgba(2,181,254,0.7511379551820728) 100%, rgba(247,52,161,0.35898109243697474) 100%)';
        localStorage.setItem('siteTheme' , 'linear-gradient(90deg, rgba(80,104,255,1) 0%, rgba(2,181,254,0.7511379551820728) 100%, rgba(247,52,161,0.35898109243697474) 100%)')
        localStorage.setItem('theme' , 'gradient1')
        chooseBg.classList.remove('appear')
    }else if(value === 'gradient2'){
        body.style.background = 'linear-gradient(90deg, rgba(254,247,2,1) 0%, rgba(255,80,80,0.742734593837535) 100%, rgba(247,52,161,0.35898109243697474) 100%)'
        localStorage.setItem('siteTheme' , 'linear-gradient(90deg, rgba(254,247,2,1) 0%, rgba(255,80,80,0.742734593837535) 100%, rgba(247,52,161,0.35898109243697474) 100%)')
        localStorage.setItem('theme' , 'gradient2')
        chooseBg.classList.remove('appear')
    }else if(value === 'custom'){
        chooseBg.classList.toggle('appear')
        chooseBtn.addEventListener('click' , e => {
            e.preventDefault()

            if(newBg.value === '' || newBg.value === 'white' || newBg.value === '#efefef'){
                return
            }else{
                const OwnBg = newBg.value
                body.style.background = OwnBg
                localStorage.setItem('siteTheme' , OwnBg)
                localStorage.setItem('theme' , 'custom')
                chooseBg.classList.remove('appear')
                newBg.value = ''  
            }
        })
    }
})

window.addEventListener('load' , () => {
    if(localStorage.getItem('theme')){
        body.style.background = localStorage.getItem('siteTheme')
        selector.value = localStorage.getItem('theme')
    }
})














// Checking Autorization

window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth')

    isAuth === 'true' ? null : window.open('auth.html' , '_self')
})


const signOutBtn = document.querySelector('.signOutBtn')
signOutBtn.addEventListener('click' , () =>{
    localStorage.setItem('isAuth' , 'false')
    window.location.reload()
})