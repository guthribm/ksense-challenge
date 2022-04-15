let table = document.getElementById('table')
let posts = document.getElementById('posts')



// function to fetch post comments based on the ID passed from the button click event
async function getPosts(id){
    document.querySelectorAll("button").forEach(item => item.classList.remove("current"))
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`); 
        }
        const json = await response.json();
        document.getElementById(`${id}`).classList.add('current')
        posts.innerHTML = ""
        for(let i of json){
            posts.innerHTML +=  `
            <div class="post-container">
            <p>id ${i.id}</p>
            <p><span>Name:</span> ${i.name}</p>
            <p><span>Email:</span> ${i.email}</p>
            <p><span>Post:</span> ${i.body}</p>
            </div>            
            `
        }

    }
    catch(e){
        console.log('error: '+e)
    }
    
}

// function to get users and display them as buttons. then adds event listener that will take
// the current target id and pass it to the get post function
async function getUsers(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        for (let i of json){
            table.innerHTML += `<button id="${i.id}" class="name">${i.name}</button>`
        }
        document.querySelectorAll("button").forEach(item=>item.addEventListener('click',(e)=>{getPosts(e.currentTarget.id)}))
        // console.log('json: '+json)
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}

getUsers()

