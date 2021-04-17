


// Adding the cards to To Do App

const title = document.querySelector('.title');
const content = document.querySelector('.description');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.main_block1');

const emptyContainer = document.querySelector('.fill_container')
const disBtn = document.querySelector('.disappear')

submitBtn.addEventListener('click' , e => {
    e.preventDefault();

    if(title.value === '' || content.value === ''){
        emptyContainer.classList.toggle('appear')
    }else if(title.value !== '' && content.value !== ''){
        const todos = JSON.parse(localStorage.getItem('todos'))

        localStorage.setItem('todos' , JSON.stringify([
            ...todos,
            {
                title: title.value,
                date: CurrentTime(),
                content: content.value,
                completed: false
            }
        ]))
        window.location.reload()
    }
})

disBtn.addEventListener('click' , e => {
    e.preventDefault('');

    emptyContainer.classList.remove('appear')
})


window.addEventListener('load' , () => {
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos' , JSON.stringify([]))
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'))
        const newTodos = todos.map((item , index) => {
            return { ...item , id: index}
        })
        localStorage.setItem('todos' , JSON.stringify(newTodos))
        
        const template = newTodos.reverse().reduce((total , { title , date , content , completed , id }) => {
            if(completed){
                return total += `<div class="block1_container completed">${cardTemplate(title , date , content , id)}</div>`
            }else{
                return total += `<div class="block1_container">${cardTemplate(title , date , content , id)}</div>`
            }
        }, '')
        container.innerHTML = template
    }
})


function cardTemplate(title , date , content , id){
    if(content.length >= 200){
        return `
        <div class="block1_left">
            <div class="block1_left_header">
                <h2>${title}</h2>
                <p>${date}</p>
            </div>
            <div class="block1_left_body shorted">
                ${content}
            </div>
        </div>
        <div class="block1_right">
            <button onclick="deleteTask(${id})" data-id="${id}">DELETE</button>
            <button onclick="editTask(${id})" data-id="${id}">EDIT</button>
            <button onclick="completeTask(${id})" data-id="${id}">COMPLETE</button>
        </div>
        `
    }else{
        return `
        <div class="block1_left">
            <div class="block1_left_header">
                <h2>${title}</h2>
                <p>${date}</p>
            </div>
            <div class="block1_left_body">
                ${content}  
            </div>
        </div>
        <div class="block1_right">
            <button onclick="deleteTask(${id})" data-id="${id}">DELETE</button>
            <button onclick="editTask(${id})" data-id="${id}">EDIT</button>
            <button onclick="completeTask(${id})" data-id="${id}">COMPLETE</button>
        </div>
        `
    }
}

// Get Current Time

function CurrentTime(){
    return `${moment().format('L')} ${moment().format('LTS')}`
}


// DeleteTaskBtn

const deleteContainer = document.querySelector('.deleteContainer')
const yesBtn = document.querySelector('.yesBtn')
const noBtn = document.querySelector('.noBtn')


function deleteTask(id){
    deleteContainer.classList.toggle('delete')
    yesBtn.addEventListener('click' , e => {
        e.preventDefault();

        const todos = JSON.parse(localStorage.getItem('todos'))
        const newTodos = todos.filter(item => item.id !== id)
        localStorage.setItem('todos' , JSON.stringify(newTodos))
        window.location.reload()
        deleteContainer.classList.remove('delete')
    })
    noBtn.addEventListener('click' , ()=> {
        deleteContainer.classList.remove('delete')
    })
}


// EditTaskBtn

const completeContainer = document.querySelector('.completeContainer')
const submit = document.querySelector('.submit')
const noSubmit = document.querySelector('.noSubmit')
const newTitle = document.querySelector('.newTitle')
const newContent = document.querySelector('.newContent')

function editTask(id){
    completeContainer.classList.toggle('some')
    submit.addEventListener('click' , e => {
        e.preventDefault();

        const todos = JSON.parse(localStorage.getItem('todos'))
        const newTodos = todos.map(item => {
            if(item.id === id){
                if(newTitle.value === '' && newTitle.value === ''){
                    return item
                }else{
                    return {
                        ...item,
                        title: newTitle.value,
                        content: newContent.value,
                        date: CurrentTime()
                    }
                }
            }else{
                return item
            }
        })

        localStorage.setItem('todos' , JSON.stringify(newTodos))
        window.location.reload()
        completeContainer.classList.remove('some')
        newTitle.value = ''
        newContent.value = ''
    })

    noSubmit.addEventListener('click' , () => {
        completeContainer.classList.remove('some')
        newTitle.value = ''
        newContent.value = ''
    })
}


// CompleteTask

function completeTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'))
    const newTodos = todos.map(item => {
        if(item.id === id){
            return {
                ...item,
                completed: !item.completed
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos' , JSON.stringify(newTodos))
    window.location.reload()
}