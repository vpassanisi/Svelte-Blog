<script>
  import * as d3 from "d3";
  import Tone from "tone";
  import { onMount } from "svelte";
  import { darkMode } from "../stores/darkMode.js";

  const svgHeight = 600;
  const svgWidth = 200;
  const barPadding = 1;
  const scaleHeight = 600;
  const scaleWidth = 5;
  const fftHeight = 600;
  const fftWidth = 1024;

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
  let rmsL = -60;
  let rmsR = -60;
  let request;
  let dataArr = [svgHeight, svgHeight];
  let graph;
  let testVar = 50;
  let scale;
  let fft;
  let bin = [8192, 8, 4];
  let fftNode = new Tone.Analyser("fft", bin[0]);
  let fftArr = [];

  while (fftArr.length < bin[0]) {
    fftArr.push(0);
  }

  const calcSmoothing = val => {
    const minp = 0;
    const maxp = 100;

    const minv = 0;
    const maxv = Math.log(100);

    const scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (val - minp));
  };

  const toLog = (value, min, max) => {
    const exp = (value - min) / (max - min);
    return min * Math.pow(max / min, exp);
  };

  const updateLoop = () => {
    request = requestAnimationFrame(updateLoop);

    volume.volume.value = -Math.pow(range, 2.5) / 1000;
    meterL.smoothing = 1 - calcSmoothing(smoothing) / 100;
    meterR.smoothing = 1 - calcSmoothing(smoothing) / 100;
    fftNode.smoothing = 1 - calcSmoothing(smoothing) / 100;
    fftNode.size = bin[0];

    rmsL = meterL.getLevel();
    if (rmsL < -60) rmsL = -60;

    rmsR = meterR.getLevel();
    if (rmsR < -60) rmsR = -60;

    dataArr = [Math.abs(rmsL), Math.abs(rmsR)];

    graph
      .selectAll("rect")
      .data(dataArr)
      .attr("y", d => d * (svgHeight / 60))
      .attr("height", d => svgHeight - d * (svgHeight / 60))
      .style("fill", d => ($darkMode ? "white" : "gray"));

    scale.selectAll("rect").style("fill", d => ($darkMode ? "white" : "gray"));

    const arr = fftNode.getValue();
    let logArr = [];
    for (let i = bin[2]; i < arr.length; i += bin[1]) {
      const logindex = toLog(i, bin[2], bin[0]);
      const low = Math.floor(logindex);
      const high = Math.ceil(logindex);
      const lv = Math.abs(arr[low]);
      const hv = Math.abs(arr[high]);
      const w = (logindex - low) / (high - low);
      let v = lv + (hv - lv) * w;
      if (isNaN(v)) v = 100;
      logArr.push(v);
    }

    fft
      .selectAll("rect")
      .data(logArr)
      .attr("y", d => {
        if (d < -100) d = -100;
        return Math.abs(d) * (svgHeight / 100);
      })
      .attr("x", (d, i) => i * (fftWidth / logArr.length))
      .attr("width", fftWidth / logArr.length)
      .attr("height", d => {
        if (d < -100) d = 100;
        return Math.abs(fftHeight - Math.abs(d) * (svgHeight / 100));
      })
      .style("fill", d => ($darkMode ? "white" : "gray"));
  };

  const startAnimationLoop = () => {
    requestAnimationFrame(updateLoop);
  };

  const stopAnimationLoop = () => {
    cancelAnimationFrame(request);
  };

  const createSvg = (parent, height, width) => {
    return d3
      .select(parent)
      .append("svg")
      .attr("height", height)
      .attr("width", width);
  };

  onMount(() => {
    graph = createSvg("#graph", svgHeight, svgWidth);
    graph
      .selectAll("rect")
      .data(dataArr)
      .enter()
      .append("rect")
      .attr("width", svgWidth / dataArr.length - barPadding)
      .attr("height", d => svgHeight)
      .attr("x", (d, i) => i * (svgWidth / dataArr.length))
      .attr("y", d => svgHeight);

    scale = createSvg("#scale", scaleHeight, scaleWidth);
    scale
      .selectAll("rect")
      .data([
        0,
        3,
        6,
        9,
        12,
        15,
        18,
        21,
        24,
        27,
        30,
        33,
        36,
        39,
        42,
        45,
        48,
        51,
        54,
        57,
        59.9
      ])
      .enter()
      .append("rect")
      .attr("width", scaleWidth)
      .attr("height", 1)
      .attr("x", 1)
      .attr("y", d => d * (svgHeight / 60))
      .style("fill", d => ($darkMode ? "white" : "gray"));

    fft = createSvg("#FFT", fftHeight, fftWidth);
    fft
      .selectAll("rect")
      .data(fftArr)
      .enter()
      .append("rect");
  });
</script>

<div class="flex flex-col">
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
          merge.fan(volume, fftNode);
          volume.toMaster();
        }} />
    </div>
    <button
      on:click={() => {
        player.start();
        startAnimationLoop();
      }}
      class={`dark:text-white border-2 rounded h-12 px-4 ${$darkMode ? 'hover:bg-dark-gray-800' : 'hover:bg-gray-200'}
      mr-2 focus:outline-none mb-2`}>
      {#if loading}WAIT{:else}Play{/if}
    </button>
    <button
      on:click={() => {
        player.stop();
        stopAnimationLoop();
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
    <!-- <audio
      class="w-64 h-12"
      controls
      src="./Katy-Perry-Never-Really-Over.flac"
      preload="auto" /> -->
  </div>

  <div>
    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-row overflow-x-auto mb-2">
        <div class="border-2 rounded mr-2">
          <div id="FFT" />
        </div>
        <div class="border-2 rounded p-2">
          <div class="flex flex-row">
            <div
              class="dark:text-white flex flex-col items-center justify-between
              -mt-2 -mb-2">
              <small>0</small>
              <small>3</small>
              <small>6</small>
              <small>9</small>
              <small>12</small>
              <small>15</small>
              <small>18</small>
              <small>21</small>
              <small>25</small>
              <small>27</small>
              <small>30</small>
              <small>33</small>
              <small>36</small>
              <small>39</small>
              <small>42</small>
              <small>45</small>
              <small>48</small>
              <small>51</small>
              <small>54</small>
              <small>57</small>
              <small>60</small>
            </div>
            <div id="scale" class="inline-block mx-1" />
            <div id="graph" class="inline-block w-full" />
          </div>
          <div class="flex ml-6">
            <div class="dark:text-white w-1/2 text-center">
              {rmsL.toPrecision(3)}
            </div>
            <div class="dark:text-white w-1/2 text-center">
              {rmsR.toPrecision(3)}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center w-full h-24
      max-w-screen-lg mx-auto">
      <div class="border-2 rounded p-2 mr-2 w-2/4 flex flex-col">
        <span class="dark:text-white">
          Smoothing: {(1 - calcSmoothing(smoothing) / 100).toPrecision(3)}
        </span>
        <input
          class="w-full transform rotate-180"
          bind:value={smoothing}
          min="0"
          max="99"
          type="range" />
      </div>
      <div class="border-2 rounded p-2 flex flex-col w-1/4">
        <div class="dark:text-white">FFT Depth:</div>
        <select id="bin-depth" bind:value={bin}>
          <option value={[1024, 1, 1]}>1024</option>
          <option value={[2048, 2, 1]}>2048</option>
          <option selected="selected" value={[4096, 4, 2]}>4096</option>
          <option value={[8192, 8, 4]}>8192</option>
          <option value={[16384, 16, 8]}>16384</option>
        </select>
      </div>
    </div>
  </div>

  <!-- <button class="border-2 rounded dark:text-white" on:click={() => {}}>
    log
  </button> -->
</div>
