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

const loadVidesDisply=(videos)=>{
    const videoShowElement=document.getElementById('displyVideo')
  videos.forEach((item)=>{
    console.log(item);
    const card=document.createElement('div')
    card.classList=('card card-compact')
    card.innerHTML=`
    <figure class="h-[200px]">
    <img
      src=${item.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    
    `
    videoShowElement.append(card)
   
  })
}

const loadDisplay=(categories)=>{
    const disPlayNavBar=document.getElementById('showNavbar')
    categories.forEach((items)=>{
        const button=document.createElement('button')
        button.classList.add('btn')
        button.innerText=items.category
        disPlayNavBar.appendChild(button)
        
    })
}


loadCategories()
loadVideos()