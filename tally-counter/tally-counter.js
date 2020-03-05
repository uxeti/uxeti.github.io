
function GetTallyCounterDisplay(element) {
    let display = element.getElementsByClassName("tally-counter-display");
    if (display.length > 0) {
        return display[0];
    }
    else {
        return null;
    }
}

function GetTallyCounterAddButton(element) {
    let result = element.getElementsByClassName("tally-counter-add-button");
    if (result.length > 0) {
        return result[0];
    }
    else {
        return null;
    }
}

function GetTallyCounterSubtractButton(element) {
    let result = element.getElementsByClassName("tally-counter-subtract-button");
    if (result.length > 0) {
        return result[0];
    }
    else {
        return null;
    }
}

function GetTallyCounterResetButton(element) {
    let result = element.getElementsByClassName("tally-counter-reset-button");
    if (result.length > 0) {
        return result[0];
    }
    else {
        return null;
    }
}

function GetTallyCounterCloseButton(element) {
    let result = element.getElementsByClassName("tally-counter-close-button");
    if (result.length > 0) {
        return result[0];
    }
    else {
        return null;
    }
}

function GetTallyCounterNameInput(element) {
    let result = element.getElementsByClassName("tally-counter-name");
    if (result.length > 0) {
        return result[0];
    }
    else {
        return null;
    }
}

function ChangeCount(tallyCounterElement, amount) {
    let display = GetTallyCounterDisplay(tallyCounterElement)
    let count = 0
    if (isNaN(display.value)) {
        count = +display.getAttribute("last-viable-value")
    }
    else {
        count = +display.value
    }
    let result = count + amount
    display.value = result
    display.setAttribute("last-viable-value", result)
}

function ResetCount(tallyCounterElement) {
    let display = GetTallyCounterDisplay(tallyCounterElement)
    display.value = 0
    display.setAttribute("last-viable-value", 0)
}

function GetTallyCounterElement(childElement) {
    let result = childElement;
    for (var i = 0; i < 10; i++) {
        if (result == null || result.tagName == "TALLY-COUNTER") {
            break;
        }
        else {
            result = result.parentElement;
        }
    }
    return result
}

function AddButon_OnClick(event) {
    let tallyCounter = GetTallyCounterElement(event.target);
    ChangeCount(tallyCounter, 1)
}

function SubtractButon_OnClick(event) {
    let tallyCounter = GetTallyCounterElement(event.target);
    ChangeCount(tallyCounter, -1)
}

function ResetButon_OnClick(event) {
    let tallyCounter = GetTallyCounterElement(event.target);
    ResetCount(tallyCounter)
}

function CloseButon_OnClick(event) {
    let tallyCounter = GetTallyCounterElement(event.target);
    tallyCounter.parentNode.removeChild(tallyCounter)
}

function CreateNewTallyCounter() {
    let template = document.getElementById("template")
    let clone = template.cloneNode(true)
    clone.removeAttribute("id")

    var display = GetTallyCounterDisplay(clone)
    if (display != null) {
        display.setAttribute("last-viable-value", 0)
        display.value = 0
    }

    var addButton = GetTallyCounterAddButton(clone)
    if (addButton != null) {
        addButton.addEventListener("click", AddButon_OnClick)
    }

    var subtractButton = GetTallyCounterSubtractButton(clone)
    if (subtractButton != null) {
        subtractButton.addEventListener("click", SubtractButon_OnClick)
    }

    var resetButton = GetTallyCounterResetButton(clone)
    if (resetButton != null) {
        resetButton.addEventListener("click", ResetButon_OnClick)
    }

    var closeButton = GetTallyCounterCloseButton(clone)
    if (closeButton != null) {
        closeButton.addEventListener("click", CloseButon_OnClick)
    }

    template.parentNode.insertBefore(clone, template)

    var nameInput = GetTallyCounterNameInput(clone)
    if (nameInput != null) {
        nameInput.focus()
    }
}

function OnLoad(e) {
    CreateNewTallyCounter()
    var addANewCounterButton = document.getElementById("add-a-new-counter-button")
    addANewCounterButton.addEventListener("click", (e) => { CreateNewTallyCounter() })
}

window.addEventListener("load", OnLoad)
