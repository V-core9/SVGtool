var svgJSON;

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


