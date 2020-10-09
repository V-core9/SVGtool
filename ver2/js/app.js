var filesJSON = { svgItems : []};  

function initApplication() {
    if (svgAppConfig.debug == true) {
        drawDebugConsole();
    };

    drawApplication();
}

function drawApplication(){
    insertStyle('debug-style','css/app.css')
    insertScript('helpers-script', 'js/helpers.js');

    var appContainer = document.createElement("DIV");        
    appContainer.setAttribute('id','appContainer');

    document.body.insertBefore(appContainer , document.body.firstChild);

    drawAppNavigation();
    drawAppContent();
    drawAppFooter();

    
}

function drawAppNavigation(){
    drawApplicationInnerElem('appNavigation', 'appContainer');
    
    document.getElementById('appNavigation').innerHTML =    `<div class="logoSection">
                                                                <p>YEApp</p>
                                                            </div>
                                                            <div class="navOptions">
                                                                <div class="dropDownMenu">
                                                                    <button onclick="toggleMenu(this)">File</button>
                                                                    <div class="subMenu">
                                                                        <button onclick="createNewFile()">Create New[e]</button>
                                                                        <button onclick="closeFile()">Close File[e]</button
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                
                                                                <div class="dropDownMenu">
                                                                    <button onclick="toggleMenu(this)">Edit</button>
                                                                    <div class="subMenu">
                                                                        <button onclick="newFile()">Create New[e]</button>
                                                                        <button onclick="closeFile()">Close File[e]</button
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                
                                                                <div class="dropDownMenu">
                                                                    <button onclick="toggleMenu(this)">Options</button>
                                                                    <div class="subMenu">
                                                                        <button onclick="newFile()">Create New[e]</button>
                                                                        <button onclick="closeFile()">Close File[e]</button
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                
                                                                <div class="dropDownMenu">
                                                                    <button onclick="toggleMenu(this)">View</button>
                                                                    <div class="subMenu">
                                                                        <button onclick="newFile()">Create New[e]</button>
                                                                        <button onclick="closeFile()">Close File[e]</button
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>`;
}

function drawAppContent(){
    drawApplicationInnerElem('appContent', 'appContainer');
    drawAppSvgArea();
    drawAppSidebar();
}

function drawAppSvgArea(){
    drawApplicationInnerElem('appSvgArea', 'appContent');
}

function drawAppSidebar(){
    drawApplicationInnerElem('appSidebar', 'appContent');

    document.getElementById('appSidebar').innerHTML =   `<div class="header">
                                                            <p>Sidebar Options</p>
                                                            <button>X</button>
                                                        </div>
                                                        <div class="content">
                                                        </div>
                                                        <div class="tabs">
                                                        </div>`
}

function drawAppFooter(){
    drawApplicationInnerElem('appFooter', 'appContainer');
    document.getElementById('appFooter').innerHTML = `<div class="devCredits">
                                                <p>Created by <a href="#">MikiTheGreat</a></p>
                                            </div>
                                            <div class="footerOptions">
                                                <button onclick="toggleFullScreen()">Full Screen</button>
                                            </div>`;
}


// Helper that actually draws elements
// newId => type(string)....id of new div
// parentId => type(string)...id of parent elem
function drawApplicationInnerElem(newId, parentId){
    var appSidebar = document.createElement("DIV");        
    appSidebar.setAttribute('id', newId);

    document.getElementById(parentId).appendChild(appSidebar);

}
//!! 

// Add Style to DOM
function insertStyle(nameStyle, styleURL){
    var styleElem = document.createElement("link");   
    styleElem.type = 'text/css'; 
    styleElem.setAttribute("id", nameStyle);
    styleElem.rel = 'stylesheet';
    styleElem.href = styleURL;
    document.documentElement.appendChild(styleElem);    
}
//

function insertScript(nameScript, scriptUrl, callBCK = null){
    var script = document.createElement('script');
    script.setAttribute('id',nameScript);
    if (callBCK != null){
        script.onload = function () {
            //do stuff with the script
            eval(callBCK+'()');
        };
    }
    script.src = scriptUrl;

    document.head.appendChild(script);
}

// Debug draw function 
// Will load JS for debug and init
function drawDebugConsole(){
    insertScript('debug-script', 'js/debug.js', 'startDebugger');

    insertStyle('debug-style','css/debug.css')
}


function createNewFile(){
    drawApplicationInnerElem('appModal', 'appContainer');

    document.getElementById('appModal').innerHTML =    `<div class='inner'>
                                                            <div class="title">
                                                                <p>Create New File Form</p>
                                                                <button onclick="closeModal()" class="fukNoColor">X</button>
                                                            </div>
                                                            <div class="content">
                                                                <div class="singleOption">
                                                                    <p>Name</p>
                                                                    <input type='text' id='newFileName'>
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="createNewFileNow()" class="goodColor">Start</button>
                                                                <button onclick="closeModal()" class="badColor">Cancel</button>
                                                            </div>
                                                        </div>`;

}

function createNewFileNow(){
    
    if (document.getElementById('newFileName').value == ""){
        closeModal();
    } else {
        var i, fileStatus = "";
        for (i in filesJSON.svgItems) {
            if (filesJSON.svgItems[i].name == document.getElementById('newFileName').value){
                fileStatus = true;
            } else {
                fileStatus = false;
            }
        }
        
        if (fileStatus !== true){
            filesJSON.svgItems.push( {"name" : document.getElementById('newFileName').value , "width" : 400, "height" : 400, "paths" : []});
            changeSelected(document.getElementById('newFileName').value);
            closeModal();
        } else {
            alert('File Already Exists');
        }
        
    }
    updateSidebarContentTabs();
}


function updateSidebarContentTabs(){
    var i, x = "";
    for (i in filesJSON.svgItems) {
        var helperVal = "";
        if (filesJSON.svgItems[i].selected == true){
            helperVal = 'active';
        };
        x += "<button class='singleTabName "+helperVal+"' onclick='changeSelected(this.innerHTML)'>" + filesJSON.svgItems[i].name + "</button>";
    }
    document.querySelector("#appSidebar .tabs").innerHTML = x;
}

function changeSelected(name){
    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].name == name){
            filesJSON.svgItems[i].selected = true;
        } else {
            filesJSON.svgItems[i].selected = false;
        }
    }

    updateSidebarConContent();
    
    drawSelectedSvg();

    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
}

function updateSidebarConContent(){
    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x += "<div class='svgSideElem'><p>" + filesJSON.svgItems[i].name + "</p><div class='options'><button onclick='addSvgElementModal()'>Add</button><button onclick='showSvgOptionsModal()' data-id='" + filesJSON.svgItems[i].name + "'>O</button></div></div>";
            if (filesJSON.svgItems[i].paths.length > 0){
                var z = "";
                for (z in filesJSON.svgItems[i].paths){
                    x += "<div class='svgSideElem pathElem'><p>" + filesJSON.svgItems[i].paths[z].name + "</p><div class='options'><button onclick='openPathOptions("+ z +")'>O</button><button onclick='deletePath()'>X</button></div></div>";
                }
            }
        }
    }
    document.querySelector("#appSidebar .content").innerHTML = x;
}

function showSvgOptionsModal(){
    
    drawApplicationInnerElem('appModal', 'appContainer');

    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    document.getElementById('appModal').innerHTML =    `<div class='inner'>
                                                            <div class="title">
                                                                <p>Svg Options</p>
                                                                <button onclick="closeModal()" class="fukNoColor">X</button>
                                                            </div>
                                                            <div class="content">
                                                                <div class="singleOption">
                                                                    <p>Name</p>
                                                                    <input type='text' id='currentFileName' value='`+filesJSON.svgItems[x].name+`'>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Height</p>
                                                                    <input type='number' id='currentFileHeight' value='`+filesJSON.svgItems[x].height+`'>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Width</p>
                                                                    <input type='number' id='currentFileWidth' value='`+filesJSON.svgItems[x].width+`'>
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="saveSvgOptionsModalData(`+x+`)" class="goodColor">Save</button>
                                                                <button onclick="closeModal()" class="badColor">Cancel</button>
                                                            </div>
                                                        </div>`;
}


function saveSvgOptionsModalData (x){
    if ((document.getElementById('currentFileName').value == "") || (document.getElementById('currentFileHeight').value == "") || (document.getElementById('currentFileWidth').value == "") ){
        closeModal();
    } else { 
        
        filesJSON.svgItems[x].name = document.getElementById('currentFileName').value;
        filesJSON.svgItems[x].height = document.getElementById('currentFileHeight').value;
        filesJSON.svgItems[x].width = document.getElementById('currentFileWidth').value;
        
        closeModal();

        updateSidebarContentTabs();
        updateSidebarConContent(filesJSON.svgItems[x].name);
        drawSelectedSvg();
    }
}

function drawSelectedSvg(){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }
    if (filesJSON.svgItems[x].paths != []){
        var z = ""
        for (z in filesJSON.svgItems[x].paths){
            svgStringHelper += `<`+filesJSON.svgItems[x].paths[z].type+` x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:`+filesJSON.svgItems[x].paths[z].newSvgFillCol+`;stroke:`+filesJSON.svgItems[x].paths[z].newSvgStrokeCol+`;stroke-width:`+filesJSON.svgItems[x].paths[z].newSvgStrokeWidthCol+`;opacity:0.5" />`;

        }
    }
    
    document.getElementById('appSvgArea').innerHTML =   `<svg width="`+filesJSON.svgItems[x].width+`" height="`+filesJSON.svgItems[x].height+`">
                                                            `+svgStringHelper+`
                                                        </svg>`;
}


function addSvgElementModal(){
    drawApplicationInnerElem('appModal', 'appContainer');

    document.getElementById('appModal').innerHTML =    `<div class='inner'>
                                                            <div class="title">
                                                                <p>New Svg elem</p>
                                                                <button onclick="closeModal()" class="fukNoColor">X</button>
                                                            </div>
                                                            <div class="content">
                                                                <div class="singleOption">
                                                                    <p>Name</p>
                                                                    <input type="text" id="newSvgElemName" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Type</p>
                                                                    <select id='newSvgElemType'>
                                                                        <option value='circle'>Circle</option>
                                                                        <option value='rect'>Rectangle</option>
                                                                        <option value='polygon'>Polygon</option>
                                                                    </select>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Fill</p>
                                                                    <input type="color" id="newSvgFillCol" value="#444444">
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Stroke</p>
                                                                    <input type="color" id="newSvgStrokeCol" value="#ff2222">
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Stroke width</p>
                                                                    <input type="range" min="0.1" max="5" value="1.5" step="0.1" id="newSvgStrokeWidthCol">
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="addNewSvgElem()" class="goodColor">Start</button>
                                                                <button onclick="closeModal()" class="badColor">Cancel</button>
                                                            </div>
                                                        </div>`;
}


function addNewSvgElem(){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }


    filesJSON.svgItems[x].paths.push({'name': document.getElementById('newSvgElemName').value,'type': document.getElementById('newSvgElemType').value,'newSvgFillCol': document.getElementById('newSvgFillCol').value,'newSvgStrokeCol': document.getElementById('newSvgStrokeCol').value,'newSvgStrokeWidthCol': document.getElementById('newSvgStrokeWidthCol').value,});

    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);

    closeModal();
    updateSidebarConContent();
    
    drawSelectedSvg();
}


function openPathOptions(v){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    drawApplicationInnerElem('appModal', 'appContainer');

    document.getElementById('appModal').innerHTML =    `<div class='inner'>
                                                            <div class="title">
                                                                <p>Svg elem options</p>
                                                                <button onclick="closeModal()" class="fukNoColor">X</button>
                                                            </div>
                                                            <div class="content">
                                                                <div class="singleOption">
                                                                    <p>Name</p>
                                                                    <input type="text" id="newSvgElemName" value="`+filesJSON.svgItems[x].paths[v].name+`">
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Type</p>
                                                                    <select id='newSvgElemType'>
                                                                        <option value='circle'>Circle</option>
                                                                        <option value='rect'>Rectangle</option>
                                                                        <option value='polygon'>Polygon</option>
                                                                    </select>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>X</p>
                                                                    <input id="newSvgX" input type="range" min="1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Y</p>
                                                                    <input  id="newSvgY" input type="range" min="0.1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>RX</p>
                                                                    <input  id="newSvgRX" input type="range" min="0.1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>RY</p>
                                                                    <input id="newSvgRY" input type="range" min="0.1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Widht</p>
                                                                    <input id="newSvgWidht" input type="range" min="0.1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Height</p>
                                                                    <input id="newSvgHeight" input type="range" min="0.1" max="5" value="1.5" step="0.1" >
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Fill</p>
                                                                    <input type="color" id="newSvgFillCol" value="#444444">
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Stroke</p>
                                                                    <input type="color" id="newSvgStrokeCol" value="#ff2222">
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Stroke width</p>
                                                                    <input type="range" min="0.1" max="5" value="1.5" step="0.1" id="newSvgStrokeWidthCol">
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="addNewSvgElem()" class="goodColor">Start</button>
                                                                <button onclick="closeModal()" class="badColor">Cancel</button>
                                                            </div>
                                                        </div>`;
}