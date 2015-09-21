var _ = require('lodash');

// http://www.html5rocks.com/en/tutorials/canvas/hidpi/
function getPixelRatio(ctx) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

    var ratio = devicePixelRatio / backingStoreRatio;
    return {
        ratio: ratio,
        devicePixelRatio: devicePixelRatio,
        backingStoreRatio: backingStoreRatio
    };
}

function Stage(options) {
    options = options || {};

    this.elem = document.createElement('canvas');

    options.width = options.width || window.innerWidth;
    options.height = options.height || window.innerHeight;
    options.resize = options.resize || true;
    options.className = options.className || 'stage';
    options.scale = options.scale || false;

    this.ctx = this.elem.getContext('2d');

    this.width = this.elem.width = options.width;
    this.height = this.elem.height = options.height;
    this.elem.style.width = options.width + 'px';
    this.elem.style.height = options.height + 'px';

    var ratios = getPixelRatio(this.ctx);

    if (options.scale && ratios.devicePixelRatio !== ratios.backingStoreRatio) {
        var elWidth = this.width;
        var elHeight = this.height;

        canvas.width = elWidth * ratios.ratio;
        canvas.width = elWidth * ratios.ratio;

    }

    this.initialize(options);
}



Stage.prototype.initialize = function initialize(options) {
    // for subclassing
}

Stage.prototype.getElement = function getElement() {
    return this.elem;
}

Stage.prototype.getContext = function getContext() {
    return this.ctx;
}

Stage.prototype.getDimensions = function getDimensions() {
    return {
        width: this.width,
        height: this.height
    };
}


// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function() {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function() {
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};


Stage.extend = extend;

module.exports = Stage;