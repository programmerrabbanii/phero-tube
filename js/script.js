function setTime(time){
    const hour=parseInt(time/3600)
    let remaingSecond=time%3600;
    const minutes=parseInt(remaingSecond /60)
    remaingSecond=remaingSecond %60;

    return`${hour} hour ${minutes} minute ${remaingSecond} second ago`


}



const loadCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response=>response.json())
    .then(data=> loadDisplay(data.categories))
    .catch(error=> console.log(error))
}

const loadVideos=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response=>response.json())
    .then(data=>loadVidesDisply(data.videos))
    .catch(error=>console.log(error))
}

const loadSortVide=(id)=>{

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(response=>response.json())
    .then(data=>loadVidesDisply(data.category))
    .catch(error=>console.log(error))


}

const loadVidesDisply=(videos)=>{
    const videoShowElement=document.getElementById('displyVideo')
    videoShowElement.innerHTML=""
    if(videos.length==0){
        videoShowElement.classList.remove('grid');
        videoShowElement.innerHTML=`
        <div class="min-h-[300px] flex  flex-col gap-5 justify-center items-center">
        <img src="./assect/Icon.png"/>
        <h2 class="text-center text-3xl"> Oops!! Sorry, There is no </br> content here </h2>

        </div>
        
        `
        return
    }
    else{
        videoShowElement.classList.add('grid')
    }
  videos.forEach((item)=>{
    console.log(item);
    const card=document.createElement('div')
    card.classList=('card card-compact')
    card.innerHTML=`
    <figure class="h-[200px] relative">
    <img
      src=${item.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${item.others.posted_date?.length== 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white px-2 py-1"> ${setTime(item.others.posted_date)} </span>`}
      
  </figure>
  <div class="px-0 py-2 flex items-center gap-2">
    
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}"/>
    </div>
    <div>
    <h2 class="font-bold">
       ${item.title}
    </h2>
    <div class="flex items-center gap-2">
    <p>${item.authors[0].profile_name}</p>
    ${item.authors[0].verified=== true? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=63760&format=png"/>` : ''
    }
    </div>
    </div>
  </div>
    `
    videoShowElement.append(card)
   
  })
}

const loadDisplay=(categories)=>{
    const disPlayNavBar=document.getElementById('showNavbar')
    categories.forEach((items)=>{
        const buttonContainer=document.createElement('div')
         buttonContainer.innerHTML=`
         <button onclick="loadSortVide(${items.category_id})" class="btn">
         ${items.category}
         
         </button>
         `
       
        disPlayNavBar.appendChild(buttonContainer)
        
    })
}


loadCategories()
loadVideos()