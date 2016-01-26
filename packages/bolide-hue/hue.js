let log = new BolideLog({category: "system", module:"hue"});
class XYPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
const Red = new XYPoint(0.675, 0.322);
const Lime = new XYPoint(0.4091, 0.518);
const Blue = new XYPoint(0.167, 0.04);

Hue = class Hue {
    constructor (ip, username){
        this.ip = ip;
        this.username = username;
        this.baseUrl = `http://${ip}/api/${username}/`;
        this.error = false;
        log.debug('Registered bridge ' +this.baseUrl);
    }
    getLights(){
        const response = HTTP.get(this.baseUrl+"lights", this.handleHttpError.bind(this));
        return response.data;
    }
    setLightOn(id, on){
        const data = {on: on};
        this.httpPut(id,  data);
        log.info(`Light Toggle: ${id} now ${on}`,{light:id});
    }
    setLightColor(id,r,g,b){
        const data = {xy:rgbToXY(r,g,b)};
        this.httpPut(id,  data);
        log.info(`Light Color: ${id} now rgb(${r},${g},${b})`,{light:id});
    }
    setLightRandom(id){
        const data = {xy:rgbToXY(_randomRGBValue(),_randomRGBValue(),_randomRGBValue())};
        this.httpPut(id,  data);
        log.info(`Light Random: ${id}`,{light:id});
    }
    setLightBrightness(id, brightness){
        const data = {bri: brightness};
        this.httpPut(id,  data);
        log.info(`Light Brightness: ${id} now ${brightness}`,{light:id});
    }
    setLightState(id, state){
        const data = _(state).clone();
        if(state && state.rgb){
            data.xy = rgbToXY(state.rgb.r,state.rgb.g,state.rgb.b);
            delete data.rgb;
        }
        this.httpPut(id,  data);
        log.info(`Light State: ${id} now ${JSON.stringify(state)}`,{light:id});
    }
    httpPut(id, data){
        HTTP.put(`${this.baseUrl}lights/${id}/state`, {data:data}, this.handleHttpError.bind(this));
    }
    handleHttpError(error, result){
        if(error || (result && result.statusCode && result.statusCode > 200)){
            this.error = error;
            log.error(error);
        }
    }
};
function rgbToXY(red, green, blue) {
    var point = _getXYPointFromRGB(red, green, blue);
    return [point.x, point.y];
}

/** FROM https://github.com/pushchris/hue-module/blob/master/lib/colors.js
 * Color utility functions.
 * No external dependencies.
 * Rewritten for use as a node.js module.
 * Special thanks for the RGB to CIE conversion code goes out to the Q42 team
 * for their Q42.HueApi work. Dank u!
 * More info: https://github.com/Q42/Q42.HueApi.
 *
 * https://github.com/bjohnso5/hue-hacking
 * Copyright (c) 2013 Bryan Johnson; Licensed MIT */
function _randomFromInterval(from /* Number */ , to /* Number */ ) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function _randomRGBValue() {
    return _randomFromInterval(0, 255);
}

function _crossProduct(p1, p2) {
    return (p1.x * p2.y - p1.y * p2.x);
}

function _checkPointInLampsReach(p) {
    var v1 = new XYPoint(Lime.x - Red.x, Lime.y - Red.y),
        v2 = new XYPoint(Blue.x - Red.x, Blue.y - Red.y),
        q = new XYPoint(p.x - Red.x, p.y - Red.y),
        s = _crossProduct(q, v2) / _crossProduct(v1, v2),
        t = _crossProduct(v1, q) / _crossProduct(v1, v2);
    return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
}

function _getClosestPointToPoint(A, B, P) {
    var AP = new XYPoint(P.x - A.x, P.y - A.y),
        AB = new XYPoint(B.x - A.x, B.y - A.y),
        ab2 = AB.x * AB.x + AB.y * AB.y,
        ap_ab = AP.x * AB.x + AP.y * AB.y,
        t = ap_ab / ab2;
    if (t < 0.0) t = 0.0;
    else if (t > 1.0) t = 1.0;
    return new XYPoint(A.x + AB.x * t, A.y + AB.y * t);
}

function _getDistanceBetweenTwoPoints(one, two) {
    var dx = one.x - two.x,
    // horizontal difference
        dy = one.y - two.y; // vertical difference
    return Math.sqrt(dx * dx + dy * dy);
}

function _getXYPointFromRGB(red, green, blue) {
    var r = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92),
        g = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92),
        b = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92),
        X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804,
        Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169,
        Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733,
        cx = X / (X + Y + Z),
        cy = Y / (X + Y + Z);
    cx = isNaN(cx) ? 0.0 : cx;
    cy = isNaN(cy) ? 0.0 : cy;
    //Check if the given XY value is within the colourreach of our lamps.
    var xyPoint = new XYPoint(cx, cy),
        inReachOfLamps = _checkPointInLampsReach(xyPoint);
    if (!inReachOfLamps) {
        //Color is unreproducible, find the closest point on each line in the CIE 1931 'triangle'.
        var pAB = _getClosestPointToPoint(Red, Lime, xyPoint),
            pAC = _getClosestPointToPoint(Blue, Red, xyPoint),
            pBC = _getClosestPointToPoint(Lime, Blue, xyPoint),
        // Get the distances per point and see which point is closer to our Point.
            dAB = _getDistanceBetweenTwoPoints(xyPoint, pAB),
            dAC = _getDistanceBetweenTwoPoints(xyPoint, pAC),
            dBC = _getDistanceBetweenTwoPoints(xyPoint, pBC),
            lowest = dAB,
            closestPoint = pAB;
        if (dAC < lowest) {
            lowest = dAC;
            closestPoint = pAC;
        }
        if (dBC < lowest) {
            lowest = dBC;
            closestPoint = pBC;
        }
        // Change the xy value to a value which is within the reach of the lamp.
        cx = closestPoint.x;
        cy = closestPoint.y;
    }

    return new XYPoint(cx, cy);
}
