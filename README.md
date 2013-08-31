OFFREG
======

Make Like Print - A jQuery plugin that uses canvas to create a 'screen print' offset effect on an image, by altering the pixel data. 

<a href='http://bite-software.co.uk/offreg'>Plugin Site</a>

BASIC USAGE:
```javascript
$('.container').offreg(
	source,
	transparent,
	rotation,
	offset
);
```
<h1>config options:</h1>

| Option             | data type      | values               | Required | Nb.                								  | 
| ------------------ |----------------|----------------------|----------|-----------------------------------------------------|
| source  			 | string         | 'img/image.jpg'      | Yes      | any img type     									  |       
| transparent        | boolean        | true / false         | Yes      | preserves transparency, but creates a 'heavier' png |        
| rotation 			 | float          | 0.0 -> 1.0  	     | Yes      | rotation offset strength      					  |        
| offset 			 | float          | 0.0 -> 1.0   	     | No       | x/y axis offset strength    					      |        

<h1>usage example</h1>
```javascript
$('.container').offreg(img,true,0.7);
```
<p>Nb. Renders poorly in Chrome. But all good in other modern browsers.</p>
