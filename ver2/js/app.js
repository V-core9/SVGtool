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
                    x += "<div class='svgSideElem pathElem'><p>" + filesJSON.svgItems[i].paths[z].name + "</p><div class='options'><button onclick='openPathOptionsModal("+ z +")'>M</button><button onclick='openPathOptionsSidebar("+ z +")' data-id='" + filesJSON.svgItems[i].name + "'>S</button></div><button onclick='deletePath()'>X</button></div></div>";
                }
            }
        }
    }
    document.querySelector("#appSidebar .content").innerHTML = x;
}

function showSvgOptionsModal(){
    
    drawApplicationInnerElem('appModal', 'appContainer');

    document.getElementById('appModal').innerHTML = fileOptionsForm();
}

function showSvgOptionsSidebar(){
    
    drawApplicationInnerElem('appModal', 'appContainer' , 'modalSidebar');

    document.getElementById('appModal').innerHTML =  fileOptionsForm();

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

function fileOptionsForm(){
    var i, x = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    return `<div class='inner'>
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
            if (filesJSON.svgItems[x].paths[z].type == 'circle'){
                svgStringHelper += `<`+filesJSON.svgItems[x].paths[z].type+` cx="`+filesJSON.svgItems[x].paths[z].cx+`" cy="`+filesJSON.svgItems[x].paths[z].cy+`" r="`+filesJSON.svgItems[x].paths[z].r+`" stroke-width="`+filesJSON.svgItems[x].paths[z].strokeWidth+`" stroke="`+filesJSON.svgItems[x].paths[z].strokeCol+`"  fill="`+filesJSON.svgItems[x].paths[z].fill+`" />`;
            } 
            

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

    document.getElementById('appModal').innerHTML = addSvgElementForm();
}

function addSvgElementForm(){
    return `<div class='inner'>
                <div class="title">
                    <p>New Svg elem</p>
                    <button onclick="closeModal()" class="fukNoColor">X</button>
                </div>
                <div class="content">
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
    addNewSvgElem("", 'circle')
}

function addRectElem(){
    addNewSvgElem("", 'rect')
}

function addPolygonElem(){
    addNewSvgElem("", 'polygon')
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

    if (type == 'circle'){
        filesJSON.svgItems[x].paths.push({'name': name,'type': type, 'fill': 'red', 'cx': '20', 'cy': '20', 'r': '10','strokeCol':'blue','strokeWidth':'2'});
    } else {
        filesJSON.svgItems[x].paths.push({'name': name,'type': type,});
    }

    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);

    closeModal();
    updateSidebarConContent();
    
    drawSelectedSvg();
}


function openPathOptionsModal(v){
    

    drawApplicationInnerElem('appModal', 'appContainer');

    document.getElementById('appModal').innerHTML =    openPathOptionsForm(v);
}


function openPathOptionsSidebar(v){
    

    drawApplicationInnerElem('appModal', 'appContainer', 'modalSidebar');

    document.getElementById('appModal').innerHTML =    openPathOptionsForm(v);

    setTimeout(function(){
        document.getElementById('appModal').style.right = '0';
    }, 25); 
}

function openPathOptionsForm(v) {
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }
    
    if (filesJSON.svgItems[x].paths[v].type == 'circle'){
        return editCircleElementForm(v);
    };

    if (filesJSON.svgItems[x].paths[v].type == 'rect') {
        return editCircleElementForm(v);
    }

    if (filesJSON.svgItems[x].paths[v].type ==  'polygon') {
        return editCircleElementForm(v);
    }

    
}

function editCircleElementForm(v){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    return `<div class='inner'>
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
                        <p>cx</p>
                        <div class='options'>
                            <input type='number' id='circleCX' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].paths[v].cx+`'   onchange='updateCirclePathOptionsData(`+v+`)'>
                            <input type='range' id='circleCXlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].paths[v].cx+`'   oninput='document.getElementById("circleCX").value = this.value; updateCirclePathOptionsData(`+v+`); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>cy</p>
                        <div class='options'>
                            <input type='number' id='circleCY' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].paths[v].cy+`'   onchange='updateCirclePathOptionsData()'>
                            <input type='range' id='circleCYSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].paths[v].cy+`'   oninput='document.getElementById("circleCY").value = this.value; updateCirclePathOptionsData(`+v+`); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>r</p>
                        <div class='options'>
                            <input type='number' id='circleR' min='1' max='800' step='1' value='`+filesJSON.svgItems[x].paths[v].r+`'   onchange='updateCirclePathOptionsData(`+v+`)'>
                            <input type='range' id='circleRSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[x].paths[v].r+`'   oninput='document.getElementById("circleR").value = this.value; updateCirclePathOptionsData(`+v+`); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>Fill</p>
                        <input type="color" id="circleFillCol" value="`+filesJSON.svgItems[x].paths[v].fill+`" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                    </div>
                    <div class="singleOption">
                        <p>Stroke</p>
                        <input type="color" id="circleStrokeCol" value="`+filesJSON.svgItems[x].paths[v].strokeCol+`" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                    </div>
                    <div class="singleOption">
                        <p>Stroke width</p>
                        <input type="range" min="0.1" max="5" value="`+filesJSON.svgItems[x].paths[v].strokeWidth+`" step="0.1" id="circleStrokeWidthCol" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                    </div>
                </div>
                <div class="options">
                    <button onclick="closeModal()" class="badColor">Cancel</button>
                </div>
            </div>`;
}

function updateCirclePathOptionsData(v){
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    filesJSON.svgItems[x].paths[v].name = document.getElementById('newSvgElemName').value;
    filesJSON.svgItems[x].paths[v].cx = document.getElementById('circleCX').value;
    filesJSON.svgItems[x].paths[v].cy = document.getElementById('circleCY').value;
    filesJSON.svgItems[x].paths[v].r = document.getElementById('circleR').value;
    filesJSON.svgItems[x].paths[v].strokeWidth = document.getElementById('circleStrokeWidthCol').value;
    filesJSON.svgItems[x].paths[v].strokeCol = document.getElementById('circleStrokeCol').value;
    filesJSON.svgItems[x].paths[v].fill = document.getElementById('circleFillCol').value;

    
    updateSidebarContentTabs();
    updateSidebarConContent(filesJSON.svgItems[x].name);
    drawSelectedSvg();
    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
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