var debugEnable = true;
var appContainer, appSvgArea, appSidebar, appDebugContainer, appDebugLog, currentSVG, currentSVGJSON;


// Draw Applicaiton function
////
function drawApplication(){
    if (debugEnable){
        drawAppDebugConsole();
    }

    if (debugEnable){
        logDebugMessage('Starting Application');
    }

    if (document.getElementsByTagName('app-container').length > 0){
        if (debugEnable){
            logDebugMessage('Removing application container');
        }
    }
        
    if (debugEnable){
        logDebugMessage('Drawing application container');
    }

    appContainer = document.createElement("APP-CONTAINER");        
    document.body.appendChild(appContainer);
    appContainer.setAttribute("class", "debug-element");

    drawAppSvgArea();
    drawAppSidebar();

    if (debugEnable){
        if (document.getElementsByTagName('app-container').length > 0){
            logDebugMessage('Application Drawn Succesfully');    
        } else {
            logDebugMessage('Application Drawn FAILED!');    
        }
    }

    newSvgStartPoint();
}
//!! Draw Applicaiton function !!
////!!

//
function drawAppSvgArea(){
    if (debugEnable){
        logDebugMessage('Drawing AppSVG Area');
    }

    appSvgArea = document.createElement("APP-SVG-CONTAINER");       
    appContainer.appendChild(appSvgArea);
    insertStyle('main-app-style','styles/main.css')

    if (debugEnable){
        if (document.getElementsByTagName('app-svg-container').length > 0){
            logDebugMessage('AppSVG Area Drawn Succesfully');    
        } else {
            logDebugMessage('AppSVG Area Drawn FAILED!');    
        }
    }
};
//!!

//
function drawAppSidebar(){
    if (debugEnable){
        logDebugMessage('Drawing Application Sidebar');
    }

    appSidebar = document.createElement("APP-SIDEBAR-CONTAINER");   
    appSidebar.innerHTML = `<div class="sidebar-header">
                                <h4>SVG Options</h4>
                                <button onclick="toggleSidebarVisibility()">Show/Hide</button>
                            </div>
                            <div class="sidebar-content">
                                <div id="svg-structure">
                                </div>
                            </div>
                            <div class="sidebar-footer">
                            
                            </div>`;  
    appContainer.appendChild(appSidebar);

    if (debugEnable){
        if (document.getElementsByTagName('app-sidebar-container').length > 0){
            logDebugMessage('Application Sidebar Drawn Succesfully');    
        } else {
            logDebugMessage('Application Sidebar Drawn FAILED!');    
        }
    }
}
//!!

// Draw Debug Console
function drawAppDebugConsole(){
    
    if (document.getElementsByTagName('app-debug-container').length > 0){
        if (debugEnable){
            logDebugMessage('Removing APP-DEBUG-CONTAINER container');
        }
        removeDomElement('APP-DEBUG-CONTAINER');
    }
        
    if (debugEnable){
        console.log('Message: '+'Drawing APP-DEBUG-CONTAINER'+" ; Time: "+timeStamp())
    }

    appDebugContainer = document.createElement("APP-DEBUG-CONTAINER");      
    document.body.appendChild(appDebugContainer);
    appDebugContainer.innerHTML =   `<div class='debug-header'>
                                        <div class="title-part">
                                            <h3>AppDebugConsole</h3>
                                        </div>
                                        <div class="options">
                                            <button>Options</button>
                                            <button onclick="toggleDebugVisibility()" class="debugToggleVisibility">Show Debug</button>
                                        </div>
                                    </div>
                                    <div class="debug-content">
                                    </div>`;
    appDebugContainer.setAttribute("class", "debug-element");

    insertStyle('debug-main', 'styles/debug-main.css');
    //insertStyle('app-debug-container-style', 'styles/app-debug-container.css');

    appDebugLog = document.createElement("DIV");   
    appDebugLog.setAttribute("class", "debug-log debug-element");
    appDebugLog.innerHTML = `<div class='debug-log-top'>
                                <h3>Debug Log List</h3>
                                <div class='options'>
                                    <button onclick='clearDebugLog()'>Clear Log</button>
                                    <button onclick='showDebugLogOptions()'>Options</button>
                                </div>
                            </div>`;        
    appDebugContainer.querySelector('.debug-content').appendChild(appDebugLog);

    appDebugLogList = document.createElement("DIV");   
    appDebugLogList.setAttribute("class", "debug-log-list debug-element scroller");
    appDebugLogList.innerHTML = "<div class='anchor'></div>";   
    appDebugLog.appendChild(appDebugLogList);

    currentSVGJSON = document.createElement("DIV");   
    currentSVGJSON.setAttribute("id", "currentSVGJSON");
    appDebugContainer.querySelector('.debug-content').appendChild(currentSVGJSON);

    if (debugEnable){
        if (document.getElementsByTagName('app-debug-container').length > 0){
            logDebugMessage('APP-DEBUG-CONTAINER Drawn Succesfully');    
        } else {
            logDebugMessage('APP-DEBUG-CONTAINER Drawn FAILED!');    
        }
    }
}
///!!

// Add Style to DOM
function insertStyle(nameStyle, styleURL){
    var styleElem = document.createElement("link");   
    styleElem.type = 'text/css'; 
    styleElem.setAttribute("id", nameStyle);
    styleElem.rel = 'stylesheet';
    styleElem.href = styleURL;
    document.getElementById('appStyles').appendChild(styleElem);    
}
//

// LOGGIN DEBUG MESSAGES //
// Input 'debugMessage' type string 
///////
function logDebugMessage(debugMessage){
    console.log('Message: '+debugMessage+" ; Time: "+timeStamp())
    
    var appDebugLogItem = document.createElement("DIV");   
    appDebugLogItem.setAttribute("class", "debugLogSingleItem");
    appDebugLogItem.innerHTML = "<div class='debugMessage'>"+debugMessage+"</div> <div class='debugMsgTime'>"+timeStamp()+"</div>";        
    appDebugLogList.insertBefore(appDebugLogItem, appDebugLogList.querySelector('.anchor'));
}
//!!! LOGGIN DEBUG MESSAGES !!!//

// CLEAR DEBUG LOG LIST //
function clearDebugLog(){
    appDebugLogList.innerHTML = "";
}
//!! 

// Returns TIMESTAMP
function timeStamp(){
    var d = new Date();
    var timeStamp = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+":"+d.getMilliseconds();
    return timeStamp;
}
//!!

//
function toggleDebugVisibility(){
    appDebugContainer.classList.toggle('shown');
};
//!!

// Trows modal to choose new SVG or load old one
function newSvgStartPoint(){
    var element =  document.getElementById('custom-modals-style');
    if (!(typeof(element) != 'undefined' && element != null))
    {
        insertStyle('custom-modals-style', 'styles/custom-modals.css');
    }

    var newModal = document.createElement("DIV");   
    newModal.setAttribute("class", "modal startingPointSVGModal");
    newModal.innerHTML = "<h3>Where to start from?</h3><br><button onclick='createNewSVG()'>New SVG</button><button>Load SVG</button>";        
    appContainer.appendChild(newModal);

    logDebugMessage('Starting Point modal trown')

}
//!!

// After modal....removes modal....trow new svg congig modal
function createNewSVG(){
    logDebugMessage('New SVG');

    removeDomElement('.startingPointSVGModal');
    logDebugMessage('Starting Point modal REMOVED');

    newSvgStartConfig();
}
//!!

// New modal for config svg
function newSvgStartConfig(){

    var newModal = document.createElement("DIV");   
    newModal.setAttribute("class", "modal startingConfigSVGModal");
    newModal.innerHTML =    `<div class='title-part'>
                                <h3>Choose SVG dimensions?</h3>
                            </div>
                            <div class='content-part'>
                                <div class='singleOption'>
                                    <p>Name:</p>
                                    <input type='text' id='newSvgName' placeholeder='Enter name' required>
                                </div>
                                <div class='singleOption'>
                                    <p>Width:</p>
                                    <input type='number' id='newSvgWidth' value='100'>
                                </div>
                                <div class='singleOption'>
                                    <p>Height:</p>
                                    <input type='number' id='newSvgHeight' value='100'>
                                </div>
                                <div class='modal-options'>
                                    <button onclick='startNewSvgFromConfig()'>Create</button>
                                    <button onclick='cancelSVGConfigModal()'>Cancel</button>
                                </div>
                            </div>`;        
    appContainer.appendChild(newModal);

    if (debugEnable){
        logDebugMessage('Starting SVG Config modal trown')
    }
}
//!!

// Cancel New SVG config modal
function cancelSVGConfigModal(){
    removeDomElement('.startingConfigSVGModal');

    if (debugEnable){
        logDebugMessage('Removed Starting SVG Config modal')
    }

    newSvgStartPoint();
}
//!!

//Start new svg from modal config
function startNewSvgFromConfig(){

    if (debugEnable){
        logDebugMessage('Width: '+document.getElementById('newSvgWidth').value+'; Height: '+document.getElementById('newSvgHeight').value)
    }
     
    appSvgArea.innerHTML += `<svg id="`+document.getElementById('newSvgName').value+`" viewBox="0 0 16.6 16.6"  width="`+document.getElementById('newSvgWidth').value+`" height="`+document.getElementById('newSvgHeight').value+`">
                            </svg>`;
    
    currentSVGJSON = {  name:   document.getElementById('newSvgName').value,
                        height: document.getElementById('newSvgHeight').value,
                        width: document.getElementById('newSvgWidth').value,
                        top: 0,
                        left: 0,
                        paths:  [],
                    };
    
    currentSVG = document.getElementById(document.getElementById('newSvgName').value);   

    document.getElementById('svg-structure').innerHTML = '<div id="svg-'+document.getElementById('newSvgName').value+'" class="rootSVG"><div class="header"><h4>SVG: <input type="text" value="'+document.getElementById('newSvgName').value+'"></h4><button>Save</button></div></div>';

    document.getElementById(document.getElementById('newSvgName').value).innerHTML =  '<circle class="stroke" cx="8.2" cy="8.2" r="7.8" />';
    document.getElementById('svg-'+document.getElementById('newSvgName').value).innerHTML += '<div class="svg-child-'+document.getElementById('newSvgName').value+' svgElem"></div>';
    
    currentSVGJSON.paths.push({ "pathName" : 'svg-'+document.getElementById('newSvgName').value, "pathType" : "circle" });

    document.getElementById('currentSVGJSON').innerHTML = JSON.stringify(currentSVGJSON);

    if (debugEnable){
        logDebugMessage('Created SVG from Config')
    }

    removeDomElement('.startingConfigSVGModal');
}
//!!

// remove dom element 
function removeDomElement(selectorTXT){
    var elem = document.querySelector(selectorTXT);
    elem.parentNode.removeChild(elem);
}
//!!

// DOC ready start app
(function() {
    // your page initialization code here
    // the DOM will be available here
    drawApplication();

 })();
//!!


