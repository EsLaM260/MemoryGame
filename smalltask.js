let blocksContainerChild = document.querySelectorAll(".memory-game-blocks .game-block");
document.querySelector(".control-button").onclick = function () {
    let yourName = prompt("whats Your Name");

    if (yourName == "" || yourName == null) {
        document.querySelector(".name span").innerHTML = "unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    // to show all item in first second
    blocksContainerChild.forEach((block) => {
        block.classList.add("rotate");
        setTimeout(() => {
        block.classList.remove("rotate");
            
        },duration)
    })
    document.querySelector(".control-button").remove()

}

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {

        // trigger the flip block function
        rotate(block);


    })
});

// flip block finction 
function rotate(selectBlock) {

    selectBlock.classList.add("rotate");
    // collect the rotate cards
    let allFlippedBlocks = blocks.filter(flippedBlobk => flippedBlobk.classList.contains("rotate"));
    // check if the two card is rotate
    if (allFlippedBlocks.length == 2) {
        // stop event clicking
        stopClicking();

        // match block 
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

function checkMatched(firstBlock,secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("rotate");
        secondBlock.classList.remove("rotate");
        secondBlock.classList.add("has-match");
        firstBlock.classList.add("has-match");

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("rotate");
            secondBlock.classList.remove("rotate");
        },duration)
    }
}

function shuffle(array) {

    // setting vars
    let current = array.length, temp, random;
    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);

        // decrease curent number
        current--
        // [1] save current element in stash
        temp = array[current];
        // [2] cureent element = random element
        array[current] = array[random];
        // [3] random element = current element
        array[random] = temp
    }
    return array;
}

function stopClicking() {

    // add class no clicking on main container
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        blocksContainer.classList.remove("no-clicking");

    }, duration)

}



