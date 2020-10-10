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
function drawApplicationInnerElem(newId, parentId, classNew = null){
    var appElem = document.createElement("DIV");        
    appElem.setAttribute('id', newId);  
    if (classNew != null){
        appElem.setAttribute('class', classNew);
    }

    document.getElementById(parentId).appendChild(appElem);

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
    
    var newFileName = document.getElementById('newFileName').value;

    if (newFileName == ""){
        newFileName = generateRandomNameFile();
    } 

    var i, fileStatus = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].name == newFileName){
            fileStatus = true;
        } else {
            fileStatus = false;
        }
    }
    
    if (fileStatus !== true){
        filesJSON.svgItems.push( {"name" : newFileName , "top" : 40, "left" : 40, "width" : 400, "height" : 400, "paths" : []});
        changeSelected(newFileName);
        closeModal();
    } else {
        alert('File Already Exists');
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
            x += "<div class='svgSideElem'><p>" + filesJSON.svgItems[i].name + "</p><div class='options'><button onclick='addSvgElementModal()'>Add</button><button onclick='showSvgOptionsModal()' data-id='" + filesJSON.svgItems[i].name + "'>M</button><button onclick='showSvgOptionsSidebar()' data-id='" + filesJSON.svgItems[i].name + "'>S</button></div></div>";
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

function showSvgOptionsSidebar(){
    
    drawApplicationInnerElem('appModal', 'appContainer' , 'modalSidebar');

    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    document.getElementById('appModal').innerHTML =    `<div class='inner'>
                                                            <div class="title">
                                                                <p>Svg Options</p>
                                                                <button onclick="closeModal()" class="fukNoColor">>></button>
                                                            </div>
                                                            <div class="content">
                                                                <div class="singleOption">
                                                                    <p>Name</p>
                                                                    <input type='text' id='currentFileName' value='`+filesJSON.svgItems[x].name+`'   onchange='updateSvgOptionsSidebarData()'>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Top</p>
                                                                    <div class='options'>
                                                                        <input type='number' id='currentFileTop' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].top+`'   onchange='updateSvgOptionsSidebarData()'>
                                                                        <input type='range' id='currentFileTopSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].top+`'   oninput='document.getElementById("currentFileTop").value = this.value; updateSvgOptionsSidebarData(); '>
                                                                    </div>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Left</p>
                                                                    <div class='options'>
                                                                        <input type='number' id='currentFileLeft' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].left+`'   onchange='updateSvgOptionsSidebarData()'>
                                                                        <input type='range' id='currentFileLeftSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].left+`'   oninput='document.getElementById("currentFileLeft").value = this.value; updateSvgOptionsSidebarData(); '>
                                                                    </div>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Height</p>
                                                                    <div class='options'>
                                                                        <input type='number' id='currentFileHeight' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].height+`'   onchange='updateSvgOptionsSidebarData()'>
                                                                        <input type='range' id='currentFileHeightSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].height+`'   oninput='document.getElementById("currentFileHeight").value = this.value; updateSvgOptionsSidebarData(); '>
                                                                    </div>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>Width</p>
                                                                    <div class='options'>
                                                                        <input type='number' id='currentFileWidth' value='`+filesJSON.svgItems[x].width+`'   onchange='updateSvgOptionsSidebarData()'>
                                                                        <input type='range' id='currentFileWidthSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].width+`'   oninput='document.getElementById("currentFileWidth").value = this.value; updateSvgOptionsSidebarData(); '>
                                                                    </div>
                                                                </div>
                                                                <div class="singleOption">
                                                                    <p>BackgroundColor</p>
                                                                    <div class='options'>
                                                                        <button id='currentFileBackColorClear' onclick='document.getElementById("currentFileBackColor").value = "rgba(0,0,0,0)"'>Clear</button>
                                                                        <input type='color' id='currentFileBackColor' value='`+filesJSON.svgItems[x].backColor+`'  onchange='updateSvgOptionsSidebarData()'  oninput='updateSvgOptionsSidebarData()' colorformat="rrggbbaa">
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="closeModal()" class="badColor">Close</button>
                                                            </div>
                                                        </div>`;

    setTimeout(function(){
        document.getElementById('appModal').style.right = '0';
    }, 25); 
}

function updateSvgOptionsSidebarData(){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    if ((document.getElementById('currentFileName').value == "") || (document.getElementById('currentFileHeight').value == "") || (document.getElementById('currentFileWidth').value == "") ){
        closeModal();
    } else { 
        
        filesJSON.svgItems[x].name = document.getElementById('currentFileName').value;
        filesJSON.svgItems[x].top = document.getElementById('currentFileTop').value;
        filesJSON.svgItems[x].left = document.getElementById('currentFileLeft').value;
        filesJSON.svgItems[x].height = document.getElementById('currentFileHeight').value;
        filesJSON.svgItems[x].width = document.getElementById('currentFileWidth').value;
        filesJSON.svgItems[x].backColor = document.getElementById('currentFileBackColor').value;
        
        //closeModal();

        updateSidebarContentTabs();
        updateSidebarConContent(filesJSON.svgItems[x].name);
        drawSelectedSvg();
        
        document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
    }
}


function saveSvgOptionsModalData (x){
    if ((document.getElementById('currentFileName').value == "") || (document.getElementById('currentFileHeight').value == "") || (document.getElementById('currentFileWidth').value == "") ){
        closeModal();
    } else { 
        
        filesJSON.svgItems[x].name = document.getElementById('currentFileName').value;
        filesJSON.svgItems[x].height = document.getElementById('currentFileHeight').value;
        filesJSON.svgItems[x].width = document.getElementById('currentFileWidth').value;
        filesJSON.svgItems[x].backColor = document.getElementById('currentFileBackColor').value;
        
        closeModal();

        updateSidebarContentTabs();
        updateSidebarConContent(filesJSON.svgItems[x].name);
        drawSelectedSvg();
    }

    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
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
    
    document.getElementById('appSvgArea').innerHTML =   `<svg id="file-`+filesJSON.svgItems[x].name+`" width="`+filesJSON.svgItems[x].width+`" height="`+filesJSON.svgItems[x].height+`">
                                                            `+svgStringHelper+`
                                                        </svg>`;
    
    if (filesJSON.svgItems[x].fixed != ""){
        document.getElementById('file-'+filesJSON.svgItems[x].name).style.position = 'relative';
    } else {
        document.getElementById('file-'+filesJSON.svgItems[x].name).style.position = 'absolute';
    }
    if (filesJSON.svgItems[x].top != ""){
        document.getElementById('file-'+filesJSON.svgItems[x].name).style.top = filesJSON.svgItems[x].top+'px';
    }
    if (filesJSON.svgItems[x].left != ""){
        document.getElementById('file-'+filesJSON.svgItems[x].name).style.left = filesJSON.svgItems[x].left+'px';
    }
    if (filesJSON.svgItems[x].backColor != ""){
        document.getElementById('file-'+filesJSON.svgItems[x].name).style.backgroundColor = filesJSON.svgItems[x].backColor;
    }
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
                                                                    <div >
                                                                        <button onclick='addCircleElem()'>Circle</button>
                                                                        <button onclick='addRectElem()'>Rectangle</button>
                                                                        <button onclick='addPolygonElem()'>Polygon</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="options">
                                                                <button onclick="closeModal()" class="badColor">Cancel</button>
                                                            </div>
                                                        </div>`;
}

function addCircleElem(){
    addNewSvgElem(document.getElementById('newSvgElemName').value, 'circle')
}

function addRectElem(){
    addNewSvgElem(document.getElementById('newSvgElemName').value, 'rect')
}

function addPolygonElem(){
    addNewSvgElem(document.getElementById('newSvgElemName').value, 'polygon')
}


function addNewSvgElem(name, type){
    if (name == ""){
        name = generateRandomNameElem();
    }

    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }


    filesJSON.svgItems[x].paths.push({'name': name,'type': type,});

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

function generateRandomNameElem(){
    return ('elem-'+ generateRandomNumber());
}

function generateRandomNameFile(){
    return ('file-'+ generateRandomNumber());
}

function generateRandomNumber(){
    return Math.floor((Math.random() * 1000000000) + 1);
}