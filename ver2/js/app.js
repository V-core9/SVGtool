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
            filesJSON.svgItems.push( {"name" : document.getElementById('newFileName').value , "width" : 100, "height" : 100,});
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
        x += "<button class='singleTabName' onclick='changeSelected(this.innerHTML)'>" + filesJSON.svgItems[i].name + "</button>";
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

    updateSidebarConContent(name);

    document.getElementById('debugContent').innerHTML = JSON.stringify(filesJSON);
}

function updateSidebarConContent(name){
    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].name == name){
            x += "<div class='svgSideElem";
            if (filesJSON.svgItems[i].selected == true){
                x += " active";
            }
            x += "'><p>" + filesJSON.svgItems[i].name + "</p><button onclick='showSvgOptionsModal()' data-id='" + filesJSON.svgItems[i].name + "'>O</button></div>";
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
    }
}