const LoadCategory = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();

    if (data.data[3].category === "Drawing") {
        const emptyContainer = document.getElementById("empty-container");
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-10">
        <i class="fa-solid fa-video-slash"></i>
        <h1 class="text-4xl font-bold text-black">Oops!! Sorry, There is no content here</h1>
    
        </div>

        `;

        emptyContainer.appendChild(div);
    }
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <a onclick="LoadItems('${category.category_id}')" class="tab">${category.category}</a> 
        `;

        tabContainer.appendChild(div);
    });

    // Load the default category by calling LoadItems with the desired category ID
    LoadItems("1000"); // Replace "1000" with your desired default category ID
};

let videoCards = [];

const LoadItems = async (categoryId) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();

    videoCards = data.data;
    LoadCards(videoCards);
};

const LoadCards = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";


    cards.forEach((videos) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 h-96 rounded-md">
            <figure><img class="w-full h-60 rounded-md" src=${videos.thumbnail} alt="" /></figure>
            <div class="card-body flex flex-row gap-4 pl-0">
            <img class="rounded-full w-10 h-10" src=${videos.authors[0].profile_picture} alt="">
            <div">
                <h2 class="card-title">${videos.title}</h2>
                <p>${videos.authors[0].profile_name} ${videos.authors[0].verified ? '<i class="fa-solid fa-circle-check text-blue-700"></i>' : ''}</p>
                <p>${videos.others.views} views</p>
            </div>
            </div>
        </div>
        `;

        cardContainer.appendChild(div);
    });
};

const sortButton = document.getElementById("sortButton");
sortButton.addEventListener("click", () => {
    // Sort videoCards based on views in descending order
    videoCards.sort((a, b) => {
        const viewA = parseFloat(a.others.views.replace('K', ''));
        const viewB = parseFloat(b.others.views.replace('K', ''));
        return viewB - viewA;
    });

    // Render the sorted video cards
    LoadCards(videoCards);
});

LoadCategory();
