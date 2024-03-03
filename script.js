const loadAllPost=async(searchText='')=>{
    document.getElementById('allpost-spinner').classList.remove('hidden');
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json()
    const posts = data.posts;
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent='';
    if(posts.length===0){
        allPostContainer.textContent='No post found!!!';
        document.getElementById('allpost-spinner').classList.add('hidden');
        allPostContainer.classList.add('text-3xl');
        allPostContainer.classList.add('text-center');
    }
    else{
        allPostContainer.classList.remove('text-3xl');
        allPostContainer.classList.remove('text-center');
    }
    let activeDiv = null;
    posts.forEach(post => {
        const title =post.title.replace(/'/g,'’');
        const allPostDiv = document.createElement('div');
        if(post.isActive){
            activeDiv = `<div class="bg-green-600 size-4 rounded-full absolute -top-1 -right-1"></div>`;
        }
        else{
            activeDiv = `<div class="bg-red-700 size-4 rounded-full absolute -top-1 -right-1"></div>`;
        }

        allPostDiv.className ='flex gap-2 lg:gap-8 bg-gray-200 rounded-2xl';
        allPostDiv.innerHTML = `
                        <div class="flex flex-col md:flex-row lg:flex-row lg:justify-between justify-center items-center lg:items-start  gap-2 lg:gap-8 bg-gray-200 p-4 lg:p-10 rounded-2xl border grow">
                        <div class="relative w-[50%] md:w-24 lg:w-28">
                        <img class="rounded-xl" src="${post.image}" alt="">
                         ${activeDiv}
                        </div>
                        <div class="space-y-2 grow w-full text-center md:text-start lg:text-start">
                            <h4 class="font-inter opacity-90"><span class="mr-6">#${post.category}</span> <span>Author: ${post.author.name}</span></h4>
                            <h1 class="text-xl font-semibold font-mulish">${post.title}</h1>
                            <p class="opacity-80 max-w-[600px] pb-4">${post.description}</p>
                            <hr class=" border-gray-400 border-dashed">
    
                            <!-- social response  -->
                           <div class="flex justify-between items-center pt-4 font-mulish">
                            <div class="flex gap-4 lg:gap-8">
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-message"></i>
                                    <h5>${post.comment_count}</h5>
                                </div>
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-eye"></i>
                                    <h5>${post.view_count}</h5>
                                </div>
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-clock"></i>
                                    <h5>${post.posted_time}</h5>
                                </div>
                            </div>
                            <div class="size-8 bg-[#10B981] rounded-full flex items-center justify-center">
                                <button onclick="markAsRead('${title}','${post.view_count}')"><i class="fa-regular fa-envelope-open"></i></button>
                            </div>
                           </div>
                        </div> 
                    </div>
        `
        allPostContainer.appendChild(allPostDiv);
        document.getElementById('allpost-spinner').classList.add('hidden');
    });
}

const handleSearch =()=>{
    const inputText = document.getElementById('input-field').value;
    loadAllPost(inputText);
}

let readCount = parseInt(document.getElementById('read-count').innerText);
const markAsRead=(title, viewCount)=>{
    console.log(title)
    const markReadContainer = document.getElementById('mark-read-container');
    const markReadDiv = document.createElement('div');
    markReadDiv.className='flex justify-between bg-white p-4 my-2 rounded-xl';
    markReadDiv.innerHTML=`
    <h3 class="font-bold text-sm">${title}</h3>
    <div class="flex items-center gap-3 opacity-80 text-sm">
        <i class="fa-regular fa-eye"></i>
        <h5>${viewCount}</h5>
     </div>
    `
    markReadContainer.appendChild(markReadDiv);
    readCount = readCount + 1;
    document.getElementById('read-count').innerText=readCount;
}

const loadLasestPost=async()=>{
    document.getElementById('latestpost-spinner').classList.remove('hidden');
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(post=>{
        const latestPostDiv = document.createElement('div');
        latestPostDiv.className='p-6 border border-slate-200 rounded-xl space-y-4';
        latestPostDiv.innerHTML=`
                    <img class="rounded-xl" src="${post.cover_image}" alt="">
                    <div class="flex gap-4 items-center">
                        <i class="fa-solid fa-calendar-days"></i>
                        <h4>${post.author.posted_date? post.author.posted_date:'No Publish Date'}</h4>
                    </div>
                    <h3 class="font-bold text-md font-mulish">${post.title}</h3>
                    <p class="opacity-80 max-w-[500px] mx-auto font-inter">${post.description}</p>
                    <!-- author  -->
                    <div class="flex gap-4 items-center">
                       <div> <img class="w-20 rounded-full" src="${post.profile_image}" alt=""></div>
                       <div class="space-y-1">
                        <h1 class="font-bold">${post.author.name}</h1>
                        <p class="opacity-85">${post.author.designation? post.author.designation:'Unknown'}</p>
                       </div>
                    </div>
        `
        latestPostContainer.appendChild(latestPostDiv);
        document.getElementById('latestpost-spinner').classList.add('hidden');
    })
}

loadLasestPost();
loadAllPost();