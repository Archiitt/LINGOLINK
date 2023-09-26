// Selecting the DOM element with the class "from-text"
const fromText = document.querySelector(".from-text"),

// Selecting the DOM element with the class "to-text"
toText = document.querySelector(".to-text"),

// Selecting the DOM element with the class "exchange" (presumably an icon for exchange)
exchangeIcon = document.querySelector(".exchange"),

// Selecting all DOM elements of type "select"
selectTags = document.querySelectorAll("select"),

// Selecting all DOM elements with the class "row" and the element "i" (presumably icons)
icons = document.querySelectorAll(".row i");

// Selecting the DOM button element
translateBtn = document.querySelector("button");

// Looping through each select element in the NodeList
selectTag.forEach((tag, id) => {
    // Looping through each country code in the 'countries' object
    for (let country_code in countries) {
        // Checking if it's the first select element (English) and setting "selected" accordingly
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : 
                        (country_code == "hi-IN" ? "selected" : "");
                        
        // Creating an HTML option element with the appropriate attributes and values
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        
        // Adding the option to the current select element
        tag.insertAdjacentHTML("beforeend", option);
    }
});
// Adding an event listener to the exchange icon for a click event
exchageIcon.addEventListener("click", () => {
    // Swapping the text and language values between 'fromText' and 'toText'
    let tempText = fromText.value,
        tempLang = selectTag[0].value;

    fromText.value = toText.value;
    toText.value = tempText;
