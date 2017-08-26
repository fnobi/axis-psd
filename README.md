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
