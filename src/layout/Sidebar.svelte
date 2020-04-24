<script>
  import { fly } from "svelte/transition";
  import { darkMode } from "../stores/darkMode.js";
  import { push } from "svelte-spa-router";

  export let show = false;
  export let sidebarToggle;
</script>

{#if show}
  <button
    class="fixed top-0 left-0 w-full h-full bg-black-alpha-40 cursor-default
    z-20"
    on:click={() => sidebarToggle()} />
  <nav
    class="fixed flex flex-col top-0 left-0 h-full py-4 border-r bg-white
    dark:bg-gray-900 z-30 overflow-y-auto w-56 shadow"
    transition:fly={{ x: -250, opacity: 1, duration: 300 }}>
    {#if $darkMode}
      <button
        class="w-full p-8 dark:text-white focus:outline-none border-b
        border-gray-300"
        on:click={() => darkMode.turnOff()}>
        <i
          class="material-icons dark:text-white flex items-center justify-center">
          brightness_7
        </i>
      </button>
    {:else}
      <button
        class="w-full p-8 dark:text-white focus:outline-none border-b
        border-gray-700"
        on:click={() => darkMode.turnOn()}>
        <i
          class="material-icons dark:text-white flex items-center justify-center">
          brightness_4
        </i>
      </button>
    {/if}
    <button
      class={`w-full p-4 dark:text-white focus:outline-none transition-colors duration-300 ease-in-out ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
      on:click={() => {
        push('/');
        sidebarToggle();
      }}>
      Home
    </button>
    <button
      class={`w-full p-4 dark:text-white focus:outline-none transition-colors duration-300 ease-in-out ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
      on:click={() => {
        push('/posts');
        sidebarToggle();
      }}>
      Posts
    </button>
  </nav>
{/if}
