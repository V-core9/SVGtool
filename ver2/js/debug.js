
function startDebugger(){
    console.log('yea debugging');
    var debugContainer = document.createElement("DIV");        
    debugContainer.setAttribute('id', 'debugContainer');

    document.documentElement.appendChild(debugContainer);
    insertStyle('debug-style','css/debug.css');

    drawDebugHeader();
    drawDebugContentContainer();
}

function drawDebugHeader(){
    drawApplicationInnerElem('debugHeader', 'debugContainer');
    document.getElementById('debugHeader').innerHTML = `<div class="title">
                                                            <p>Debug Console</p>
                                                        </div>
                                                        <div class="options">
                                                            <button>Options</button>
                                                            <button onclick="toggleDebugOpen()" class="debugToggler">Show/Hide</button>
                                                        </div>`;
}

function drawDebugContentContainer(){
    drawApplicationInnerElem('debugContent', 'debugContainer');
}

function toggleDebugOpen(){
    document.getElementById('debugContainer').classList.toggle('shown');
}