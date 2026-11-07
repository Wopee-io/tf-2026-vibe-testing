<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// The new stack, built up one click at a time (the slide sets `clicks: 4`):
// 0 you → agent · 1 SKILL.md · 2 CLI road to the browser · 3 MCP road · 4 the testing agent.
// Badges number the four pieces: 1 agent, 2 SKILL.md, 3 CLI, 4 MCP.
const { $clicks } = useSlideContext()
const at = (step: number) => computed(() => $clicks.value >= step)
const skill = at(1)
const cli = at(2)
const mcp = at(3)
const wopee = at(4)
</script>

<template>
  <svg class="wp-stack" viewBox="0 0 880 350" role="img" aria-label="The new stack: you give a coding agent your intent; it uses SKILL.md know-how and reaches the browser through the Playwright CLI or MCP; a testing agent works on its own or as an MCP tool.">
    <defs>
      <marker id="wp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#000" />
      </marker>
      <clipPath id="wp-shot"><rect x="542" y="118" width="326" height="120" rx="4" /></clipPath>
    </defs>

    <!-- 0 · you → agent -->
    <g>
      <rect x="0" y="0" width="230" height="60" rx="6" fill="#f2f2f2" />
      <rect x="0" y="0" width="230" height="5" fill="#ffcc00" />
      <text x="16" y="27" class="k">YOU</text>
      <text x="16" y="48" class="d">your intent, in one sentence</text>
      <line x1="115" y1="60" x2="115" y2="98" class="arrow" marker-end="url(#wp-arrow)" />

      <rect x="0" y="100" width="230" height="112" rx="6" fill="#000" />
      <text x="16" y="128" class="k y">CODING AGENT</text>
      <g class="badge"><circle cx="210" cy="120" r="17" /><text x="210" y="126" text-anchor="middle">1</text></g>
      <text x="16" y="156" class="t w">GitHub Copilot</text>
      <text x="16" y="178" class="t w">Claude Code · Cursor</text>
      <text x="16" y="200" class="d g">writes, runs and fixes tests</text>
    </g>

    <!-- 1 · SKILL.md -->
    <g class="step" :class="{ on: skill }">
      <line x1="115" y1="268" x2="115" y2="216" class="arrow" marker-end="url(#wp-arrow)" />
      <rect x="0" y="270" width="230" height="78" rx="6" fill="#ffcc00" />
      <text x="16" y="298" class="t">SKILL.md</text>
      <g class="badge"><circle cx="210" cy="290" r="17" /><text x="210" y="296" text-anchor="middle">2</text></g>
      <text x="16" y="320" class="d">know-how the agent loads</text>
      <text x="16" y="338" class="d">only when a task needs it</text>
    </g>

    <!-- the browser, reached from step 2 -->
    <g class="step" :class="{ on: cli }">
      <rect x="530" y="80" width="350" height="170" rx="10" fill="#fff" stroke="#000" stroke-width="3" />
      <rect x="530" y="80" width="350" height="28" rx="10" fill="#000" />
      <rect x="530" y="96" width="350" height="12" fill="#000" />
      <circle cx="548" cy="94" r="5" fill="#ffcc00" />
      <circle cx="564" cy="94" r="5" fill="#ffcc00" />
      <circle cx="580" cy="94" r="5" fill="#ffcc00" />
      <text x="600" y="99" class="d w">BROWSER · foodora.lovable.app</text>
      <image href="/img/foodora.jpg" x="542" y="118" width="326" height="204" preserveAspectRatio="xMidYMin slice" clip-path="url(#wp-shot)" />
    </g>

    <!-- 2 · CLI road -->
    <g class="step" :class="{ on: cli }">
      <line x1="232" y1="130" x2="282" y2="130" class="arrow" />
      <rect x="284" y="104" width="206" height="52" rx="6" fill="#f2f2f2" stroke="#000" stroke-width="2" />
      <text x="298" y="126" class="t s">CLI</text>
      <g class="badge"><circle cx="470" cy="120" r="17" /><text x="470" y="126" text-anchor="middle">3</text></g>
      <text x="298" y="146" class="d">shell commands → files</text>
      <line x1="490" y1="130" x2="526" y2="130" class="arrow" marker-end="url(#wp-arrow)" />
    </g>

    <!-- 3 · MCP road -->
    <g class="step" :class="{ on: mcp }">
      <line x1="232" y1="192" x2="282" y2="192" class="arrow" />
      <rect x="284" y="166" width="206" height="52" rx="6" fill="#f2f2f2" stroke="#000" stroke-width="2" />
      <text x="298" y="188" class="t s">MCP</text>
      <g class="badge"><circle cx="470" cy="182" r="17" /><text x="470" y="188" text-anchor="middle">4</text></g>
      <text x="298" y="208" class="d">tools, always in context</text>
      <line x1="490" y1="192" x2="526" y2="192" class="arrow" marker-end="url(#wp-arrow)" />
    </g>

    <!-- 4 · the testing agent -->
    <g class="step" :class="{ on: wopee }">
      <path d="M385,218 V304 H526" class="arrow dash" fill="none" marker-end="url(#wp-arrow)" />
      <text x="394" y="296" class="d">as an MCP tool</text>
      <rect x="530" y="270" width="350" height="78" rx="6" fill="#000" />
      <image href="/img/wopee-head.png" x="535" y="279" width="62" height="62" />
      <text x="598" y="298" class="k y">TESTING AGENT · Wopee.io</text>
      <text x="598" y="320" class="d w">maps the app, runs regression —</text>
      <text x="598" y="338" class="d w">on its own, or called by your agent</text>
      <line x1="720" y1="268" x2="720" y2="254" class="arrow" marker-end="url(#wp-arrow)" />
    </g>
  </svg>
</template>

<style scoped>
.badge circle {
  fill: #ffcc00;
  stroke: #000;
  stroke-width: 2;
}

.badge text {
  font-size: 19px;
  font-weight: 700;
  fill: #000;
}

.wp-stack {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  font-family: 'Rubik', sans-serif;
}

.k {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.t {
  font-size: 19px;
  font-weight: 700;
}

.t.s {
  font-size: 17px;
}

.d {
  font-size: 14px;
  fill: #333;
}

.w {
  fill: #fff;
}

.g {
  fill: #cfcfcf;
}

.y {
  fill: #ffcc00;
}

.arrow {
  stroke: #000;
  stroke-width: 3;
}

.dash {
  stroke-dasharray: 7 6;
}

.step {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.step.on {
  opacity: 1;
  transform: none;
}
</style>
