function _(selector) {
    return document.querySelector(selector);
}
function stringDraw(string) {
    return string;
}
var img;
var pg;
// définir les var de zoom en global pour l'affecter a draw
var zoom = 1.00;
var zMin = 1.00;
var zMax = 7.50;
var speedZoom = 0.15;

function preload() {
    img = loadImage("./img/mapclassichd.jpg");
}
function setup() {
    let canvas = createCanvas(700, 700);
    canvas.parent("img-wrapper");
    background(255);
    pg = createGraphics(700, 700);
    rectMode(CENTER);
}

function mouseDragged() {
    let type = _("#pen").checked?"pen":"click";
    let size = parseInt(_("#pen-size").value);
    let color = _("#pen-color").value;
    pg.fill(color);
    pg.stroke(color);
    pg.strokeWeight(size);
    if(type == "pen") {
        pg.line(pmouseX / zoom, pmouseY / zoom, mouseX / zoom, mouseY / zoom);
        // ajouter un event pour recup la position de la souris et du img wrapper pour dessiner que la dessus
    }
}
function mouseWheel(e) {
    // recupérer les coordonnées de limage et de l'endroit du curseur pour le zoom
    var rect = _("#img-wrapper").getBoundingClientRect();
    let wheelX = e.pageX;
    let wheelY = e.pageY;
    let rectX1 = rect.x;
    let rectX2 = rect.x + rect.width;
    let rectY1 = rect.y;
    let rectY2 = rect.y + rect.height;

    if (wheelX > rectX1 && wheelX < rectX2 && wheelY > rectY1 && wheelY < rectY2) {
        let imgScale = _("#img-wrapper canvas");
        let deltacount = 0;
        // zoom in or out ?
        // e.delta > ou < a 0 
        // zoom in = négaitf
        // zoom out = positif
        if (e.delta < 0) {
            // comment changer l'origine et limiter le scale pour pas que cela dépasse
            // origine va etre égal a wheelx - x1 wheely - y1
            if (zoom < 4) {
                imgScale.style.objectFit= "contain";
                let originX1 = wheelX - rectX1;
                let originY1 = wheelY - rectY1;
                imgScale.style.transformOrigin = `${originX1}px ${originY1}px`;
                zoom += speedZoom;
                zoom = constrain(zoom, zMin, zMax);
                imgScale.style.transform =`scale(${zoom})`;
                deltacount = e.delta + deltacount;
                console.log(deltacount);
            } else {
                zoom += speedZoom;
                zoom = constrain(zoom, zMin, zMax);
                imgScale.style.transform =`scale(${zoom})`;
            }
     
        }  else {
            console.log("out");
            zoom -= speedZoom;
            zoom = constrain(zoom, zMin, zMax);
            imgScale.style.transform =`scale(${zoom})`;
        }
        
    }
}
_("#reset-canvas").addEventListener("click", () => {
    background(255);
    pg = createGraphics(700, 700);
});
_("#save-canvas").addEventListener("click", () => {
    saveCanvas(canvas, "Planner", "png");
});

function draw() {
    
    image(img, 0,0, 700, 700);
    image(pg, 0, 0);
    image(pg, 0, 700);
    
    
}
// scale le rendu sur le mousewheel
// ctrl z => tout dans un array et crtl z ou event listener pour suprimer la derniere entreé, event listener sur le clic de la souris poru identifier le trait dans a globalité et pas tout les traits tracés
// time stamp ?
// https://www.youtube.com/watch?v=EyG_2AdHlzY

// https://fontawesome.com/v5.15/icons/undo?style=solid

// logic du zoom
// recuperer les coordonnées x1 x2 y1 y2 du canvas et quand zoom entre ces zones scale a partir des coordonnées x y pour ca ce renseigner sur rectMode si possibilité d'y intégrer des coordonnées
// zoom speed etc

// faire bouton changer map et lister tous les outils sur la gauche

// appliquer la différence de zoom a la ligne pour pas quelle se décale

// faire ou recup screen shot pixel sharp poru faire la map écran carré et hd ou 4k
// resoudre le pb par le draw

// stack le delta dans une variable 
// changer la variable img et load une nouvelle
// solution de changer lane

// pb coordonées relatives du canvas de la target pour dessiner

// line en svg pour la qualité