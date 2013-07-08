/**
* Offreg jQuery plug-in
* Make Like Print
*
* @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
* @homepage http://bite-software.co.uk/offreg/
* @version 0.0.1
* @license MIT http://opensource.org/licenses/MIT
* @date 26-06-2013
*/
(function($) {

$.fn.offreg = function(image,transparent,rotational_err,axis_err){ // strength
	
	var el = $(this),
		process = new Plugin(el,image,transparent,rotational_err,axis_err);	
			
	return el;	
}

var Plugin = function(me,src,png,rot,axis){

	this.el = me;
	this.img = new Image();
	this.w = 0;
	this.h = 0;
	this.rot = rot;
	this.axis = (!axis)? rot : axis;

	this.png = (png)? png : false;
	this.bg = me.css('background-color');
	
	this.pixelData = [];
	this.rgb = [];

	this.init(src);
}

Plugin.prototype.init = function(src){

	var $this = this;

	this.c = document.createElement('canvas');
	this.ctx = this.c.getContext("2d");
		
	this.img.src = src;
	this.img.onload = function(e){
		// initialise dimensions
		$this.w = $(this)[0].width;
		$this.h = $(this)[0].height;
		
		$this.c.width = $this.w;
		$this.c.height = $this.h;
		
		$this.padding = 0.9; 	// percentage reduction of image within origin boundaries
		$this.imgw = $this.w * $this.padding;
		$this.imgh = $this.h * $this.padding;

		$this.buildLayerData();
	}

}

Plugin.prototype.buildLayerData = function(){

	var pixels = this.pixelData,
		degMax = 2 * this.rot,
		offMax = 10 * this.axis;
	
	if(degMax < 0.1){
		degMax = 0.1;
	}
	if(offMax < 0.1){
		offMax = 0.1;
	}

	for(var i=0;i<3;i++){		// construct postioning of offsets
		
		var deg = -degMax + Math.random()*(degMax*2),
			offx = Math.random()*(offMax*2) -offMax,
			offy = Math.random()*(offMax*2) -offMax;

		this.ctx.save();

        this.ctx.translate(this.w/2,this.h/2);
        this.ctx.rotate(this.toRad(deg));
        
        if(!this.png){ // if jpg -> set bg colour to $(selector)
        	this.ctx.fillStyle = this.bg;
			this.ctx.fillRect(-this.imgw*1.5,-this.imgh*1.5, this.w*3, this.h*3);
		}

        this.ctx.drawImage(this.img,-this.imgw/2,-this.imgh/2,this.imgw,this.imgh);   
        
        pixels[i] = this.ctx.getImageData(offx,offy,this.w ,this.h);
        
        this.ctx.restore(); 
        // this.ctx.clearRect(0,0,this.w,this.h);
        
	}

	this.convertToRGBChannels();
}


Plugin.prototype.convertToRGBChannels = function(){

	var rgb = this.rgb; 		// rgb -> temp place to copy the pixel data - 
								// convert them to their respective colour channel - 
								// then return them to original imageData source.

	for(var ch=0;ch<3;ch++){

		rgb[ch] = this.pixelData[ch].data;

		var channel = rgb[ch];
	
		for (var i=0; i<channel.length - 4; i+=4) {

			switch(ch){
				case 0: 		// red channel
					channel[i] = 255 - channel[i];         
	    	        channel[i + 1] = 0;
    	    	    channel[i + 2] = 0;
    	    	break;
    	    	case 1: 		// green channel
					channel[i] = 0        
	    	        channel[i + 1] = 255 - channel[i + 1]; ;
    	    	    channel[i + 2] = 0;
    	    	break;
    	    	case 2: 		// blue channel
					channel[i] = 0;         
	    	        channel[i + 1] = 0;
    	    	    channel[i + 2] = 255 - channel[i + 2];
    	    	break;
			}
           
        }
        this.pixelData[ch].data = channel;
        
	}

	this.merge();
}


Plugin.prototype.merge = function(){

	var output = this.pixelData[1];

	this.screenBlend(this.pixelData[0],output); // merge red & green
	this.screenBlend(this.pixelData[2],output); // merge [red/green] with blue

	this.invert(output);

	this.deploy(output);
}

Plugin.prototype.deploy = function(dst){
	
	this.ctx.putImageData(dst,0,0);

	if(!this.png){ // dirty jpeg hack -> was creating a black background -> line width test on smaller images
		this.ctx.strokeStyle=this.bg;
		this.ctx.lineWidth=25; // needs to become dynamic based on source dimensions
		this.ctx.strokeRect(0,-0,this.w,this.h);
	}
        
    this.el.append(this.convertCanvasToImage(this.c));
}

Plugin.prototype.screenBlend = function(src,dst){

	var sA, dA, len = dst.data.length;
    var sRA, sGA, sBA, dRA, dGA, dBA, dA2;
    var demultiply;

    for (var px=0;px<len;px+=4){
        sA  = src.data[px+3]/255;
        dA  = dst.data[px+3]/255;
        dA2 = (sA + dA - sA*dA);
        dst.data[px+3] = dA2*255;

        sRA = src.data[px  ]/255*sA;
        dRA = dst.data[px  ]/255*dA;
        sGA = src.data[px+1]/255*sA;
        dGA = dst.data[px+1]/255*dA;
        sBA = src.data[px+2]/255*sA;
        dBA = dst.data[px+2]/255*dA;

        demultiply = 255 / dA2;

        dst.data[px  ] = (sRA + dRA - sRA*dRA) * demultiply;
        dst.data[px+1] = (sGA + dGA - sGA*dGA) * demultiply;
        dst.data[px+2] = (sBA + dBA - sBA*dBA) * demultiply;
    }

}
Plugin.prototype.invert = function(pixels){

	for(var i=0;i<pixels.data.length-4;i+=4){
	    pixels.data[i] = 255 - pixels.data[i];
	    pixels.data[i+1] = 255 - pixels.data[i+1];
	    pixels.data[i+2] = 255 - pixels.data[i+2];
	}
}
Plugin.prototype.toRad = function(deg){
    return deg/180 * Math.PI;
}
Plugin.prototype.convertCanvasToImage = function(canvas) {
    var image = new Image();
    image.src = (this.png)? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg");
    return image;
}


})(jQuery);