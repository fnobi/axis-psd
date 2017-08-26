axis-psd
==============

export psd data positions.

## install

### from npm

```
npm install axis-psd
```

### from github

```
git clone git://github.com/fnobi/axis-psd.git
```

## usage

### export with format

```
$ axis-psd sample.psd
[{"name":"baloon2-1.png","width":289,"height":313,"top":841,"left":439,"right":728,"bottom":1154},{"name":"baloon1-2.png","width":314,"height":337,"top":378,"left":418,"right":732,"bottom":715},{"name":"koma2.png","width":718,"height":428,"top":625,"left":4,"right":722,"bottom":1053},{"name":"koma1.png","width":693,"height":478,"top":119,"left":28,"right":721,"bottom":597}]
```

```
$ axis-psd --format css sample.psd
.layer[data-layer="koma1"] {
    left: 28px;
    top: 119px;
    width: 693px;
    height: 478px;
    background-image: url("koma1.png");
}
.layer[data-layer="koma2"] {
    left: 4px;
    top: 625px;
    width: 718px;
    height: 428px;
    background-image: url("koma2.png");
}
.layer[data-layer="baloon1-2"] {
    left: 418px;
    top: 378px;
    width: 314px;
    height: 337px;
    background-image: url("baloon1-2.png");
}
.layer[data-layer="baloon2-1"] {
    left: 439px;
    top: 841px;
    width: 289px;
    height: 313px;
    background-image: url("baloon2-1.png");
}
```

```
$ axis-psd --format pug sample.psd
.layer(data-layer="koma1")
.layer(data-layer="koma2")
.layer(data-layer="baloon1-2")
.layer(data-layer="baloon2-1")
```

### customize for css

```
$ axis-psd --ratio 0.5 --format css --image-dir assets/ --sass-image-function image-url --base-selector '&'
&[data-layer="koma1"] {
    left: 14px;
    top: 59.5px;
    width: 346.5px;
    height: 239px;
    background-image: image-url("assets/koma1.png");
}
&[data-layer="koma2"] {
    left: 2px;
    top: 312.5px;
    width: 359px;
    height: 214px;
    background-image: image-url("assets/koma2.png");
}
&[data-layer="baloon1-2"] {
    left: 209px;
    top: 189px;
    width: 157px;
    height: 168.5px;
    background-image: image-url("assets/baloon1-2.png");
}
&[data-layer="baloon2-1"] {
    left: 219.5px;
    top: 420.5px;
    width: 144.5px;
    height: 156.5px;
    background-image: image-url("assets/baloon2-1.png");
}
```
