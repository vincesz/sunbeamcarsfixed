let carlist = []; // IMPORTANT!! global variable with let

fetch("https://raw.githubusercontent.com/vincesz/sunbeamdata/main/data.json")
.then(function (data) {
    return data.json();
})
.then(function (post) {
    carlist = post.carlist; // Setting global variable equal json list (array)
    console.log(post.carlist)
})
.catch(function (error) {
    const errordiv = document.getElementById("error");
    errordiv.innerHTML = "Service is not available";
})