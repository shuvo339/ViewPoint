const loadAllPost=async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const posts = data.posts;
    const allPostContainer = document.getElementById('all-post-container');
    posts.forEach(post => {
        console.log(post)
        const allPostDiv = document.createElement('div');
        allPostDiv.className ='flex gap-2 lg:gap-8 bg-gray-200 p-10 rounded-2xl';
        allPostDiv.innerHTML = `
        <div class="flex justify-between gap-2 lg:gap-8 bg-gray-200 p-10 rounded-2xl border grow">
                        <div class="relative w-28">
                            <img class="rounded-xl" src="${post.image}" alt="">
                            <div class="active-sign bg-green-700 size-4 rounded-full absolute -top-1 -right-1"></div>
                        </div>
                        <div class="space-y-2 grow w-full">
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
                                <button onclick="markAsRead('${post.title}','${post.view_count}')"><i class="fa-regular fa-envelope-open"></i></button>
                            </div>
                           </div>
                        </div> 
                    </div>
        `
        allPostContainer.appendChild(allPostDiv);
    });
}

let readCount = parseInt(document.getElementById('read-count').innerText);
const markAsRead=(title, viewCount)=>{
    const markReadContainer = document.getElementById('mark-read-container');
    const markReadDiv = document.createElement('div');
    markReadDiv.className='flex justify-between bg-white p-4 my-2 rounded-xl';
    markReadDiv.innerHTML=`
    <h3 class="font-bold text-md">${title}</h3>
    <div class="flex items-center gap-3 opacity-80">
        <i class="fa-regular fa-eye"></i>
        <h5>${viewCount}</h5>
     </div>
    `
    markReadContainer.appendChild(markReadDiv);

    readCount = readCount + 1;
    document.getElementById('read-count').innerText=readCount;
}

loadAllPost();