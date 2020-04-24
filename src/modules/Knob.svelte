<script context="module">
  export const RangeKnob = function(element) {
    this.element = element;
    this.rangeInput = element.firstChild;
    this.knob = element.lastChild;
    this.minValue = this.rangeInput.min;
    this.maxValue = this.rangeInput.max;
    this.init();
  };

  RangeKnob.prototype = {
    init: function() {
      const _this = this;
      this.rotateKnob(this.rangeInput.value);
      this.rangeInput.addEventListener("mousedown", function() {
        _this.mouseDownHandler(_this);
      });
      this.rangeInput.addEventListener("touchstart", function() {
        _this.touchStartHandler(_this);
      });
    },
    mouseDownHandler: function(that) {
      const _this = that;
      _this.rangeInput.addEventListener("mousemove", function() {
        _this.rotateKnob(_this.rangeInput.value);
      });
    },
    touchStartHandler: function(that) {
      const _this = that;
      _this.rangeInput.addEventListener("touchmove", function() {
        _this.rotateKnob(_this.rangeInput.value);
      });
    },
    mouseUpHandler: function() {},
    rotateKnob: function(rotation) {
      const calculatedRotation =
        ((rotation - this.minValue) / (this.maxValue - this.minValue)) * 270 -
        135;
      this.knob.style.transform = `rotate(${calculatedRotation}deg)`;
      this.knob.style["-webkit-transform"] = `rotate(${calculatedRotation}deg)`;
      this.knob.style["-moz-transform"] = `rotate(${calculatedRotation}deg)`;
      this.knob.style["-ms-transform"] = `rotate(${calculatedRotation}deg)`;
    }
  };
</script>
