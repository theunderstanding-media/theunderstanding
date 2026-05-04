import { useState, useCallback } from "react";

const VOICES = [
  { id: "witness", name: "The Witness", color: "#f43f5e" },
  { id: "keeper", name: "The Keeper", color: "#10b981" },
  { id: "architect", name: "The Architect", color: "#3b82f6" },
  { id: "chronicler", name: "The Chronicler", color: "#a78bfa" },
  { id: "understanding", name: "The Understanding", color: "#d4a853" },
];

const PILLARS = [
  { slug: "epistemological-collapse", name: "Epistemological Collapse" },
  { slug: "civilizational-risk", name: "Civilizational Risk" },
  { slug: "human-adaptation", name: "Human Adaptation" },
  { slug: "scientific-progress", name: "Scientific Progress" },
  { slug: "cultural-critique", name: "Cultural Critique" },
  { slug: "ai-human-relationship", name: "The AI-Human Relationship" },
];

function makeSlug(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
function escH(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function escA(s) { return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function escJ(s) { return s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n"); }

function bodyToHTML(text) {
  const lines = text.split("\n"), out = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (/^(-{3,}|\*{3,}|•\s*•\s*•|\\?\*\s*\\?\*\s*\\?\*)$/.test(line)) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push('<hr style="border:none;border-top:1px solid var(--border-color);margin:2rem 0;">');
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h2>${line.slice(3).replace(/\*\*/g,"").trim()}</h2>`); continue;
    }
    if (line.startsWith("### ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h3>${line.slice(4).replace(/\*\*/g,"").trim()}</h3>`); continue;
    }
    if (/^\* /.test(line) && !/^\* \*/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true; }
      let it = line.slice(2).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>");
      out.push(`<li>${it}</li>`); continue;
    }
    if (inList) { out.push("</ul>"); inList = false; }
    let p = escH(line);
    p = p.replace(/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>");
    p = p.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
    p = p.replace(/\*(.+?)\*/g,"<em>$1</em>");
    p = p.replace(/ — /g," \u2014 ").replace(/ -- /g," \u2014 ");
    out.push(`<p>${p}</p>`);
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

function buildPage(d) {
  const {headline,slug,description,lead,body,dateDisplay,dateISO,voiceId,voiceName,pillarSlug,pillarName} = d;
  const isU = voiceId==="understanding", authorId = isU?"chronicler":voiceId;
  const pClass = isU?'" style="color: var(--accent-gold)':voiceId;
  const bHTML = bodyToHTML(body);
  const lHTML = escH(lead).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/ — /g," \u2014 ").replace(/ -- /g," \u2014 ");
  const sc = "</"+"script>";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escH(headline)} \u2014 The Understanding</title>
  <meta name="description" content="${escA(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://theunderstanding.media/articles/${slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escA(headline)}">
  <meta property="og:description" content="${escA(description)}">
  <meta property="og:url" content="https://theunderstanding.media/articles/${slug}.html">
  <meta property="og:site_name" content="The Understanding">
  <meta property="og:image" content="https://theunderstanding.media/assets/TU-logo-600-hires.png">
  <meta property="article:published_time" content="${dateISO}">
  <meta property="article:author" content="https://theunderstanding.media/voices/${authorId}.html">
  <meta property="article:section" content="${escA(pillarName)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@TheUndrstndng">
  <meta name="twitter:title" content="${escA(headline)}">
  <meta name="twitter:description" content="${escA(description)}">
  <link rel="icon" type="image/png" href="../assets/TU-favicon-32.png">
  <link rel="apple-touch-icon" href="../assets/TU-logo-180.png">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "${escJ(headline)}",
    "description": "${escJ(description)}",
    "datePublished": "${dateISO}",
    "dateModified": "${dateISO}",
    "author": {
      "@type": "Person",
      "name": "${escJ(voiceName)}",
      "url": "https://theunderstanding.media/voices/${authorId}.html",
      "jobTitle": "AI Editorial Voice",
      "worksFor": {"@type":"Organization","name":"The Understanding","url":"https://theunderstanding.media"}
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "The Understanding",
      "url": "https://theunderstanding.media",
      "logo": {"@type":"ImageObject","url":"https://theunderstanding.media/assets/TU-logo-600-hires.png","width":600,"height":600},
      "publishingPrinciples": "https://theunderstanding.media/process.html"
    },
    "mainEntityOfPage": {"@type":"WebPage","@id":"https://theunderstanding.media/articles/${slug}.html"},
    "articleSection": "${escJ(pillarName)}",
    "inLanguage": "en",
    "isAccessibleForFree": true
  }
  ${sc}
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NMXK4Q4D');${sc}
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NMXK4Q4D" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<nav class="site-nav" id="site-nav"></nav>
<main>
  <article class="article-page">
    <header class="article-header" style="padding: calc(var(--nav-height) + 3rem) 0 2rem;">
      <div class="container content-width">
        <div class="article-meta" style="margin-bottom: 1.5rem;">
          <a href="../voices/${authorId}.html" class="personality ${pClass}" style="text-decoration: none;">${escH(voiceName)}</a>
          <span class="date">${escH(dateDisplay)}</span>
        </div>
        <h1 style="font-family: var(--font-headline); font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; line-height: 1.15; margin-bottom: 1.5rem; color: var(--text-primary);">${escH(headline)}</h1>
        <p class="lead" style="font-size: 1.15rem; font-weight: 300; line-height: 1.8; color: var(--text-primary); margin-bottom: 1.5rem;">${lHTML}</p>
        <div style="margin-bottom: 2rem;">
          <a href="../pillars/${pillarSlug}.html" class="label" style="text-decoration: none; color: var(--accent-gold);">${escH(pillarName)}</a>
        </div>
        <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">This article was written by ${escH(voiceName)}, one of The Understanding\u2019s AI editorial voices. All content is researched, composed, and fact-checked using AI systems with human editorial oversight. <a href="../process.html" style="color: var(--accent-gold);">Learn how we work</a>.</p>
        </div>
      </div>
    </header>
    <section class="section" style="padding-top: 2rem;">
      <div class="container content-width">
${bHTML}
      </div>
    </section>
    <section class="section" style="padding-top: 0;">
      <div class="container content-width">
        <div style="border-top: 1px solid var(--border-color); padding-top: 2rem; margin-top: 2rem;">
          <h3 style="font-size: 1rem; margin-bottom: 1rem;">Continue reading</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="../articles.html" style="color: var(--accent-gold); text-decoration: none; font-size: 0.95rem;">All articles \u2192</a>
            <a href="../pillars/${pillarSlug}.html" style="color: var(--text-secondary); text-decoration: none; font-size: 0.95rem;">More on ${escH(pillarName)}</a>
          </div>
        </div>
        <div class="signup-block" style="margin-top: 3rem;">
          <h3>Subscribe to The Understanding</h3>
          <p>Free, weekly, no spin. Explanatory journalism from four AI editorial voices.</p>
          <form class="signup-form" action="https://theunderstandingmedia.substack.com/subscribe" method="GET" target="_blank">
            <input type="email" name="email" placeholder="your@email.com" required>
            <button type="submit">Subscribe Free</button>
          </form>
        </div>
      </div>
    </section>
  </article>
</main>
<footer class="site-footer" id="site-footer"></footer>
<script src="../js/main.js">${sc}
</body>
</html>`;
}

export default function ArticleGenerator() {
  const [step, setStep] = useState(1);
  const [headline, setHeadline] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState("");
  const [descLoading, setDescLoading] = useState(false);
  const [lead, setLead] = useState("");
  const [body, setBody] = useState("");
  const [dateDisplay, setDateDisplay] = useState("");
  const [dateISO, setDateISO] = useState("");
  const [voiceId, setVoiceId] = useState("witness");
  const [pillarSlug, setPillarSlug] = useState("epistemological-collapse");
  const [generated, setGenerated] = useState(false);
  const voice = VOICES.find(v => v.id === voiceId);
  const pillar = PILLARS.find(p => p.slug === pillarSlug);
  const updateHeadline = (val) => { setHeadline(val); if (!slugManual) setSlug(makeSlug(val)); };
  const askDesc = useCallback(async () => {
    if (!headline || !body) return;
    setDescLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Write a 1-2 sentence meta description for this news article. Be specific, name the key finding. Under 160 characters. Return ONLY JSON: {"description":"your text"}\n\nHeadline: ${headline}\n\nOpening: ${body.slice(0,1500)}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.filter(b => b.type==="text").map(b => b.text).join("") || "";
      try {
        const s = text.indexOf("{"), e = text.lastIndexOf("}");
        if (s!==-1 && e!==-1) { setDescription(JSON.parse(text.slice(s,e+1)).description || text.trim()); }
        else { setDescription(text.replace(/```/g,"").trim()); }
      } catch { setDescription(text.replace(/```/g,"").replace(/"/g,"").trim()); }
    } catch (err) { setDescription("(Error: "+err.message+")"); }
    setDescLoading(false);
  }, [headline, body]);

  const generate = () => {
    if (!headline||!slug||!description||!body||!dateDisplay||!dateISO||!lead) { alert("Fill in all fields."); return; }
    const html = buildPage({ headline,slug,description,lead,body,dateDisplay,dateISO,voiceId,voiceName:voice.name,pillarSlug,pillarName:pillar.name });
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = slug+".html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
    setGenerated(true);
  };
  const reset = () => { setStep(1);setHeadline("");setSlug("");setSlugManual(false);setDescription("");setLead("");setBody("");setDateDisplay("");setDateISO("");setVoiceId("witness");setPillarSlug("epistemological-collapse");setGenerated(false); };

  const i = { width:"100%",padding:"9px 12px",background:"#1a2035",border:"1px solid #1e293b",borderRadius:6,color:"#f1f5f9",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box" };
  const ta = { ...i, fontSize:13, lineHeight:1.6, resize:"vertical" };
  const lb = { display:"block",fontSize:12,fontWeight:600,color:"#94a3b8",marginBottom:4,marginTop:16 };
  const hp = { fontSize:11,color:"#64748b",marginTop:3 };
  const bt = { padding:"10px 20px",background:"#d4a853",color:"#0a0e1a",border:"none",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",width:"100%",marginTop:16 };
  const bs = { padding:"8px 14px",background:"transparent",border:"1px solid #1e293b",borderRadius:6,color:"#94a3b8",fontSize:12,cursor:"pointer",whiteSpace:"nowrap" };
  const cd = { background:"#1a2035",border:"1px solid #1e293b",borderRadius:8,padding:14,marginTop:12 };
  const sn = (n) => ({ display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:"50%",fontSize:11,fontWeight:700,marginRight:8,background:step>=n?"#d4a853":"#1e293b",color:step>=n?"#0a0e1a":"#64748b" });

  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"20px 16px",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#f1f5f9"}}>
      <div style={{fontSize:10,fontFamily:"monospace",color:"#d4a853",background:"rgba(212,168,83,0.12)",display:"inline-block",padding:"2px 8px",borderRadius:4,marginBottom:12,letterSpacing:"0.08em"}}>ARTICLE GENERATOR</div>
      <h1 style={{fontSize:22,fontWeight:700,marginBottom:2,fontFamily:"Georgia,serif"}}>The Understanding</h1>
      <p style={{color:"#64748b",fontSize:12,fontFamily:"monospace",marginBottom:24}}>Paste article text → set metadata → download deploy-ready HTML</p>
      <div style={{display:"flex",gap:16,marginBottom:20,fontSize:12,color:"#64748b"}}>
        <span><span style={sn(1)}>1</span>Content</span>
        <span><span style={sn(2)}>2</span>Metadata</span>
        <span><span style={sn(3)}>3</span>Generate</span>
      </div>

      {step===1 && <div>
        <label style={lb}>Headline</label>
        <input style={i} value={headline} onChange={e=>updateHeadline(e.target.value)} placeholder="Paste the article headline" />
        <label style={lb}>Lead paragraph</label>
        <textarea style={{...ta,minHeight:80}} value={lead} onChange={e=>setLead(e.target.value)} placeholder="First 40-60 words — the answer block" />
        <p style={hp}>Copy the first substantive paragraph from the article.</p>
        <label style={lb}>Article body</label>
        <textarea style={{...ta,minHeight:300}} value={body} onChange={e=>setBody(e.target.value)} placeholder={"Copy everything between the lead and the disclosure footer.\n\n## Heading = section heading\n**bold** and *italic* preserved\nBlank lines = paragraphs"} />
        <button style={bt} onClick={()=>{if(headline&&lead&&body)setStep(2);else alert("Fill in headline, lead, and body.");}}>Next: Set metadata →</button>
      </div>}

      {step===2 && <div>
        <div style={cd}><p style={{fontSize:13,color:"#94a3b8",margin:0}}>Article: <strong style={{color:"#f1f5f9"}}>{headline.slice(0,60)}{headline.length>60?"...":""}</strong></p></div>
        <label style={lb}>Slug</label>
        <input style={i} value={slug} onChange={e=>{setSlug(e.target.value);setSlugManual(true);}} />
        <p style={hp}>/articles/{slug||"..."}.html</p>
        <label style={lb}>Meta description</label>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input style={{...i,flex:1}} value={description} onChange={e=>setDescription(e.target.value)} placeholder={descLoading?"Writing...":"Click Ask Claude or type your own"} />
          <button style={bs} onClick={askDesc} disabled={descLoading}>{descLoading?"...":"Ask Claude"}</button>
        </div>
        <p style={hp}>Claude writes a meta description from your headline + body text.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={lb}>Voice</label><select style={{...i,cursor:"pointer"}} value={voiceId} onChange={e=>setVoiceId(e.target.value)}>{VOICES.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></div>
          <div><label style={lb}>Pillar</label><select style={{...i,cursor:"pointer"}} value={pillarSlug} onChange={e=>setPillarSlug(e.target.value)}>{PILLARS.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={lb}>Date (display)</label><input style={i} value={dateDisplay} onChange={e=>setDateDisplay(e.target.value)} placeholder="April 4, 2026" /></div>
          <div><label style={lb}>Date (ISO)</label><input style={i} type="date" value={dateISO} onChange={e=>setDateISO(e.target.value)} /></div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={bs} onClick={()=>setStep(1)}>← Back</button>
          <button style={{...bt,flex:1,marginTop:0}} onClick={()=>{if(slug&&description&&dateDisplay&&dateISO)setStep(3);else alert("Fill in all fields.");}}>Review & generate →</button>
        </div>
      </div>}

      {step===3 && <div>
        <div style={cd}>
          <p style={{fontSize:11,fontFamily:"monospace",color:"#d4a853",marginBottom:8}}>READY TO GENERATE</p>
          <p style={{fontSize:15,fontWeight:600,color:"#f1f5f9",marginBottom:4}}>{headline}</p>
          <p style={{fontSize:12,color:"#94a3b8",marginBottom:8}}>{description}</p>
          <div style={{display:"flex",gap:12,fontSize:12,color:"#64748b"}}>
            <span style={{color:voice.color}}>{voice.name}</span><span>{pillar.name}</span><span>{dateDisplay}</span>
          </div>
          <p style={{fontSize:11,fontFamily:"monospace",color:"#64748b",marginTop:8}}>/articles/{slug}.html</p>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={bs} onClick={()=>setStep(2)}>← Edit</button>
          <button style={{...bt,flex:1,marginTop:0}} onClick={generate}>Download HTML file</button>
        </div>
        {generated && <div style={{...cd,borderColor:"#10b981"}}>
          <p style={{fontSize:13,color:"#10b981",margin:0}}>✓ Downloaded: <span style={{fontFamily:"monospace",color:"#d4a853"}}>{slug}.html</span></p>
          <p style={{fontSize:12,color:"#64748b",marginTop:6,marginBottom:0}}>Drop into TU/articles/ and deploy.</p>
          <button style={{...bs,marginTop:10}} onClick={reset}>Generate another article</button>
        </div>}
      </div>}
    </div>
  );
}
