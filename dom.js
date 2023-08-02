/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addElementBtn');
    element.addEventListener('click', function () {
        addElement();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });

    /* element = document.getElementById('deleteBySelectorBtn');
    element.addEventListener('click', function () {
        deleteBySelector();
    }); */

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });


}

function addElement() {
    // Get the selected element type from the select menu
    let selectElement = document.getElementById('elementType');
    let elementType = selectElement.value;

    // Get the content for the new element from the text field
    let elementContent = document.getElementById('elementContent').value;

    // Create the new element based on the selected type
    let newElement;
    let outputTag = document.getElementById('output');
    switch (elementType) {
        case 'textNode':
            newElement = `New Text Node - ${getCurrentDateTime()}`;
            outputTag.appendChild(document.createTextNode(elementContent));
            break;
        case 'comment':
            newElement = `<!-- New Comment - ${getCurrentDateTime()} -->`;
            outputTag.appendChild(document.createComment(elementContent));
            break;
        case 'element':
            // Validate the user's input for the new element
            if (!isValidTagName(elementContent)) {
                alert('Please enter a valid HTML tag name for the new element.');
                return;
            }
            newElement = `New ${elementContent} - ${getCurrentDateTime()}`;
            outputTag.appendChild(document.createElement(elementContent))
            break;
        default:
            return; // Return if no valid element type is selected
    }



    // Append the new element or comment to the output tag and add a newline


    if (outputTag.innerHTML !== '') {
        outputTag.appendChild(document.createElement('br'));
    }

    // Append the new element or comment to the output tag as a string representation
    let outText = document.getElementById('textOut')
    if (outText.innerHTML !== '') {
        outText.appendChild(document.createElement('br'));
    }
    outText.appendChild(document.createTextNode('\n' + newElement));
}





function isValidTagName(tagName) {
    const validTagNames = new Set([
        'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
        'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
        'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
        'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
        'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
        'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
        'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript',
        'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre',
        'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section',
        'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
        'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead',
        'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
        // Add more valid tags here
    ]);
    return validTagNames.has(tagName.toLowerCase());
}




// Helper function to get the current date and time
function getCurrentDateTime() {
    let currentDate = new Date();
    return currentDate.toLocaleString();
}


function walk() {
    let el;

    el = document.getElementById('p1');
    showNode(el);

    el = el.firstChild;
    showNode(el);

    el = el.nextSibling;
    showNode(el);

    el = el.lastChild;
    showNode(el);

    el = el.parentNode.parentNode.parentNode;
    showNode(el);

    el = el.querySelector('section > *');
    showNode(el);


}

function advancedWalk() {
    let rootNode = document.documentElement; // The root of the document

    let outputTextarea = document.getElementById('advancedWalkOutput');
    outputTextarea.value = ''; // Clear the textarea

    function walkTree(node, indent = 0) {
        if (node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim()) {
            return; // Ignore whitespace text nodes
        }

        if (node.nodeType === Node.COMMENT_NODE) {
            return; // Ignore comments
        }

        let spaces = '    '.repeat(indent);
        outputTextarea.value += `${spaces}|-- ${node.nodeName}\n`;

        let children = node.childNodes;
        for (let child of children) {
            walkTree(child, indent + 1);
        }
    }

    walkTree(rootNode);
}


function showNode(el, indent = 0) {
    let spaces = ' '.repeat(indent);
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let outputTextarea = document.getElementById('traversalOutput');
    outputTextarea.value += `\nNode type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`;

}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify() {
    // Change the text of the h1 to say "DOM Manipulation is Fun!"
    let h1Element = document.querySelector('h1');
    h1Element.textContent = 'DOM Manipulation is Fun!';

    //Change the color of the h1
    let darkColors = [
        '--darkcolor1',
        '--darkcolor2',
        '--darkcolor3',
        '--darkcolor4',
        '--darkcolor5',
        '--darkcolor6'
    ];
    let randomColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    h1Element.style.color = `var(${randomColor})`;

    let pElement = document.getElementById('p1');
    pElement.classList.toggle('shmancy');
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    const doc = document;
    const controlsSection = doc.getElementById('controls');
    const body = doc.body;
    const head = doc.head;
    const headerElement = doc.querySelector('header');

    // Delete everything inside body except 'controls' section
    let currentElement = body.firstElementChild;
    while (currentElement) {
        const nextElement = currentElement.nextElementSibling;

        if (currentElement !== controlsSection) {
            currentElement.parentNode.removeChild(currentElement);
        }

        currentElement = nextElement;
    }

    // Delete everything inside head
    while (head.firstChild) {
        head.removeChild(head.firstChild);
    }

    // Delete everything inside header
    while (headerElement.firstChild) {
        headerElement.removeChild(headerElement.firstChild);
    }
}

// New function to delete elements by selector
function deleteBySelector() {
    const selector = document.getElementById('deleteSelector').value;
    //console.log(selector);


    if (selector) {
        // Get the list of elements that match the selector
        var elementsToDelete = document.querySelectorAll(selector);
        // Delete each matching element
        /* console.log(elementsToDelete);
        elementsToDelete.forEach(e => e.parentNode.removeChild(e)); */
        for (let i = 0; i < elementsToDelete.length; i++) {
            if (elementsToDelete[i] != null) {
                elementsToDelete[i].remove();
            }
        }
    }
}

function basicClone() {
    let p1Element = document.getElementById('p1');
    let clonedElement = p1Element.cloneNode(true);

    // Modify attributes of the cloned element (if needed)
    clonedElement.id = 'clonedP1';
    clonedElement.value = document.getElementById('p1').value;

    // Append the cloned element to the DOM
    let outputTag = document.getElementById('output');
    outputTag.appendChild(clonedElement);
}

function advancedClone() {

    const cardTemplate = document.querySelector('template').content;

    const clonedCard = cardTemplate.cloneNode(true);

    const randomTitle = 'Card Title ' + (document.querySelectorAll('.card').length + 1);
    const randomText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tellus ac tristique hendrerit.';
    const randomNumber = Math.floor(Math.random() * 1000);

    // Update the title and text content in the cloned card
    const cardHeader = clonedCard.querySelector('.card-header h2');
    cardHeader.textContent = randomTitle;

    const cardText = clonedCard.querySelector('.card-body p');
    cardText.textContent = randomText + ' Random Number: ' + randomNumber;

    // Append the cloned card to the output tag
    const outputTag = document.getElementById('output');
    outputTag.appendChild(clonedCard);
}

window.addEventListener('DOMContentLoaded', init);