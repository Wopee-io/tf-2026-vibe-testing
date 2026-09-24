---
theme: default
title: 'Team 6 · AI-assisted test suite for Foodora'
info: |
  Tesena Fest 2026 · Vibe Testing Lab · Speed Gap Battle
  Team 6 — Coding agent + Playwright CLI
layout: cover
aspectRatio: 16/9
canvasWidth: 980
colorSchema: light
transition: fade
---

<div class="text-7xl font-extrabold tracking-tight">Team 6</div>

<div class="rule" style="width:160px;height:8px"></div>

## An AI-assisted test suite for Foodora

<div class="text-2xl mt-2 opacity-70">Coding agent <b>+ Playwright CLI</b></div>

<div class="stats mt-12">
  <div class="stat"><div class="n">8</div><div class="k">stories covered</div></div>
  <div class="stat"><div class="n">59</div><div class="k">tests, one per rule</div></div>
  <div class="stat"><div class="n">12</div><div class="k">findings</div></div>
  <div class="stat"><div class="n">1</div><div class="k">skill, runs cold</div></div>
</div>

<!--
0:00 — Say the four numbers. Nothing else. Then move on.
-->

---
layout: two-cols
layoutClass: gap-10
---

# What we built

<div class="rule"></div>

| Story | Tests | Red |
| --- | ---: | ---: |
| FD-01 Browse restaurants | 6 | 1 |
| FD-02 Search and filter | 8 | 1 |
| FD-03 Restaurant menu | 7 | 1 |
| FD-04 Customise a dish | 7 | 2 |
| FD-05 Cart | 13 | 3 |
| FD-06 Checkout | 8 | 2 |
| FD-07 Confirmation and tracking | 8 | 2 |
| FD-08 Page not found | 2 | — |

::right::

<div class="mt-24"></div>

<div class="box plain">
<h3>Shape of the suite</h3>
One spec file per story, plus <code>tests/helpers.ts</code>. Every test is named
<code>FD-xx · the rule</code>.
<br><br>
A test that checks five rules stops at the first failure — the other four are never checked.
</div>

<div class="box ok mt-4">
<h3>The run</h3>
<div class="text-2xl font-extrabold">47 passed · <span style="color:var(--red)">12 failed</span></div>
</div>

<div class="mt-6 text-2xl font-bold leading-snug">
Every red test is a <span style="color:var(--red)">finding</span>,<br>not a broken test.
</div>

<!--
0:20 — The last line is the whole deck. Pause after it.
-->

---

# How we worked

<div class="rule"></div>

<div class="steps">
  <div class="step"><div class="n">1</div><div class="t">List the rules</div><div class="s">from the spec, before the browser opens</div></div>
  <div class="step"><div class="n">2</div><div class="t">Look</div><div class="s"><code>playwright cli snapshot</code> — roles and names</div></div>
  <div class="step"><div class="n">3</div><div class="t">One test per rule</div><div class="s">named after its <code>FD-xx</code></div></div>
  <div class="step"><div class="n">4</div><div class="t">Run</div><div class="s">read every single failure</div></div>
  <div class="step hi"><div class="n">5</div><div class="t">Sort the failures</div><div class="s">test wrong → fix it<br><b>build wrong → leave it red</b></div></div>
</div>

<div class="pair mt-10">
  <div class="box">
    <h3>Where locators come from</h3>
    The accessibility snapshot — the roles and names a screen reader would use.
    <b>No invented <code>data-testid</code>.</b>
  </div>
  <div class="box">
    <h3>Where expected results come from</h3>
    <code>spec/foodora-spec.md</code> only — never from what the build happens to show.
  </div>
</div>

<!--
0:45 — Step 5 is the one nobody else will say out loud. Lean on it.
-->

---

# One finding, live

<div class="rule"></div>

<div class="text-xl mb-6">
<b>FD-06</b> · <i>Place Order only places the order when every required field is filled in.</i>
</div>

<div class="pair">
  <div class="box plain">
    <h3>What we did</h3>
    <ol>
      <li>Opened <code>/checkout</code> with one dish in the cart</li>
      <li>Left <b>every</b> field blank</li>
      <li>Pressed <b>Place Order</b></li>
    </ol>
  </div>
  <div class="box bad">
    <h3>What happened</h3>
    <div class="text-3xl font-extrabold">Order Confirmed!</div>
    <div class="text-lg mt-1"><code>Order #FDR-OE08AB</code></div>
    <div class="mt-3">No name. No address. No phone number.</div>
  </div>
</div>

<div class="foot">
teams/team-6/tests/fd-06-checkout.spec.ts → <i>FD-06 · Place Order with an empty form places no order</i>
</div>

<!--
1:00 — Do it in the browser if the wifi holds, on the slide if it does not.
-->

---

# Twelve rules the build breaks

<div class="rule"></div>

<table class="findings">
<tbody>
<tr><td>FD-01</td><td>a restaurant that does not deliver here cannot be opened</td><td>it opens normally</td></tr>
<tr><td>FD-02</td><td>a search and a cuisine chip apply together</td><td>the chip is ignored</td></tr>
<tr><td>FD-03</td><td>every button has an accessible name</td><td>quick-add, stepper, remove have none</td></tr>
<tr><td>FD-04</td><td>add-ons can be picked in any combination</td><td>radio buttons — Bacon clears Extra Cheese</td></tr>
<tr><td>FD-04</td><td>the cart is reachable from the dish page</td><td>no cart button there</td></tr>
<tr><td>FD-05</td><td>Free delivery means $0.00</td><td>advertised Free, the cart charges $2.99</td></tr>
<tr><td>FD-05</td><td>a 20% promotion shows as its own line</td><td>no discount at all</td></tr>
<tr><td>FD-05</td><td>the cart survives a page reload</td><td>it empties</td></tr>
<tr><td>FD-06</td><td>an empty form places no order</td><td>the order goes through</td></tr>
<tr><td>FD-06</td><td>a missing required field shows a message</td><td>silence</td></tr>
<tr><td>FD-07</td><td>a fake order number has no tracking page</td><td>it renders one</td></tr>
<tr><td>FD-07</td><td>total paid cannot be edited in the address</td><td><code>?total=1.00</code> rewrites it</td></tr>
</tbody>
</table>

<!--
1:30 — Do not read this. Point at the last four rows, then move on.
-->

---
layout: center
---

# Three of them are money and privacy

<div class="big3 mt-10">
  <div class="c"><b>A blank address</b><span>An order goes through with no name, no street, no phone.</span></div>
  <div class="c"><b>A stranger's order</b><span>Any invented order number renders a tracking page.</span></div>
  <div class="c"><b>A rewritten total</b><span>The amount paid can be changed from the address bar.</span></div>
</div>

<div class="mt-10 text-lg opacity-55">The other nine are real too. These three ship money out of the door.</div>

<!--
1:50 — Slow down. This is the Accuracy vote.
-->

---

# The skill

<div class="rule"></div>

<div class="text-base opacity-65 mb-4">
<code>.github/skills/team-6-spec-to-test/SKILL.md</code> — <i>turn one story into one spec file</i>
</div>

<div class="quote">
Sort each failure into <i>the test is wrong</i> — fix it — or <i>the build is wrong</i> — <b>leave it red</b>.
</div>

<div class="pair mt-8">
  <div class="box">
    <h3>Carries this app's traps</h3>
    <ul>
      <li>icon-only buttons have no accessible name</li>
      <li>the header is <code>aria-hidden</code> while the cart is open</li>
      <li><code>Total</code> matches inside <code>Subtotal</code></li>
    </ul>
  </div>
  <div class="box y">
    <h3>The shape moves to any app</h3>
    List the rules → look → one test per rule → run → sort the failures.
    <br><br>
    Only the spec paths and those three traps are Foodora-specific.
  </div>
</div>

<!--
2:10 — Reusability vote. Show a cold run only if there is time left.
-->

---
layout: center
class: text-center
---

# What we would do next

<div class="text-3xl mt-8 leading-relaxed">
<code>FD-09</code> … <code>FD-11</code> through the <b>same skill</b>.
</div>

<div class="text-2xl mt-4 opacity-65">One sentence. No new prompt engineering.</div>

<div class="mt-20 text-base opacity-45">
Team 6 · <code>teams/team-6/</code> · Wopee-io pull request #78
</div>

<!--
2:40 — Stop here. Leave 20 seconds for the room to raise hands.
-->
