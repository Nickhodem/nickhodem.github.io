---
title: VLM Explorer: An Interactive Reference for Vision-Language Model Architecture
date: 2026-07-28
excerpt: An interactive guide to 50+ vision-language models, their architectures, capabilities, and trade-offs.
tags: vision-language models, computer vision, AI research, interactive tools
readingTime: 5 min read
---


[Link: VLM Explorer](/vlm-explorer/)


I've always loved getting to know the design choices behind models: why an architecture is assembled the way it is, what each component contributes, and how one idea evolves into the next. Vision-language models make that especially rewarding to explore. The landscape moves fast, with dozens of models spanning very different task families, and most summaries either stay too high-level ("CLIP is a dual-encoder model") or go straight into paper-level math without a useful middle ground.

So I built VLM Explorer: a single-file interactive reference covering 50+ VLMs across 9 categories, designed to sit at that middle layer between "what does this model do" and "how does it actually work."

---

## What it covers

The explorer organises models into nine task families: image–text retrieval, visual QA and reasoning, image captioning, grounded understanding, image generation, document understanding, video understanding, agentic and embodied AI, and image and video segmentation. Within each category, clicking any model opens a detail page with:

- **An architecture diagram** — interactive, clickable blocks where each component explains itself. Not a static image: every node has a detail panel covering what it does, its dimensions, how it relates to the rest of the model, and what makes it distinct from similar components in other architectures.
- **Novelty and limitations** — what the paper actually contributed versus the prior state, and where the model genuinely falls short.
- **Availability and licensing** — whether weights are public, whether commercial use is permitted, and under which license.
- **Parameter counts** — total parameters with a component-level breakdown (e.g. vision encoder: 307M + MLP bridge: 33M + LLM: 13B).
- **A publication timeline** — all 50 models placed on a year × category grid so you can see how the field evolved and which ideas were concurrent versus sequential.

---

## Why architecture diagrams, not just descriptions

Reading that LLaVA-1.5 "uses a two-layer MLP connector" is much less useful than seeing a diagram that shows *why*. The LLaVA entry, for example, makes the problem concrete: CLIP outputs 1024-dimensional vectors shaped by contrastive training; the LLM expects 4096-dimensional vectors shaped by next-token prediction. These are different geometries. LLaVA v1 bridged them with a single linear map — which can only rotate and scale, not learn a curved alignment. LLaVA-1.5 swapped in a two-layer MLP with a GELU nonlinearity. That is the entire contribution, and the diagram makes it immediately visible: one extra box with a nonlinearity between two linear layers, and it doubles benchmark performance.

The same applies to Grounding DINO's feature enhancer (bidirectional cross-attention that fuses language into visual features *before* any object queries are formed, rather than comparing embeddings post-hoc), LocateAnything's dual NTP + PBD output heads (two parallel decoding streams sharing context but predicting through different attention masks), and CLIP's symmetric contrastive loss across a 32,768-sample batch. Architecture matters, and diagrams are the fastest way to see it.

---

## Using it to choose a model

Different tasks need fundamentally different architectures, and the categories are a reasonable starting point for scoping the decision:

**You need to find objects described in natural language** → Grounded understanding. Grounding DINO if you need strong open-vocabulary detection at reasonable speed; YOLO-World if you need real-time throughput; LocateAnything if you need the fastest generative grounding with parallel box decoding. GLaMM if you need pixel-level masks alongside the grounding.

**You need to answer questions about images** → Visual QA. If you need open weights with near-frontier performance, InternVL-2 and Qwen2-VL are the current leaders. If you need something fully transparent and reproducible, Idefics3. If you have GPT-4V API access and don't need local weights, it remains a strong general baseline.

**You need to parse documents** → Document understanding. GOT-OCR 2.0 for end-to-end format-aware OCR (LaTeX, tables, markdown). Nougat specifically for academic PDFs. InternVL-2 for high-resolution document QA with its dynamic tiling approach.

**You need segmentation** → SAM 2 for interactive or video segmentation; Mask2Former or OneFormer for semantic/panoptic; OMG-Seg if you want a single model across ten segmentation task types.

**You need embeddings for retrieval** → SigLIP or OpenCLIP for open-source, Apache-licensed options. EVA-CLIP if you can afford the model size and need maximum embedding quality.

The licensing and availability badges on each model page make the commercial-vs-research question immediate: green badge means permissive license (Apache 2.0, MIT), amber means restrictions apply, red means research-only or proprietary API.

---

## What's in there

- **50 models** across 9 categories, 2021–2026
- Custom architecture renderers for LLaVA v1/1.5 (two-column with visible projection bridge), Grounding DINO (two-stream fusion), and LocateAnything (two input towers, shared decoder context, dual output heads)
- Light and dark mode, timeline view with per-category filtering, and clickable model pills throughout
- Every model links directly to its arXiv paper and HuggingFace page where available

The whole thing is a single self-contained HTML file — no dependencies, no backend, no build step. Open it in a browser and it works.

---

The field is moving fast enough that any static reference goes stale quickly, but the architectural patterns — dual encoders, MLP bridges, cross-attention fusion, parallel decoding — are stable enough to be worth understanding deeply. Those patterns are what the explorer is really about.
