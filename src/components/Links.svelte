<script>
  import { push } from "svelte-spa-router";
</script>

<div class="pt-24">
  <div class="w-full max-w-screen-sm mx-auto">
    <div
      on:click={() => push('/posts/parallel-compression')}
      class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/z__6D7KbX-k/1600x900"
        alt=":(" />
      <div
        class="dark:text-white absolute bottom-0 bg-black-alpha-70 w-full p-4
        font-hairline text-4xl">
        Parallel Compression
      </div>
    </div>
  </div>

  <hr class="w-90p mx-auto my-8 border-gray-400" />

  <div class="w-full max-w-screen-sm mx-auto">
    <div
      on:click={() => push('/posts/parallel-compression')}
      class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/9bLhuTk4TJs/1600x900"
        alt=":(" />
      <div
        class="dark:text-white absolute bottom-0 bg-black-alpha-70 w-full p-4
        font-hairline text-4xl">
        Metering and RMS
      </div>
    </div>
  </div>

  <hr class="w-90p mx-auto my-8 border-gray-400" />

  <div class="w-full max-w-screen-sm mx-auto">
    <div on:click={() => push('/posts/synth')} class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/5AlEtKAqTls/1600x900"
        alt=":(" />
      <div
        class="dark:text-white absolute bottom-0 bg-black-alpha-70 w-full p-4
        font-hairline text-4xl">
        Synths
      </div>
    </div>
  </div>
</div>
