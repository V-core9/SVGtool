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
    //drawApplicationInnerElem('appSvgArea', 'appContent');
    document.getElementById('appContent').innerHTML = `<div id='appSvgArea' onmousewheel="appSvgAreaScrollFunc(event)"><div class='innHidd' style='position: absolute; z-index: -1; opacity: 0; display: block; height: 101%;'></div></div>`;
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
    document.getElementById('appFooter').innerHTML =    `<div class="footerOptions">
                                                            <button onclick="toggleFullScreen()">Full Screen</button>
                                                            <div class="singleFooterOption">
                                                                <p>Zoom</p>
                                                                <input type='nubmer' id='zoomLevel' min='0.01' max='5' step='0.01' value='1' oninput='changeZoomLevel()'  onchange='changeZoomLevel()'>
                                                                <input type='range' min='0.01' max='5' step='0.01' value='1' id='zoomLevelRange'  oninput='document.getElementById("zoomLevel").value = this.value; changeZoomLevel()'  oninput='changeZoomLevel()'>
                                                            </div>
                                                        </div>
                                                        <div class="devCredits">
                                                            <p>Created by <a href="#">MikiTheGreat</a></p>
                                                        </div>`;
}


// Helper that actually draws elements
// newId => type(string)....id of new div
// parentId => type(string)...id of parent elem
function drawApplicationInnerElem(newId, parentId, classNew = null){

    if (document.getElementById(newId) != null){
        document.getElementById(newId).remove();
    };

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
        filesJSON.svgItems.push( {"name" : newFileName , 'zoomLevel':'1' , "top" : 40, "left" : 40, "width" : 400, "height" : 400, 'backColorAlpha' : '0', 'backColor' : '#000000', "paths" : []});
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
            
            svgAppConfig.selected = i;
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
                    x += "<div class='svgSideElem pathElem' data-name='"+ filesJSON.svgItems[i].paths[z].name +"' onmouseenter='startSingleElemSidebarHover(this)' onmouseleave='endSingleElemSidebarHover(this)'><div class='elem-data'><p class='pathName'>" + filesJSON.svgItems[i].paths[z].name + "</p><p class='pathType'>" + filesJSON.svgItems[i].paths[z].type + "</p></div><div class='options'><button onclick='openPathOptionsModal("+ z +")'>M</button><button onclick='openPathOptionsSidebar("+ z +")'>S</button><button onclick='movePathLayerBottom("+ z +")' title='Move Path Layer Towards Front'>F</button><button onclick='movePathLayerTop("+ z +")' title='Move Path Layer Towards Background'>B</button></div><button onclick='deletePath("+ z +")'>X</button></div></div>";
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

    if ((document.getElementById('currentFileName').value == "") || (document.getElementById('currentFileHeight').value == "") || (document.getElementById('currentFileWidth').value == "") ){
        closeModal();
    } else { 
        
        filesJSON.svgItems[svgAppConfig.selected].name = document.getElementById('currentFileName').value;
        filesJSON.svgItems[svgAppConfig.selected].top = document.getElementById('currentFileTop').value;
        filesJSON.svgItems[svgAppConfig.selected].left = document.getElementById('currentFileLeft').value;
        filesJSON.svgItems[svgAppConfig.selected].height = document.getElementById('currentFileHeight').value;
        filesJSON.svgItems[svgAppConfig.selected].width = document.getElementById('currentFileWidth').value;
        filesJSON.svgItems[svgAppConfig.selected].backColor = document.getElementById('currentFileBackColor').value;
        filesJSON.svgItems[svgAppConfig.selected].backColorAlpha = document.getElementById('currentFileBackColorAlpha').value;
        
        //closeModal();

        updateSidebarContentTabs();
        updateSidebarConContent(filesJSON.svgItems[svgAppConfig.selected].name);
        drawSelectedSvg();
        
        document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
    }
}


function saveSvgOptionsModalData (){
    if ((document.getElementById('currentFileName').value == "") || (document.getElementById('currentFileHeight').value == "") || (document.getElementById('currentFileWidth').value == "") ){
        closeModal();
    } else { 
        
        filesJSON.svgItems[svgAppConfig.selected].name = document.getElementById('currentFileName').value;
        filesJSON.svgItems[svgAppConfig.selected].height = document.getElementById('currentFileHeight').value;
        filesJSON.svgItems[svgAppConfig.selected].width = document.getElementById('currentFileWidth').value;
        filesJSON.svgItems[svgAppConfig.selected].backColor = document.getElementById('currentFileBackColor').value;
        
        closeModal();

        updateSidebarContentTabs();
        updateSidebarConContent(filesJSON.svgItems[svgAppConfig.selected].name);
        drawSelectedSvg();
    }

    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
}

function fileOptionsForm(){
    
    return `<div class='inner'>
                <div class="title">
                    <p>Svg Options</p>
                    <button onclick="closeModal()" class="fukNoColor">>></button>
                </div>
                <div class="content">
                    <div class="singleOption">
                        <p>Name</p>
                        <input type='text' id='currentFileName' value='`+filesJSON.svgItems[svgAppConfig.selected].name+`'   onchange='updateSvgOptionsSidebarData()'  oninput='updateSvgOptionsSidebarData()'>
                    </div>
                    <div class="singleOption">
                        <p>Top</p>
                        <div class='options'>
                            <input type='number' id='currentFileTop' min='1' max='800' step='1' value='`+filesJSON.svgItems[svgAppConfig.selected].top+`'   onchange='updateSvgOptionsSidebarData()'>
                            <input type='range' id='currentFileTopSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[svgAppConfig.selected].top+`'   oninput='document.getElementById("currentFileTop").value = this.value; updateSvgOptionsSidebarData(); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>Left</p>
                        <div class='options'>
                            <input type='number' id='currentFileLeft' min='1' max='800' step='1' value='`+filesJSON.svgItems[svgAppConfig.selected].left+`'   onchange='updateSvgOptionsSidebarData()'>
                            <input type='range' id='currentFileLeftSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[svgAppConfig.selected].left+`'   oninput='document.getElementById("currentFileLeft").value = this.value; updateSvgOptionsSidebarData(); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>Height</p>
                        <div class='options'>
                            <input type='number' id='currentFileHeight' min='1' max='800' step='1' value='`+filesJSON.svgItems[svgAppConfig.selected].height+`'   onchange='updateSvgOptionsSidebarData()'>
                            <input type='range' id='currentFileHeightSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[svgAppConfig.selected].height+`'   oninput='document.getElementById("currentFileHeight").value = this.value; updateSvgOptionsSidebarData(); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>Width</p>
                        <div class='options'>
                            <input type='number' id='currentFileWidth' value='`+filesJSON.svgItems[svgAppConfig.selected].width+`'   onchange='updateSvgOptionsSidebarData()'>
                            <input type='range' id='currentFileWidthSlider' min='1' max='800' step='1'  value='`+filesJSON.svgItems[svgAppConfig.selected].width+`'   oninput='document.getElementById("currentFileWidth").value = this.value; updateSvgOptionsSidebarData(); '>
                        </div>
                    </div>
                    <div class="singleOption">
                        <p>BackgroundColor</p>
                        <div class='options'>
                            <input type='color' id='currentFileBackColor' value='`+filesJSON.svgItems[svgAppConfig.selected].backColor+`'  onchange='updateSvgOptionsSidebarData()'  oninput='updateSvgOptionsSidebarData()' colorformat="rrggbbaa">
                            <input type='number' id='currentFileBackColorAlpha' value='`+filesJSON.svgItems[svgAppConfig.selected].backColorAlpha+`'   onchange='updateSvgOptionsSidebarData()'>
                            <input type='range' id='currentFileBackColorAlphaSlider' min='0' max='1' step='0.01'  value='`+filesJSON.svgItems[svgAppConfig.selected].backColorAlpha+`'   oninput='document.getElementById("currentFileBackColorAlpha").value = this.value; updateSvgOptionsSidebarData(); '>
                            <button id='currentFileBackColorClear' onclick='document.getElementById("currentFileBackColorAlphaSlider").value = document.getElementById("currentFileBackColorAlpha").value = "0";  updateSvgOptionsSidebarData()'>Clear</button>
                        </div>
                    </div>  
                </div>
                <div class="options">
                    <button onclick="closeModal()" class="badColor">Close</button>
                </div>
            </div>`;
}





function drawSelectedSvg(){
    var  svgStringHelper = "";
    if (filesJSON.svgItems[svgAppConfig.selected].paths != []){
        var z = ""
        filesJSON.svgItems[svgAppConfig.selected].paths.sort((path1, path2) => {
            return compareOrderNumber(path1, path2, 'orderNum')
          })
        for (z in filesJSON.svgItems[svgAppConfig.selected].paths){
            if (filesJSON.svgItems[svgAppConfig.selected].paths[z].type == 'circle'){
                svgStringHelper += `<`+filesJSON.svgItems[svgAppConfig.selected].paths[z].type+` id="`+filesJSON.svgItems[svgAppConfig.selected].paths[z].name+`-insidepath" cx="`+filesJSON.svgItems[svgAppConfig.selected].paths[z].cx+`" cy="`+filesJSON.svgItems[svgAppConfig.selected].paths[z].cy+`" r="`+filesJSON.svgItems[svgAppConfig.selected].paths[z].r+`" stroke-width="`+filesJSON.svgItems[svgAppConfig.selected].paths[z].strokeWidth+`"  stroke="rgba(`+parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].strokeCol.substring(1, 3), 16)+`,`+parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].strokeCol.substring(3, 5), 16)+`,` + parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].strokeCol.substring(5, 7), 16) + `, ` + filesJSON.svgItems[svgAppConfig.selected].paths[z].strokeColAlpha + `)"  fill="rgba(`+parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].fill.substring(1, 3), 16)+`,`+parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].fill.substring(3, 5), 16)+`,`+parseInt(filesJSON.svgItems[svgAppConfig.selected].paths[z].fill.substring(5, 7), 16)+`, `+filesJSON.svgItems[svgAppConfig.selected ].paths[z].fillAlpha+`)" />`;
            } 
            

        }
    }
    
    document.getElementById('appSvgArea').innerHTML =   `<svg id="file-`+filesJSON.svgItems[svgAppConfig.selected].name+`" width="`+filesJSON.svgItems[svgAppConfig.selected].width+`" height="`+filesJSON.svgItems[svgAppConfig.selected].height+`">
                                                            `+svgStringHelper+`
                                                        </svg>`;
    
    if (filesJSON.svgItems[svgAppConfig.selected].fixed != ""){
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.position = 'relative';
    } else {
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.position = 'absolute';
    }
    if (filesJSON.svgItems[svgAppConfig.selected].top != ""){
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.top = filesJSON.svgItems[svgAppConfig.selected].top+'px';
    }
    if (filesJSON.svgItems[svgAppConfig.selected].left != ""){
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.left = filesJSON.svgItems[svgAppConfig.selected].left+'px';
    }
    if (filesJSON.svgItems[svgAppConfig.selected].backColor != ""){
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.backgroundColor =  'rgba('+parseInt(filesJSON.svgItems[svgAppConfig.selected].backColor.substring(1, 3), 16)+','+parseInt(filesJSON.svgItems[svgAppConfig.selected].backColor.substring(3, 5), 16)+','+parseInt(filesJSON.svgItems[svgAppConfig.selected].backColor.substring(5, 7), 16)+','+filesJSON.svgItems[svgAppConfig.selected].backColorAlpha+')';
    }
    if (filesJSON.svgItems[svgAppConfig.selected].zoomLevel != ""){
        document.getElementById('file-'+filesJSON.svgItems[svgAppConfig.selected].name).style.transform =  'scale('+filesJSON.svgItems[svgAppConfig.selected].zoomLevel+')';
        document.getElementById('zoomLevelRange').value = filesJSON.svgItems[svgAppConfig.selected].zoomLevel;
        document.getElementById('zoomLevel').value = filesJSON.svgItems[svgAppConfig.selected].zoomLevel;
    } else {
        document.getElementById('zoomLevelRange').value = '1';
        document.getElementById('zoomLevel').value = '1';
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
        filesJSON.svgItems[x].paths.push({'orderNum': filesJSON.svgItems[x].paths.length, 'name': name,'type': type, 'fill': '#333333', 'fillAlpha': '1', 'cx': '20', 'cy': '20', 'r': '10','strokeCol':'#000000','strokeColAlpha':'1','strokeWidth':'2'});
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
                    <div class="singleOption extensiveOption">
                        <h4>Fill</h4>
                        <div class="singleOption">
                            <p>Color</p>
                            <div class='options'>
                                <input type="color" id="circleFillCol" value="`+filesJSON.svgItems[x].paths[v].fill+`" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                            </div>
                        </div>
                        <div class="singleOption">
                            <p>Color Opacity</p>
                            <div class='options'>
                                <input type='number' id='circleFillColAlpha' value='`+filesJSON.svgItems[x].paths[v].fillAlpha+`'   onchange='updateCirclePathOptionsData(`+v+`);'>
                                <input type='range' id='circleFillColAlphaSlider' min='0' max='1' step='0.01'  value='`+filesJSON.svgItems[x].paths[v].fillAlpha+`'   oninput='document.getElementById("circleFillColAlpha").value = this.value; updateCirclePathOptionsData(`+v+`); '>
                            </div>
                        </div>>
                        <div class="singleOption">
                            <p>Clear Color</p>
                            <div class='options'>
                            <button id='circleFillColClear' onclick='document.getElementById("circleFillColAlphaSlider").value = document.getElementById("circleFillColAlpha").value = "0";  updateCirclePathOptionsData(`+v+`)'>Clear</button>
                            </div>
                        </div>
                    </div>
                    <div class="singleOption extensiveOption">
                        <h4>Stroke</h4>
                        <div class="singleOption">
                            <p>Color</p>
                            <div class='options'>
                                <input type="color" id="circleStrokeCol" value="`+filesJSON.svgItems[x].paths[v].strokeCol+`" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                            </div>
                        </div>
                        <div class="singleOption">
                            <p>Color Opacity</p>
                            <div class='options'>
                                <input type='number' id='circleStrokeColAlpha' value='`+filesJSON.svgItems[x].paths[v].strokeColAlpha+`'   onchange='updateCirclePathOptionsData(`+v+`);'>
                                <input type='range' id='circleStrokeColAlphaSlider' min='0' max='1' step='0.01'  value='`+filesJSON.svgItems[x].paths[v].strokeColAlpha+`'   oninput='document.getElementById("circleStrokeColAlpha").value = this.value; updateCirclePathOptionsData(`+v+`); '>
                            </div>
                        </div>
                        <div class="singleOption">
                            <p>Stroke width</p>
                            <input type="range" min="0.1" value="`+filesJSON.svgItems[x].paths[v].strokeWidth+`" step="0.1" id="circleStrokeWidthCol" oninput='updateCirclePathOptionsData(`+v+`);' onchange='updateCirclePathOptionsData(`+v+`)'>
                        </div>
                        <div class="singleOption">
                            <p>Clear Color</p>
                            <div class='options'>
                                <button id='circleStrokeColClear' onclick='document.getElementById("circleStrokeColAlphaSlider").value = document.getElementById("circleStrokeColAlpha").value = "0";  updateCirclePathOptionsData(`+v+`)'>Clear</button>
                            </div>
                        </div>
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
    filesJSON.svgItems[x].paths[v].strokeColAlpha = document.getElementById('circleStrokeColAlpha').value;
    filesJSON.svgItems[x].paths[v].fill = document.getElementById('circleFillCol').value;
    filesJSON.svgItems[x].paths[v].fillAlpha = document.getElementById('circleFillColAlpha').value;

    
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



function startSingleElemSidebarHover(elem){
    //alert(elem.getAttribute('data-name'));
    document.querySelector('#'+elem.getAttribute('data-name')+'-insidepath').style.outline = '2px solid #03A9F4';
    document.querySelector('#'+elem.getAttribute('data-name')+'-insidepath').style.boxShadow = '0 2px 5px #000000';
}

function endSingleElemSidebarHover(elem){
    //alert(elem.getAttribute('data-name'));
    document.querySelector('#'+elem.getAttribute('data-name')+'-insidepath').style.outline = '0 solid #03A9F4';
    document.querySelector('#'+elem.getAttribute('data-name')+'-insidepath').style.boxShadow = '0 0 0 #000000';
}   



function deletePath(v){

    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }

    //console.log(filesJSON.svgItems[x].paths) 

    filesJSON.svgItems[x].paths.indexOf(filesJSON.svgItems[x].paths[v]) > -1 ? filesJSON.svgItems[x].paths.splice(filesJSON.svgItems[x].paths.indexOf(filesJSON.svgItems[x].paths[v]), 1) : false

    //console.log(filesJSON.svgItems[x].paths) 

    updateSidebarContentTabs();
    updateSidebarConContent(filesJSON.svgItems[x].name);
    drawSelectedSvg();
    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);

}


function compareOrderNumber( a, b ) {
    if ( a.orderNum < b.orderNum ){
      return -1;
    }
    if ( a.orderNum > b.orderNum ){
      return 1;
    }
    return 0;
  }


  function movePathLayerBottom(v){
      
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }
    filesJSON.svgItems[x].paths[v].orderNum = filesJSON.svgItems[x].paths[v+1].orderNum + 1;

    updateSidebarContentTabs();
    updateSidebarConContent(filesJSON.svgItems[x].name);
    drawSelectedSvg();
    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
  }


  function movePathLayerTop(v){
      
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }
    filesJSON.svgItems[x].paths[v].orderNum = filesJSON.svgItems[x].paths[v-1].orderNum - 1;

    updateSidebarContentTabs();
    updateSidebarConContent(filesJSON.svgItems[x].name);
    drawSelectedSvg();
    
    document.getElementById('debugContentJSON').innerHTML = JSON.stringify(filesJSON, null, 2);
  }


function changeZoomLevel(){
    document.getElementById('appSvgArea').querySelector('svg').style.transform = 'scale('+ document.getElementById('zoomLevel').value +')';

     
    var i, x, svgStringHelper = "";
    for (i in filesJSON.svgItems) {
        if (filesJSON.svgItems[i].selected == true){
            x = i;
        }
    }


    filesJSON.svgItems[x].zoomLevel = document.getElementById('zoomLevel').value;
}



function appSvgAreaScrollFunc(e) {
    wDelta = e.wheelDelta < 0 ? 'down' : 'up';
    console.log(wDelta + " : " + e.wheelDelta);

    if (wDelta == 'down'){
        document.getElementById('zoomLevelRange').value = (parseFloat(document.getElementById('zoomLevelRange').value) - 0.05);
        document.getElementById('zoomLevel').value = (parseFloat(document.getElementById('zoomLevelRange').value) - 0.05);
        changeZoomLevel()
    } else {
        document.getElementById('zoomLevelRange').value = (parseFloat(document.getElementById('zoomLevelRange').value) + 0.05);
        document.getElementById('zoomLevel').value = (parseFloat(document.getElementById('zoomLevelRange').value) + 0.05);  
        changeZoomLevel()
    }
}