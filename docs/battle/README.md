# Speed Gap Battle: facilitator pack

How the Battle build was made, and its answer key. Running the Battle on your own? Do it first,
then read [`answer-key.md`](answer-key.md): these files give the planted bugs away. Running it for
your own group? The prompts below rebuild the new app version, and the timeline is how the live
day ran it.

| File | What it is | When |
| --- | --- | --- |
| [`lovable-prompts.md`](lovable-prompts.md) | Remix Foodora, then three prompts — one per feature, each with a planted bug | Build before Thursday |
| [`answer-key.md`](answer-key.md) | The three planted bugs, how to reproduce each, and how to score Accuracy | Keep private; read at the debrief |
| [`spec/battle/`](../../spec/battle/) | FD-09 … FD-11, written like the main spec | Merged at 15:13 from this branch |

## Timeline

1. **Today / tomorrow:** remix Foodora as `foodora-new`, paste the three prompts. Do **not** publish.
   Ask Claude to verify the build in Lovable's preview.
2. **Thursday lunch (12:00–13:00):** publish `foodora-new` to `foodora-new.lovable.app`.
3. **15:13:** push `battle/reveal` and merge its first commit (the stories).
4. **15:15:** reveal slide "3 new features, one new build". Teams `git pull` and run their suite
   with `FOODORA_URL=https://foodora-new.lovable.app`.
5. **16:00 debrief:** open `answer-key.md`. Which suites caught which planted bug?

The original `foodora.lovable.app` never changes, so the morning exhibits keep working.
