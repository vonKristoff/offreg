OFFREG
=======

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
<ul>
<li><b>source</b> object | string <b>'img/image.png'</b></li>
<li><b>transparent</b> boolean <b>true</b> Do you wish keep the transparency of source image? Nb. If yes, then a png is created, & that has a greater kb weight</li>
<li><b>rotation</b> float <b>0.5</b> 0 is none, 1 is max.</li>
<li><b>offset</b> float <b>0.5</b> x and y offset strength (Max:1) Optional: if no value is given, then the rotation decimal is used.</li>
</ul>
<h1>usage example</h1>
```javascript
$('.container').offset(img,true,0.7);
```
<p>Nb. Renders poorly in Chrome. But all good in other modern browsers.</p>
| Option                          | Description           	 |
| ------------------------------- |:------------------------ |
| top [ Number: 0 ]               | Spot top position        |