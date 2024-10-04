const convertSecondToHour=(time)=>{
    const hour=parseInt(time/3600)
    let remaindingSecond=time%3600;
    const minute=remaindingSecond=parseInt(remaindingSecond/60)
    remaindingSecond=remaindingSecond % 60
    return`${hour} hrs ${minute} min ago ${remaindingSecond} `
 }

 const removeActiveClass=()=>{
    const getIdnumber=document.getElementsByClassName('btn-category')
    for(let btnn of getIdnumber){
        btnn.classList.remove('active')
    }

 }

const tubeCategory=()=>{
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(response=>response.json())
.then(data=> tubeCategoryDisplay(data.categories))
.catch(error=>console.log(error))
}



const loadCategoryId=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(response=>response.json())
    .then(data=>{
        removeActiveClass()
        const active=document.getElementById(`btn-${id}`)
        active.classList.add('active')
        allVideoDisplay(data.category)
        console.log(active)
    })
    .catch(error=>console.log(error))
}

const tubeCategoryDisplay=(datas)=>{
    const navBar=document.getElementById('dainamicNavBar')
    datas.forEach((getData)=>{
        const buttonContainer=document.createElement('div')
        buttonContainer.innerHTML=`
        <button id="btn-${getData.category_id}" onclick="loadCategoryId(${getData.category_id})" class="btn btn-category"> 
        ${getData.category}
        
        </button>
        `
       navBar.appendChild(buttonContainer)
    })
   
}



const allVideo=(searcText="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searcText}`)
    .then(response=>response.json())
    .then(data=>allVideoDisplay(data.videos))
    .catch(error=>console.log(error))
}


const loadDetails= async(videosId)=>{
    console.log(videosId);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videosId}`
    const response=await fetch(url)
    const data=await response.json()
    displayDetails(data.video)
}



const displayDetails=(video)=>{
    console.log(video);
    const modall=document.getElementById('modal-container')
    modall.innerHTML=`
     <img src=" ${video.thumbnail}"/>
     <p>${video.description}</p>
    `

    // document.getElementById('showModalButton').click()

    document.getElementById('coustomModal').showModal()

}


const allVideoDisplay=(getAllVideos)=>{

    const showVideo=document.getElementById('displyVideo')
    showVideo.innerHTML=""
    if(getAllVideos.length==0){
        showVideo.classList.remove('grid')
         showVideo.innerHTML=`
        <div class="text-center">
         <img class="mx-auto" src="./assect/icon.png"/>
         <p class="text-3xl">Opss! Sorry There is no content here</p>
        
        </div>
         `

         return

    } else{
        showVideo.classList.add('grid')
    }
    getAllVideos.forEach((videos)=>{
       const div=document.createElement('div')
       div.innerHTML=`
       <figure class="h-[200px] relative">
    <img class="object-cover h-[200px]"
      src="${videos.thumbnail}"
      alt="Shoes" />
      ${videos.others.posted_date?.length==0?"" : `<span class="absolute  text-sm bottom-7 right-4 bg-black text-white p-2"> ${convertSecondToHour(videos.others.posted_date)} </span>`}
  </figure>
  <div class=" px-0 py-2 flex  items-center gap-2 ">

    <div class=" font-semibold" >
      <img class="h-10 w-10 rounded-full object-cover" src="${videos.authors[0].profile_picture}"/>
    </div>
    <div>
    <p class="font-bold"> ${videos.title}  </p>

    <div class="flex justify-center gap-3 items-center">
      <h2> ${videos.authors[0].profile_name} </h2>
     ${videos.authors[0].verified==true? `<img class="h-5 w-5" src="https://img.icons8.com/?size=96&id=63760&format=png"/>` : ""}

    
    </div>
     <p>
     <button onclick="loadDetails('${videos.video_id}')" class="border px-2 hover:bg-red-200">Details</button>
            </div>
     </p>
    </div>
  </div>
       `

       showVideo.appendChild(div)
    })

}

document.getElementById('search-info').addEventListener('keyup',(e)=>{
    allVideo(e.target.value)
}
)




tubeCategory()
allVideo()

