<script lang="ts">
  import { onMount } from 'svelte';

  import ChessBoard from './ChessBoard.svelte';
  import ky from 'ky';

  const API_BASE = import.meta.env.VITE_API_BASE;
  console.log('API_BASE', API_BASE);

  let health: any = null;

  onMount(async () => {
    health = await ky.get(`${API_BASE}/health`).json();
  })
</script>

<main>
  <ChessBoard />
  <p>API health check: {health?.status ?? "..."}</p>
  <p>Python version: {health?.python_version ?? "..."}</p>
</main>

<style>
</style>
