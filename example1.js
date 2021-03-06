
let img;
let inputbtn;
let w=256;
let sw=128;
let w2=1024;
let pg,pg2;
let button;
let font;

let tile=4;



//纵向截图位置 voronoi数量（10-300） 最小距离（10-60） 
let pos;
let r1,r2;

let posSlider, r1Slider, r2Slider;

function preload() {
  img = loadImage('test.jpeg');
  	
   //font = loadFont("chinese.ttf");
}

function setup() {


	createCanvas(900, 600);

pixelDensity(2);
	//textFont(font);
	 textSize(15);

	posSlider = createSlider(0, 100, 50);
  	posSlider.position(20, w+20);
  	r1Slider = createSlider(15, 80, 30);
  	r1Slider.position(20, w+50);
  	r2Slider = createSlider(3, 60, 10);
  	r2Slider.position(20, w+80);

	noSmooth();
	
	fill(30);
	rect(0,0,w,w);


	pg = createGraphics(w*2, w*2);
	pg2 = createGraphics(w, w);
	pg.pixelDensity(2);
pg2.pixelDensity(2);


	  button = createButton('Go!');
  button.position(20, r2Slider.y+35);
  button.mousePressed(processing);

   inputbtn = createFileInput(processFile); 
  inputbtn.position(20, button.y+35); 

	
	//Settings for drawing(these are the default values)

	//Set Cell Stroke Weight
	voronoiCellStrokeWeight(0);
	//Set Site Stroke Weight
	voronoiSiteStrokeWeight(0);
	//Set Cell Stroke
	voronoiCellStroke(0);
	//Set Site Stroke
	voronoiSiteStroke(0);
	//Set flag to draw Site
	voronoiSiteFlag(false);

	//Sets 30 random sites with 50 minimum distance to be added upon computing
	//Please note that this method is just for testing, you should use your own
	//method for placing random sites with minimum distance
	

	// //Add array of custom sites
	 //voronoiSites([[5,5],[100,50],[150,60]]);

	// //Add array of custom sites with custom colors associated (255 = white)
	 //voronoiSites([[255,255,color(255,0,0)],[10,255,20],[15,20,255]]);

	// //Remove custom site with coordinates 15,5
	// voronoiRemoveSite(15, 5);

	// //Remove custom site with index 0 (in this case it's the site with coordinates [5,5])
	// voronoiRemoveSite(0);

	// Add custom site with coordinates i*30,50
	// for (var i = 0; i < 10; i++) {
	// 	voronoiSite(i * 30, 50);
	// }

	//Add custom site with custom color at coordinates 50,100 (255 = white)
	//voronoiSite(50, 100, 255);

	//Clear custom sites (does not clear random sites)
	//voronoiClearSites();

	//Jitter Settings (These are the default settings)

	// //Maximum distance between jitters
	// voronoiJitterStepMax(20);
	// //Minimum distance between jitters
	// voronoiJitterStepMin(5);
	// //Scales each jitter
	// voronoiJitterFactor(3);
	// //Jitter edges of diagram
	// voronoiJitterBorder(false);

	//Compute voronoi diagram with size 700 by 500
	//With a prepared jitter structure (true)



	// for (var i =0; i < w; i++) {
	// 	//取色
	// 	let pColor=get(i,w/2);
	// 	pg.set(i,0,pColor)

	// }


	// pg.resize(w,w);

}

function draw(){

//background(220);

	text('position', posSlider.x * 2 + posSlider.width, posSlider.y+15);
  text('density', r1Slider.x * 2 + r1Slider.width, r1Slider.y+15);
  text('min distance', r2Slider.x * 2 + r2Slider.width, r2Slider.y+15);


}

function paint(){
	
	  console.log('generating');

	 
	

pos=posSlider.value();
r1=r1Slider.value();
r2=r2Slider.value();


 //    pg.image(img, 0, 0);

	// pg.voronoiRndSites(r1, r2);
	// pg.voronoi(w, w, true);
	// pg.voronoiDraw(0, 0, true, false);
	//img.resize(w,w);
	image(img, 0, 0,w,w);

	voronoiRndSites(r1, r2);
	voronoi(w, w, true);
	voronoiDraw(0, 0, true, false);

	this.loadPixels();

		for (var i =0; i < w; i++) {
		//取色
		let p=(2*900*floor(2*w*pos/100)+i*2)*4;
		//pColor=get(i,floor(w*pos/100));
		pColor=color(pixels[p], pixels[p + 1], 
			pixels[p + 2], pixels[p + 3]);

// pixels[p] = 255;
// pixels[p + 1] = 0;
// pixels[p + 2] = 0;
// pixels[p + 3] = 255;
// updatePixels(); 

		pg.stroke(pColor);
		pg.strokeWeight(1);
		//noStroke();
		pg.line(i,0,i,w*2);
	}



	image(pg,0,0,w,w);
	push();
	translate(w / 2, w/ 2);
	rotate(PI / 2.0);
	tint(255, 127);
	image(pg,-w/2,-w/2,w,w);
	pop();


this.loadPixels();

	let pattern = createImage(2*w,2*w);

pattern.loadPixels();
for (let i = 0; i < w; i++) {
  for (let j = 0; j < w; j++) {
  	let p=(2*900*floor(2*j)+2*i)*4;
		//pColor=get(i,floor(w*pos/100));
		pColor=color(pixels[p], pixels[p + 1], 
			pixels[p + 2], pixels[p + 3]);
    pattern.set(i, j, pColor);
  }
}
pattern.updatePixels();


push();
translate(w+20,0);
	for (var i = 0; i <tile; i++) {
		for(var j = 0; j <tile; j++){
image(pattern,i*w*2/tile,j*w*2/tile,w2/tile,w2/tile);

		}
	}
pop();

// fill(255);
	
// 	text('Done!',button.x+button.width+15,button.y+15);
// 	  console.log('done');

image(img,20,450,120,120);

push();
translate(20,450);
stroke(255,0,0);
line(0,pos*0.01*120,120,pos*0.01*120);
pop();

document.getElementById('tips').innerText = '生成完毕！';

}

function processFile(file) { 
	if (file.type === 'image') {
		console.log('got image file');
	img=createImg(file.data).hide();

	image(img,20,450,120,120);
}else {
    console.log('Not an image file!');
     document.getElementById('tips').innerText = '不是图片文件哦，不行的！';
    //text('NOT IMAGE FILE!!',button.x+button.width+15,button.y+15);
  }
} 

function processing(){
 document.getElementById('tips').innerText = '生成中……';
	paint();
}

