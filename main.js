var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("submit");

btn.addEventListener("click", function() {

 var ourRequest = new XMLHttpRequest();
ourRequest.open('GET','.env');
ourRequest.onload = function() {

    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
};
    ourRequest.send();
});

function renderHTML(data) {
    var htmlString = "this is a test";

    for (i=0; i < data.length; i++) {
        htmlString += "<p>" + data[i]
    }
    animalContainer.insertAdjancetHTML('beforeend', htmlString);
}



