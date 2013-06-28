JUMBLE
======

A jQuery plugin that jumbles up the colours of your text headers, and can also animate them.

<a href='http://bite-software.co.uk/jumble'>Plugin Site</a>

BASIC USAGE:
```javascript
$('h1').jumble(
	colour_1,
	colour_2,
	brightness,
	satuation,
	time
);
```
<h1>config options:</h1>
<ul>
<li><b>colour 1:</b> rgb array-> <b>[255,255,55]</b></li>
<li><b>colour 2:</b> rgb array-> <b>[255,0,155]</b> optional: (if singular colour then declare false)</li>
<li><b>brightness :</b> boolean-> <b>false</b></li>
<li><b>satuation</b> boolean-> <b>true</b></li>
<li><b>time</b> mileseconds-> <b>1000</b></li>
</ul>
<h1>usage example</h1>
```javascript
$('h1').jumble([180,160,90],[230,20,130],true.false,false,200);
```