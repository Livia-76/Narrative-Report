import { NarrativeSchema } from './types';

export const COLORS = {
  positive: '#3B8C6E', // Muted Emerald
  negative: '#BE3E3E', // Muted Red
  neutral: '#A8A29E', // Stone 400
  stroke: '#E7E5E4',  // Stone 200
  textMain: '#1C1917',
  textSub: '#57534E',
  editorial: {
    bg: '#FAFAF9', // Stone 50
    text: '#1C1917',
    accent: '#44403C',
    pos: '#3B8C6E',
    neg: '#BE3E3E',
    neutral: '#78716C',
  }
};

export const NARRATIVE_DATA: NarrativeSchema = {
  "meta": {
    "id": "f7302533-e47f-47b4-bc32-04f6e4e06807",
    "question": "What pain points do people have with NotebookLM?",
    "topic": "NotebookLM",
    "takeaway": "NotebookLM is currently a 'Ferrari engine in a go-kart'. Users are addicted to the processing speed but are actively fighting the interface, which deletes their work (no history) and blinds them to data (no charts). It's a brilliant processor, but a failing notebook."
  },
  "sentiment_overall": {
    "neutral": 20,
    "negative": 40,
    "positive": 40
  },
  "themes": [
    {
      "name": "The 'Magic' of Instant Synthesis",
      "count": 45,
      "percentage": 30,
      "sentiment": { "neutral": 10, "negative": 5, "positive": 85 },
      "description": "The 'Anchor Feature' that keeps users returning despite the flaws. The ability to instantly 'ground' AI in massive, messy documents provides a psychological relief from information overload that no other tool currently matches.",
      "keyPhrases": ["magic processing", "grounding", "instant synthesis", "cold start solver"],
      "insights": [
        {
          "insight": "NotebookLM solves the 'Blank Page Syndrome' for researchers by instantly turning static PDFs into interactive dialogues.",
          "verbatim": "It’s a fantastic AI brain for processing data you feed it... NotebookLM is fully conditioned on the documents you supply, which reduces hallucinations.",
          "whyValuable": "Validates the core utility: it's not just a chatbot, it's an 'unblocking' tool for heavy mental lifting."
        }
      ]
    },
    {
      "name": "The 'Black Hole' Paradox",
      "count": 35,
      "percentage": 25,
      "sentiment": { "neutral": 10, "negative": 85, "positive": 5 },
      "description": "A critical blindness. By stripping 100% of charts, graphs, and diagrams during ingestion, NotebookLM effectively 'lobotomizes' scientific and technical papers, rendering it useless for high-stakes STEM work where meaning is visual.",
      "keyPhrases": ["lobotomized pdfs", "black hole", "missing context", "STEM unusable"],
      "insights": [
        {
          "insight": "The tool acts as a 'text-only' filter, aggressively stripping the visual evidence (charts, schematics) that professionals rely on for truth.",
          "verbatim": "NotebookLM remains a black hole of PDF files: They go in, never to be seen again... Any unconventional symbols, images, colors, tables, formulas, and graphs are lost in the ether.",
          "whyValuable": "Exposes a fatal flaw for the 'Pro' market: you cannot research what you cannot see."
        },
        {
          "insight": "The 'Source View' regresses the reading experience to 1990s plain text, forcing users to keep the original PDF open in a separate window.",
          "verbatim": "Sources are mostly formatted in plain text, so you lack the benefits of header formatting... I eventually decided to just use the original OpenStax resources rather than NotebookLM.",
          "whyValuable": "Highlights broken workflow: the tool fails at its namesake function (being a Notebook for your sources)."
        }
      ]
    },
    {
      "name": "The 'Amnesiac Assistant'",
      "count": 30,
      "percentage": 20,
      "sentiment": { "neutral": 20, "negative": 70, "positive": 10 },
      "description": "A profound design failure where the tool treats every session as a blank slate. Users are forced into 'defensive behaviors'—manually copying every good answer to a Google Doc—because a single browser refresh wipes their intellectual progress.",
      "keyPhrases": ["amnesiac ai", "refresh penalty", "data anxiety", "defensive saving"],
      "insights": [
        {
          "insight": "The platform actively punishes iteration. Adding a new source forces a refresh, which deletes the chat history you just built based on the old sources.",
          "verbatim": "The tool forces extra steps and burns another query precisely when I'm correcting a deficiency in its output. I'm technically penalized for refining my research.",
          "whyValuable": "Identifies a 'hostile' user loop: making the model smarter (adding sources) makes the user's context dumber (deleting chat)."
        },
        {
          "insight": "Users feel they are renting intelligence rather than building a second brain.",
          "verbatim": "If I accidentally refresh or close the browser tab, that entire conversation vanishes into the digital ether... It discourages the deep, iterative analysis it's supposed to excel at.",
          "whyValuable": "Clarifies why churn risk is high: users are not building a cumulative asset in the platform."
        }
      ]
    },
    {
      "name": "Brand Promise Mismatch",
      "count": 25,
      "percentage": 15,
      "sentiment": { "neutral": 25, "negative": 60, "positive": 15 },
      "description": "It calls itself a 'Notebook' but behaves like a 'Calculator'. A calculator is great for quick processing, but you don't store your life's work in it. Users want a Notebook (storage, linking, permanence).",
      "keyPhrases": ["calculator not notebook", "missing links", "false advertising"],
      "insights": [
        {
          "insight": "The architecture is built for 'Processing' (Transient), but the branding sells 'Management' (Permanent). This gap creates user frustration.",
          "verbatim": "It’s a fantastic AI brain for processing data you feed it, but it lacks the structural tools required to organize, connect, and visualize that information.",
          "whyValuable": "Strategic Insight: Google must decide if this is a feature (processor) or a product (workspace)."
        }
      ]
    }
  ],
  "sources": [
    {
      "url": "https://xda-developers.com/things-notebooklm-better-improve",
      "title": "3 things I wish NotebookLM did better",
      "snippet": "The tool forces extra steps and burns another query precisely when I'm correcting a deficiency in its output. I'm technically penalized for refining my research.",
      "publishedDate": "2025-09-04"
    },
    {
      "url": "https://www.androidauthority.com/notebooklm-lacks-crucial-feature-3603778/",
      "title": "I can’t believe everyone loves NotebookLM this much when it lacks such a crucial feature",
      "snippet": "NotebookLM remains a black hole of PDF files: They go in, never to be seen again... Any unconventional symbols, images, colors, tables, formulas, and graphs are lost in the ether.",
      "publishedDate": "2025-10-04"
    },
    {
      "url": "https://www.nembal.com/blog/notebooklm_fixes",
      "title": "NotebookLM: UX Improvements",
      "snippet": "If I accidentally refresh or close the browser tab, that entire conversation vanishes into the digital ether...",
      "publishedDate": "2024-10-04"
    },
    {
      "url": "https://www.linkedin.com/posts/llewyn_notebooklm-is-useful-but-its-still-just-activity-7374507040263696384-IdIL",
      "title": "NotebookLM is useful, but it’s still just LLMs deep down.",
      "snippet": "NotebookLM is basically a fancy RAG LLM system... subject to all the same issues.",
      "publishedDate": "2025-09-18"
    }
  ]
};