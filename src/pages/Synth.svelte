<script>
  import { RangeKnob } from "../modules/Knob.svelte";
  import { onMount } from "svelte";
  import Tone from "tone";

  // Knobs vars
  let oscAFrequencyKnob;
  let oscBFrequencyKnob;
  let oscAPulseWidthKnob;
  let oscBPulseWidthKnob;
  let oscBFineKnob;
  let oscAVolKnob;
  let oscBVolKnob;
  let filterKnob;
  let filterCutoffKnob;
  let filterResonanceKnob;
  let filterAmountKnob;
  let filterEnvelopeAttackKnob;
  let filterEnvelopeDecayKnob;
  let filterEnvelopeSustainKnob;
  let filterEnvelopeReleaseKnob;
  let filterQKnob;
  let ampEnvelopeAttackKnob;
  let ampEnvelopeDecayKnob;
  let ampEnvelopeSustainKnob;
  let ampEnvelopeReleaseKnob;

  // Input values
  let oscAType = 0;
  let oscBType = 0;

  let oscAFrequencyVal = 0;
  let oscBFrequencyVal = 0;
  let oscAPulseWidthVal = 0;
  let oscBPulseWidthVal = 0;
  let oscBFineVal = 0;
  let oscAVolVal = 50;
  let oscBVolVal = 50;
  let filterType = 0;
  let filterCutoffVal = 20000;
  let filterEnvelopeAttackVal = 0.5;
  let filterEnvelopeDecayVal = 0.2;
  let filterEnvelopeSustainVal = 0.8;
  let filterEnvelopeReleaseVal = 1;
  let filterQVal = 0;
  let filterAmountVal = 20000;
  let ampEnvelopeAttackVal = 0.1;
  let ampEnvelopeDecayVal = 0.1;
  let ampEnvelopeSustainVal = 1;
  let ampEnvelopeReleaseVal = 0.4;

  // Tonejs Nodes
  const Amp = new Tone.AmplitudeEnvelope(
    ampEnvelopeAttackVal,
    ampEnvelopeDecayVal,
    ampEnvelopeSustainVal,
    ampEnvelopeReleaseVal
  ).toMaster();
  const Filter = new Tone.Filter(1000, "lowpass", -24).connect(Amp);
  let OscA = new Tone.Oscillator(440, "sine").connect(Filter);
  let OscB = new Tone.Oscillator(440, "sine").connect(Filter);
  const ScaledEnvelope = new Tone.ScaledEnvelope(
    filterEnvelopeAttackVal,
    filterEnvelopeDecayVal,
    filterEnvelopeSustainVal,
    filterEnvelopeReleaseVal
  ).connect(Filter.frequency);

  // Initial values
  ScaledEnvelope.max = filterCutoffVal;
  ScaledEnvelope.min = filterAmountVal;
  ScaledEnvelope.attackCurve = "sine";

  // Value Change Funcitons
  const oscAFrequencyChange = val => {
    OscA.detune.value = val * 100;
  };

  const oscAPulseWidthChange = val => {
    OscA.width.value = val;
  };

  const oscBFrequencyChange = val => {
    OscB.detune.value = val * 100 + oscBFineVal;
  };

  const oscBPulseWidthChange = val => {
    OscB.width.value = val;
  };

  const oscBFineChange = val => {
    OscB.detune.value = oscBFrequencyVal * 100 + val;
  };

  const oscAVolChange = val => {
    const minp = 0;
    const maxp = 100;

    const minv = 0;
    const maxv = Math.log(100);

    const scale = (maxv - minv) / (maxp - minp);

    OscA.volume.value = -Math.exp(minv + scale * (val - minp) + 1);
  };

  const oscBVolChange = val => {
    const minp = 0;
    const maxp = 100;

    const minv = 0;
    const maxv = Math.log(100);

    const scale = (maxv - minv) / (maxp - minp);

    OscB.volume.value = -Math.exp(minv + scale * (val - minp) + 1);
  };

  const oscATypeChange = val => {
    switch (val) {
      case 0:
        OscA.stop();
        OscA = new Tone.Oscillator(440, "sine").connect(Filter);
        oscAVolChange(oscAVolVal);
        OscA.detune.value = oscAFrequencyVal * 100;
        OscA.start();
        break;
      case 1:
        OscA.stop();
        OscA = new Tone.Oscillator(440, "square").connect(Filter);
        oscAVolChange(oscAVolVal);
        OscA.detune.value = oscAFrequencyVal * 100;
        OscA.start();
        break;
      case 2:
        OscA.stop();
        OscA = new Tone.Oscillator(440, "triangle").connect(Filter);
        oscAVolChange(oscAVolVal);
        OscA.detune.value = oscAFrequencyVal * 100;
        OscA.start();
        break;
      case 3:
        OscA.stop();
        OscA = new Tone.Oscillator(440, "sawtooth").connect(Filter);
        oscAVolChange(oscAVolVal);
        OscA.detune.value = oscAFrequencyVal * 100;
        OscA.start();
        break;
      case 4:
        OscA.stop();
        OscA = new Tone.PulseOscillator(440, oscAPulseWidthVal).connect(Filter);
        oscAVolChange(oscAVolVal);
        OscA.detune.value = oscAFrequencyVal * 100;
        OscA.width.value = oscAPulseWidthVal;
        OscA.start();
        break;
      default:
        break;
    }
  };

  const oscBTypeChange = val => {
    switch (val) {
      case 0:
        OscB.stop();
        OscB = new Tone.Oscillator(440, "sine").connect(Filter);
        oscBVolChange(oscBVolVal);
        OscB.detune.value = oscBFrequencyVal * 100;
        OscB.start();
        break;
      case 1:
        OscB.stop();
        OscB = new Tone.Oscillator(440, "square").connect(Filter);
        oscBVolChange(oscBVolVal);
        OscB.detune.value = oscBFrequencyVal * 100;
        OscB.start();
        break;
      case 2:
        OscB.stop();
        OscB = new Tone.Oscillator(440, "triangle").connect(Filter);
        oscBVolChange(oscBVolVal);
        OscB.detune.value = oscBFrequencyVal * 100;
        OscB.start();
        break;
      case 3:
        OscB.stop();
        OscB = new Tone.Oscillator(440, "sawtooth").connect(Filter);
        oscBVolChange(oscBVolVal);
        OscB.detune.value = oscBFrequencyVal * 100;
        OscB.start();
        break;
      case 4:
        OscB.stop();
        OscB = new Tone.PulseOscillator(440, oscBPulseWidthVal).connect(Filter);
        oscBVolChange(oscBVolVal);
        OscB.detune.value = oscBFrequencyVal * 100;
        OscB.width.value = oscBPulseWidthVal;
        OscB.start();
        break;
      default:
        break;
    }
  };

  const filterCutoffChange = val => {
    const minp = 20;
    const maxp = 20000;

    const minv = Math.log(20);
    const maxv = Math.log(20000);

    const scale = (maxv - minv) / (maxp - minp);

    ScaledEnvelope.min = Math.exp(minv + scale * (val - minp));
  };

  const filterAmountChange = val => {
    const minp = 20;
    const maxp = 20000;

    const minv = Math.log(20);
    const maxv = Math.log(20000);

    const scale = (maxv - minv) / (maxp - minp);

    ScaledEnvelope.max = Math.exp(minv + scale * (val - minp));
  };

  const filterQChange = val => {
    Filter.Q.value = val;
  };

  const filterEnvelopeAttackChange = val => {
    ScaledEnvelope.attack = val;
  };
  const filterEnvelopeDecayChange = val => {
    ScaledEnvelope.decay = val;
  };
  const filterEnvelopeSustainChange = val => {
    ScaledEnvelope.sustain = val;
  };
  const filterEnvelopeReleaseChange = val => {
    ScaledEnvelope.release = val;
  };

  const ampEnvelopeAttackChange = val => {
    Amp.attack = val;
  };

  const ampEnvelopeDecayChange = val => {
    Amp.decay = val;
  };

  const ampEnvelopeSustainChange = val => {
    Amp.sustain = val;
  };

  const ampEnvelopeReleaseChange = val => {
    Amp.release = val;
  };

  // const handleKeyDown = event => {
  //   if (event.key === "a") {
  //     ScaledEnvelope.triggerAttack();
  //     Amp.triggerAttack();
  //   }
  // };

  // const handleKeyUp = event => {
  //   if (event.key === "a") {
  //     ScaledEnvelope.triggerRelease();
  //     Amp.triggerRelease();
  //   }
  // };

  // Initiation
  onMount(() => {
    oscAVolChange(oscAVolVal);
    oscBVolChange(oscBVolVal);
    oscAFrequencyKnob = new RangeKnob(
      document.querySelector("#oscAFrequencyKnob")
    );
    oscBFrequencyKnob = new RangeKnob(
      document.querySelector("#oscBFrequencyKnob")
    );
    oscAPulseWidthKnob = new RangeKnob(
      document.querySelector("#oscAPulseWidthKnob")
    );
    oscBPulseWidthKnob = new RangeKnob(
      document.querySelector("#oscBPulseWidthKnob")
    );
    oscBFineKnob = new RangeKnob(document.querySelector("#oscBFineKnob"));
    oscAVolKnob = new RangeKnob(document.querySelector("#oscAVolKnob"));
    oscBVolKnob = new RangeKnob(document.querySelector("#oscBVolKnob"));
    filterCutoffKnob = new RangeKnob(
      document.querySelector("#filterCutoffKnob")
    );
    filterQKnob = new RangeKnob(document.querySelector("#filterQKnob"));
    filterEnvelopeAttackKnob = new RangeKnob(
      document.querySelector("#filterEnvelopeAttackKnob")
    );
    filterEnvelopeDecayKnob = new RangeKnob(
      document.querySelector("#filterEnvelopeDecayKnob")
    );
    filterEnvelopeSustainKnob = new RangeKnob(
      document.querySelector("#filterEnvelopeSustainKnob")
    );
    filterEnvelopeReleaseKnob = new RangeKnob(
      document.querySelector("#filterEnvelopeReleaseKnob")
    );
    filterAmountKnob = new RangeKnob(
      document.querySelector("#filterAmountKnob")
    );
    ampEnvelopeAttackKnob = new RangeKnob(
      document.querySelector("#ampEnvelopeAttackKnob")
    );
    ampEnvelopeDecayKnob = new RangeKnob(
      document.querySelector("#ampEnvelopeDecayKnob")
    );
    ampEnvelopeSustainKnob = new RangeKnob(
      document.querySelector("#ampEnvelopeSustainKnob")
    );
    ampEnvelopeReleaseKnob = new RangeKnob(
      document.querySelector("#ampEnvelopeReleaseKnob")
    );
  });
</script>

<style>
  .range-knob:after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 0.7rem;
    top: 0;
    left: 1.1rem;
    background: #111;
  }

  .selector {
    -webkit-appearance: slider-vertical;
  }

  .selector::-webkit-slider-thumb {
    appearance: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .black-keys {
    margin: -97px -24px 0 -24px;
  }

  .min-content {
    min-width: fit-content;
  }
</style>

<div class="border-2 rounded mt-24 p-4 max-w-screen-md mx-auto min-content">
  <div
    class="flex flex-col items-center justify-center border-2 rounded p-4 mb-4">
    <div class="dark:text-white text-center">Osc A</div>
    <div class="flex flex-row">

      <div class="flex flex-col items-center justify-center">
        <div class="text-center dark:text-white">Frequency</div>
        <div id="oscAFrequencyKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="10"
            step="1"
            bind:value={oscAFrequencyVal}
            on:input={() => oscAFrequencyChange(oscAFrequencyVal)}
            on:change={() => oscAFrequencyChange(oscAFrequencyVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="10"
          step="1"
          bind:value={oscAFrequencyVal}
          on:change={() => oscAFrequencyChange(oscAFrequencyVal)} />
      </div>

      <div class="flex flex-row items-center mx-4">
        <input
          class="selector h-24 w-3 mx-4 focus:outline-none"
          type="range"
          min="0"
          max="4"
          step="1"
          bind:value={oscAType}
          on:input={() => oscATypeChange(oscAType)}
          on:change={() => oscATypeChange(oscAType)} />
        <div class="dark:text-white text-sm flex flex-col justify-between">
          <div>pulse</div>
          <div>sawtooth</div>
          <div>tirangle</div>
          <div>square</div>
          <div>sine</div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <div class="text-center dark:text-white">Pulse Width</div>
        <div id="oscAPulseWidthKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={oscAPulseWidthVal}
            on:input={() => oscAPulseWidthChange(oscAPulseWidthVal)}
            on:change={() => oscAPulseWidthChange(oscAPulseWidthVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="1"
          step="0.01"
          bind:value={oscAPulseWidthVal}
          on:change={() => oscAPulseWidthChange(oscAPulseWidthVal)} />
      </div>
    </div>

  </div>
  <div
    class="flex flex-col items-center justify-center border-2 rounded p-4 mb-4">
    <div class="dark:text-white text-center">Osc B</div>
    <div class="flex flex-row items-center justify-center">

      <div class="flex flex-col items-center justify-center">
        <div class="text-center dark:text-white">Frequency</div>
        <div id="oscBFrequencyKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="10"
            step="1"
            bind:value={oscBFrequencyVal}
            on:input={() => oscBFrequencyChange(oscBFrequencyVal)}
            on:change={() => oscBFrequencyChange(oscBFrequencyVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="10"
          step="1"
          bind:value={oscBFrequencyVal}
          on:change={() => oscBFrequencyChange(oscBFrequencyVal)} />
      </div>

      <div class="flex flex-col items-center justify-center mx-2">
        <div class="text-center dark:text-white">Fine</div>
        <div id="oscBFineKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={oscBFineVal}
            on:input={() => oscBFineChange(oscBFineVal)}
            on:change={() => oscBFineChange(oscBFineVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="100"
          step="1"
          bind:value={oscBFineVal}
          on:change={() => oscBFineChange(oscBFineVal)} />
      </div>

      <div class="flex flex-row items-center mx-4">
        <input
          class="selector h-24 w-3 mx-4 focus:outline-none"
          type="range"
          min="0"
          max="4"
          step="1"
          bind:value={oscBType}
          on:input={() => oscBTypeChange(oscBType)}
          on:change={() => oscBTypeChange(oscBType)} />
        <div class="dark:text-white text-sm flex flex-col justify-between">
          <div>pulse</div>
          <div>sawtooth</div>
          <div>tirangle</div>
          <div>square</div>
          <div>sine</div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <div class="text-center dark:text-white">Pulse Width</div>
        <div id="oscBPulseWidthKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={oscBPulseWidthVal}
            on:input={() => oscBPulseWidthChange(oscBPulseWidthVal)}
            on:change={() => oscBPulseWidthChange(oscBPulseWidthVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="1"
          step="0.01"
          bind:value={oscBPulseWidthVal}
          on:change={() => oscBPulseWidthChange(oscBPulseWidthVal)} />
      </div>
    </div>
  </div>

  <div class="border-2 rounded p-4 mb-4">
    <div class="text-center dark:text-white">Mixer</div>
    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-col items-center justify-center mx-2">
        <div class="text-center dark:text-white">Osc A</div>
        <div id="oscAVolKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={oscAVolVal}
            on:input={() => oscAVolChange(oscAVolVal)}
            on:change={() => oscAVolChange(oscAVolVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="100"
          step="1"
          bind:value={oscAVolVal}
          on:change={() => oscAVolChange(oscAVolVal)} />
      </div>

      <div class="flex flex-col items-center justify-center mx-2">
        <div class="text-center dark:text-white">Osc B</div>
        <div id="oscBVolKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={oscBVolVal}
            on:input={() => oscBVolChange(oscBVolVal)}
            on:change={() => oscBVolChange(oscBVolVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="100"
          step="1"
          bind:value={oscBVolVal}
          on:change={() => oscBVolChange(oscBVolVal)} />
      </div>
    </div>

  </div>

  <div class="border-2 rounded p-4 mb-4">
    <div class="dark:text-white text-center">Filter</div>
    <div class="flex flex-row justify-center">
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Cutoff</div>
        <div id="filterCutoffKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="20"
            max="20000"
            step="1"
            bind:value={filterCutoffVal}
            on:input={() => filterCutoffChange(filterCutoffVal)}
            on:change={() => filterCutoffChange(filterCutoffVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="20"
          max="20000"
          step="1"
          bind:value={filterCutoffVal}
          on:change={() => filterCutoffChange(filterCutoffVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Resonance</div>
        <div id="filterQKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="10"
            step="1"
            bind:value={filterQVal}
            on:input={() => filterQChange(filterQVal)}
            on:change={() => filterQChange(filterQVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="10"
          step="1"
          bind:value={filterQVal}
          on:change={() => filterQChange(filterQVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Amount</div>
        <div id="filterAmountKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="20"
            max="20000"
            step="1"
            bind:value={filterAmountVal}
            on:input={() => filterAmountChange(filterAmountVal)}
            on:change={() => filterAmountChange(filterAmountVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="20"
          max="20000"
          step="1"
          bind:value={filterAmountVal}
          on:change={() => filterAmountChange(filterAmountVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Attack</div>
        <div id="filterEnvelopeAttackKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="4"
            step="0.01"
            bind:value={filterEnvelopeAttackVal}
            on:input={() => filterEnvelopeAttackChange(filterEnvelopeAttackVal)}
            on:change={() => filterEnvelopeAttackChange(filterEnvelopeAttackVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="4"
          step="0.01"
          bind:value={filterEnvelopeAttackVal}
          on:change={() => filterEnvelopeAttackChange(filterEnvelopeAttackVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Decay</div>
        <div id="filterEnvelopeDecayKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="4"
            step="0.01"
            bind:value={filterEnvelopeDecayVal}
            on:input={() => filterEnvelopeDecayChange(filterEnvelopeDecayVal)}
            on:change={() => filterEnvelopeDecayChange(filterEnvelopeDecayVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="4"
          step="0.01"
          bind:value={filterEnvelopeDecayVal}
          on:change={() => filterEnvelopeDecayChange(filterEnvelopeDecayVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Sustain</div>
        <div id="filterEnvelopeSustainKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={filterEnvelopeSustainVal}
            on:input={() => filterEnvelopeSustainChange(filterEnvelopeSustainVal)}
            on:change={() => filterEnvelopeSustainChange(filterEnvelopeSustainVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="1"
          step="0.01"
          bind:value={filterEnvelopeSustainVal}
          on:change={() => filterEnvelopeSustainChange(filterEnvelopeSustainVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Release</div>
        <div id="filterEnvelopeReleaseKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0.01"
            max="4"
            step="0.01"
            bind:value={filterEnvelopeReleaseVal}
            on:input={() => filterEnvelopeReleaseChange(filterEnvelopeReleaseVal)}
            on:change={() => filterEnvelopeReleaseChange(filterEnvelopeReleaseVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0.01"
          max="4"
          step="0.01"
          bind:value={filterEnvelopeReleaseVal}
          on:change={() => filterEnvelopeReleaseChange(filterEnvelopeReleaseVal)} />
      </div>
    </div>

  </div>

  <div class="border-2 rounded mb-4">
    <div class="dark:text-white text-center">Amplifier</div>
    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Attack</div>
        <div id="ampEnvelopeAttackKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="4"
            step="0.01"
            bind:value={ampEnvelopeAttackVal}
            on:input={() => ampEnvelopeAttackChange(ampEnvelopeAttackVal)}
            on:change={() => ampEnvelopeAttackChange(ampEnvelopeAttackVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="4"
          step="0.01"
          bind:value={ampEnvelopeAttackVal}
          on:change={() => ampEnvelopeAttackChange(ampEnvelopeAttackVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Decay</div>
        <div id="ampEnvelopeDecayKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="4"
            step="0.01"
            bind:value={ampEnvelopeDecayVal}
            on:input={() => ampEnvelopeDecayChange(ampEnvelopeDecayVal)}
            on:change={() => ampEnvelopeDecayChange(ampEnvelopeDecayVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="4"
          step="0.01"
          bind:value={ampEnvelopeDecayVal}
          on:change={() => ampEnvelopeDecayChange(ampEnvelopeDecayVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Sustain</div>
        <div id="ampEnvelopeSustainKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={ampEnvelopeSustainVal}
            on:input={() => ampEnvelopeSustainChange(ampEnvelopeSustainVal)}
            on:change={() => ampEnvelopeSustainChange(ampEnvelopeSustainVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0"
          max="1"
          step="0.01"
          bind:value={ampEnvelopeSustainVal}
          on:change={() => ampEnvelopeSustainChange(ampEnvelopeSustainVal)} />
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="dark:text-white">Release</div>
        <div id="ampEnvelopeReleaseKnob" class="relative h-12 w-12">
          <input
            class="relative z-10 opacity-0 transform -rotate-90 h-12 w-12
            mx-auto"
            type="range"
            min="0.01"
            max="4"
            step="0.01"
            bind:value={ampEnvelopeReleaseVal}
            on:input={() => ampEnvelopeReleaseChange(ampEnvelopeReleaseVal)}
            on:change={() => ampEnvelopeReleaseChange(ampEnvelopeReleaseVal)} />
          <div
            class="absolute z-0 top-0 h-12 w-12 left-0 bg-light-blue-400
            border-4 border-gray-400 rounded-full box-border range-knob" />
        </div>
        <input
          class="dark:text-white dark:bg-dark-gray-900 text-center
          focus:outline-none"
          type="number"
          min="0.01"
          max="4"
          step="0.01"
          bind:value={ampEnvelopeReleaseVal}
          on:change={() => ampEnvelopeReleaseChange(ampEnvelopeReleaseVal)} />
      </div>
    </div>

  </div>

  <div class="border-2 rounded flex flex-row items-center justify-center p-4">
    <button
      on:mousedown={() => {
        OscA.frequency.value = 440;
        OscB.frequency.value = 440;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 440;
        OscB.frequency.value = 440;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      A
      <small>4</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 466.16;
        OscB.frequency.value = 466.16;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 466.16;
        OscB.frequency.value = 466.16;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      A#
      <small>4</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 493.88;
        OscB.frequency.value = 493.88;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 493.88;
        OscB.frequency.value = 493.88;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      B
      <small>4</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 523.25;
        OscB.frequency.value = 523.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 523.25;
        OscB.frequency.value = 523.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      C
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 554.37;
        OscB.frequency.value = 554.37;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 554.37;
        OscB.frequency.value = 554.37;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      C#
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 587.33;
        OscB.frequency.value = 587.33;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 587.33;
        OscB.frequency.value = 587.33;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      D
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 622.25;
        OscB.frequency.value = 622.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 622.25;
        OscB.frequency.value = 622.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      D#
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 659.25;
        OscB.frequency.value = 659.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 659.25;
        OscB.frequency.value = 659.25;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      E
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 698.46;
        OscB.frequency.value = 698.46;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 698.46;
        OscB.frequency.value = 698.46;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      F
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 739.99;
        OscB.frequency.value = 739.99;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 739.99;
        OscB.frequency.value = 739.99;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      F#
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 783.99;
        OscB.frequency.value = 783.99;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 783.99;
        OscB.frequency.value = 783.99;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      G
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 830.61;
        OscB.frequency.value = 830.61;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 830.61;
        OscB.frequency.value = 830.61;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      G#
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 880.0;
        OscB.frequency.value = 880.0;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 880.0;
        OscB.frequency.value = 880.0;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      A
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 932.33;
        OscB.frequency.value = 932.33;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 932.33;
        OscB.frequency.value = 932.33;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="text-white border-2 p-2 rounded hover:bg-gray-500 m-1 h-24
      black-keys bg-black z-10">
      A#
      <small>5</small>
    </button>
    <button
      on:mousedown={() => {
        OscA.frequency.value = 987.77;
        OscB.frequency.value = 987.77;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:mouseup={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      on:touchstart={() => {
        OscA.frequency.value = 987.77;
        OscB.frequency.value = 987.77;
        OscA.start();
        OscB.start();
        ScaledEnvelope.triggerAttack();
        Amp.triggerAttack();
      }}
      on:touchend={() => {
        ScaledEnvelope.triggerRelease();
        Amp.triggerRelease();
      }}
      class="dark:text-white border-2 p-4 rounded hover:bg-gray-500 m-1 h-48">
      B
      <small>5</small>
    </button>
  </div>

</div>

<svelte:window
  on:keydown={event => handleKeyDown(event)}
  on:keyup={event => handleKeyUp(event)} />
