let cardData = document.getElementById("card");
let categoryDiv = document.getElementById("cartButton");
let emptyDiv = document.getElementById("noData");
let array = [];

const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            categoryDiv.textContent = "";
            data?.data?.forEach((d, index) => {
                categoryDiv.innerHTML += `
            <button
                class="px-4 nav-item py-2 rounded ${index === 0 && "bg-danger text-white"
                    } "
                onclick="loadData('${d?.category_id}'); activeNav(this)"
                >
                ${d?.category}
            </button>
            `;
            });
        });
};

const activeNav = (ele) => {
    const items = document.getElementsByClassName("nav-item");
    for (let item of items) {
        item.classList.remove("bg-danger", "text-white");
    }
    ele.classList.add("bg-danger", "text-white");
};

const loadData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            array = data?.data;
            displayData(array);
        });
};

const sortData = () => {
    const sorted = array.sort((a, b) => {
        return parseFloat(b?.others?.views.split("K")[0]) >
            parseFloat(a?.others?.views.split("K")[0])
            ? 1
            : -1;
    });
    displayData(sorted);
};
const displayData = (data) => {
    console.log(data);
    cardData.textContent = "";
    if (data.length === 0) {
        if (emptyDiv) {
            emptyDiv.style.display = "block";
        }
        return;
    }
    if (emptyDiv) {
        emptyDiv.style.display = "none";
    }
    data?.forEach((data) => {
        cardData.innerHTML += `
            <div>
                <div class="mx-5 mb-5 mx-md-0 mb-md-0">
                    <div class="card">
                        <div class="position-relative">
                            <img src="${data?.thumbnail}" class="img-fluid card-img-top" style="height: 200px" alt="...">
                            ${data?.others?.posted_date &&
                                `<p class='position-absolute rounded text-white bg-black p-2 opacity-50' style="margin-top: -8vh; right: 2vh ">${secToMin(data?.others?.posted_date)}</p>`
                            }
                        </div>
                        <div class="card-body mt-2">
                            <div class="d-flex justify-content-between gap-1"> 
                            <div class="col-2">
                            <img class="img-fluid rounded-circle" style="width: 50px; height: 50px" src="${data?.authors[0]?.profile_picture}" alt="">
                            </div>
                            <div class="col-10">
                            <h5 class="card-title">${data?.title}</h5>
                            <p class='card-text'>${data?.authors[0]?.profile_name} 
                                ${data?.authors[0]?.verified === true &&
                                    `<img class="img-fluid" style="width: 20px; height: 20px"src="./asserts/verify.png" alt="" />`
                                }
                            </p>
                            <p>${data?.others?.views} Views</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
};

const secToMin = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) {
        return `${minutes} min ago`;
    } else if (minutes === 0) {
        return `${hours} hrs ago`;
    } else {
        return `${hours} hrs ${minutes} min ago`;
    }
};


loadCategory();
loadData(1000);
