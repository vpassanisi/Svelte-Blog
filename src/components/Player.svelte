<script>
  import Tone from "tone";
  import { onMount } from "svelte";
  import { darkMode } from "../stores/darkMode.js";

  let files;
  let url;
  let player;
  let loading = false;
  let range = 50;
  let smoothing = 0.9;
  let volume = new Tone.Volume(-range);
  let meterL = new Tone.Meter(0.9);
  let meterR = new Tone.Meter(0.9);
  let split = new Tone.Split();
  let merge = new Tone.Merge();
  let rmsL = -Infinity;
  let rmsR = -Infinity;
  let meterCanvas;
  let meterContext;
  let request;

  const updateLoop = () => {
    request = requestAnimationFrame(updateLoop);
    volume.volume.value = -Math.pow(range, 2.5) / 1000;
    meterL.smoothing = parseFloat(Math.log(smoothing) / 10).toFixed(3);
    meterR.smoothing = parseFloat(Math.log(smoothing) / 10).toFixed(3);

    rmsL = meterL.getLevel();
    if (rmsL < -100) rmsL = -100;
    const { width: w, height: h } = meterCanvas;
    meterContext.clearRect(0, 0, w / 2 - 1, h);
    meterContext.fillStyle = $darkMode ? "white" : "black";
    const LeftY = Math.abs(rmsL * (h / 100));
    meterContext.fillRect(0, LeftY, w / 2 - 1, h - LeftY);

    rmsR = meterR.getLevel();
    if (rmsR < -100) rmsR = -100;
    meterContext.clearRect(w - w / 2 + 1, 0, w / 2, h);
    meterContext.fillStyle = $darkMode ? "white" : "black";
    const RightY = Math.abs(rmsR * (h / 100));
    meterContext.fillRect(w - w / 2 + 1, RightY, w / 2, h - RightY);
  };

  const startAnimationLoop = () => {
    requestAnimationFrame(updateLoop);
  };

  const stopAnimationLoop = () => {
    cancelAnimationFrame(request);
  };

  const play = () => {
    player.start();
  };

  onMount(() => {
    meterCanvas = document.getElementById("RMS");
    meterContext = meterCanvas.getContext("2d");
  });
</script>

<div
  class="w-90p mx-auto max-w-screen-lg flex flex-col items-center justify-center
  border-2 rounded py-4 px-2">
  <div class="flex flex-wrap items-center justify-center">
    <div
      class="flex flex-row items-center justify-center border-2 rounded h-12
      px-2 mr-2 mb-2">
      <input
        bind:files
        type="file"
        accept="audio/*"
        class="dark:text-white"
        on:change={() => {
          loading = true;
          url = URL.createObjectURL(files[0]);
          player = new Tone.Player(url, () => (loading = false));
          player.fan(split);
          split.left.connect(meterL);
          split.right.connect(meterR);
          meterL.connect(merge.left);
          meterR.connect(merge.right);
          merge.chain(volume, Tone.Master);
        }} />
    </div>
    <button
      on:click={() => {
        play();
        startAnimationLoop();
      }}
      class={`dark:text-white border-2 rounded h-12 px-4 ${$darkMode ? 'hover:bg-dark-gray-800' : 'hover:bg-gray-200'}
      mr-2 focus:outline-none mb-2`}>
      {#if loading}WAIT{:else}Play{/if}
    </button>
    <button
      on:click={() => {
        player.stop();
      }}
      class={`dark:text-white border-2 rounded h-12 px-4 ${$darkMode ? 'hover:bg-dark-gray-800' : 'hover:bg-gray-200'} 
      mr-2 focus:outline-none mb-2`}>
      STOP
    </button>
    <div
      class="flex flex-row items-center justify-center border-2 rounded h-12
      px-2 mb-2">
      <span class="dark:text-white mr-2">Volume</span>
      <input
        class="transform rotate-180"
        bind:value={range}
        min="0"
        max="100"
        type="range" />
    </div>
  </div>

  <div class="p-4 inline-block">
    <canvas id="RMS" height="800px" class="border-2" />
    <div class="flex mb-2">
      <div class="dark:text-white w-1/2 text-center">{rmsL.toPrecision(3)}</div>
      <div class="dark:text-white w-1/2 text-center">{rmsR.toPrecision(3)}</div>
    </div>
    <div class="border-2 rounded p-2">
      <span class="dark:text-white">Smoothing:</span>
      <input
        class="w-full"
        bind:value={smoothing}
        min="0"
        max="21700"
        type="range" />
    </div>
  </div>
</div>
