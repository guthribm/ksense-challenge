let table = document.getElementById('table')
let posts = document.getElementById('posts')



// function to fetch post comments based on the ID passed from the button click event
async function getPosts(id){
    document.querySelectorAll(".name").forEach(item => item.classList.remove("current"))
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
            <tr class='post-container'>
            <td><span>NAME:</span> ${i.name}<br><span>EMAIL:</span> ${i.email}<br><span>POST:</span> ${i.body}</td>
            </tr>       
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
            table.innerHTML += `<tr id="${i.id}" class="name"><td>${i.name}</td></tr>`
        }
        document.querySelectorAll(".name").forEach(item=>item.addEventListener('click',(e)=>{getPosts(e.currentTarget.id)}))
        // console.log('json: '+json)
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}

getUsers()

