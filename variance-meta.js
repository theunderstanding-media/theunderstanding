const FEATURED_COMBINATIONS = ["Q50-P13", "Q50-P16", "Q50-P15", "Q04-P22", "Q45-P15", "Q50-P06", "Q21-P15", "Q50-P05", "Q43-P13", "Q04-P20"];

const PERSONA_META = {
  "P01": {
    "id": "P01",
    "role": "Continental epistemologist",
    "location": "France / Paris",
    "icon": "🧠"
  },
  "P02": {
    "id": "P02",
    "role": "Philosopher of science",
    "location": "UK / Oxford",
    "icon": "🧠"
  },
  "P03": {
    "id": "P03",
    "role": "Mathematical information theorist",
    "location": "USA / MIT",
    "icon": "◈"
  },
  "P04": {
    "id": "P04",
    "role": "Philosopher of mind",
    "location": "Japan / Kyoto",
    "icon": "🧠"
  },
  "P05": {
    "id": "P05",
    "role": "Former newspaper executive editor",
    "location": "USA / New York",
    "icon": "🗞️"
  },
  "P06": {
    "id": "P06",
    "role": "Disinformation researcher",
    "location": "EU / Brussels",
    "icon": "🔬"
  },
  "P07": {
    "id": "P07",
    "role": "Media economist",
    "location": "USA / Columbia",
    "icon": "📰"
  },
  "P08": {
    "id": "P08",
    "role": "Documentary filmmaker",
    "location": "Nigeria / Lagos",
    "icon": "🎬"
  },
  "P09": {
    "id": "P09",
    "role": "Independent AI safety researcher",
    "location": "USA / unaffiliated",
    "icon": "🔬"
  },
  "P10": {
    "id": "P10",
    "role": "Cognitive scientist",
    "location": "Canada / Toronto",
    "icon": "🧠"
  },
  "P11": {
    "id": "P11",
    "role": "Network scientist",
    "location": "Netherlands / Amsterdam",
    "icon": "🔬"
  },
  "P12": {
    "id": "P12",
    "role": "AI critic and scholar (adversarial)",
    "location": "USA / academic",
    "icon": "◈"
  },
  "P13": {
    "id": "P13",
    "role": "Former intelligence analyst",
    "location": "UK / GCHQ (retired)",
    "icon": "🕵️"
  },
  "P14": {
    "id": "P14",
    "role": "Constitutional legal theorist",
    "location": "USA / Yale",
    "icon": "⚖️"
  },
  "P15": {
    "id": "P15",
    "role": "Political scientist",
    "location": "Hungary / Budapest",
    "icon": "🔬"
  },
  "P16": {
    "id": "P16",
    "role": "Former tech platform policy director",
    "location": "USA / ex-Silicon Valley",
    "icon": "⚖️"
  },
  "P17": {
    "id": "P17",
    "role": "Behavioral economist",
    "location": "Israel → USA / Princeton",
    "icon": "📊"
  },
  "P18": {
    "id": "P18",
    "role": "Sociologist of polarization",
    "location": "USA / Chicago",
    "icon": "🌍"
  },
  "P19": {
    "id": "P19",
    "role": "Developmental psychologist",
    "location": "UK / Cambridge",
    "icon": "◈"
  },
  "P20": {
    "id": "P20",
    "role": "Social anthropologist",
    "location": "Mexico / UNAM",
    "icon": "🌍"
  },
  "P21": {
    "id": "P21",
    "role": "Chinese technology scholar",
    "location": "China / Beijing",
    "icon": "💻"
  },
  "P22": {
    "id": "P22",
    "role": "Polish journalist and media critic",
    "location": "Poland / Warsaw",
    "icon": "📰"
  },
  "P23": {
    "id": "P23",
    "role": "Digital rights researcher",
    "location": "Nigeria / Abuja",
    "icon": "🔬"
  },
  "P24": {
    "id": "P24",
    "role": "Investigative journalist and editor",
    "location": "India / Delhi",
    "icon": "📰"
  },
  "P25": {
    "id": "P25",
    "role": "Public health communicator",
    "location": "Brazil / São Paulo",
    "icon": "🏥"
  }
};

const QUESTION_META = {
  "Q01": {
    "id": "Q01",
    "text": "What is the most important thing most people misunderstand about how knowledge works?"
  },
  "Q02": {
    "id": "Q02",
    "text": "When you say something is 'true,' what are you actually claiming?"
  },
  "Q03": {
    "id": "Q03",
    "text": "Is there such a thing as objective truth, or is all knowledge constructed?"
  },
  "Q04": {
    "id": "Q04",
    "text": "What does it feel like, from the inside, when a belief you held turns out to be wrong?"
  },
  "Q05": {
    "id": "Q05",
    "text": "What's the difference between being misinformed and being deceived?"
  },
  "Q06": {
    "id": "Q06",
    "text": "When did you first notice that the systems designed to produce reliable knowledge were failing?"
  },
  "Q07": {
    "id": "Q07",
    "text": "What is the relationship between trust and truth? Can one exist without the other?"
  },
  "Q08": {
    "id": "Q08",
    "text": "Who decides what counts as evidence? And who has historically benefited from that decision?"
  },
  "Q09": {
    "id": "Q09",
    "text": "Is epistemic collapse reversible? Have we ever seen it reversed?"
  },
  "Q10": {
    "id": "Q10",
    "text": "What does a healthy epistemic ecosystem actually look like? Does one exist anywhere right now?"
  },
  "Q11": {
    "id": "Q11",
    "text": "What changes, fundamentally, when the author of a piece of journalism is not human?"
  },
  "Q12": {
    "id": "Q12",
    "text": "Is AI making the information crisis better or worse? Can it be both simultaneously?"
  },
  "Q13": {
    "id": "Q13",
    "text": "What is the difference between AI generating misinformation and a human doing it intentionally?"
  },
  "Q14": {
    "id": "Q14",
    "text": "If an AI system is trained primarily on content produced by one culture, what does it know about another?"
  },
  "Q15": {
    "id": "Q15",
    "text": "Can an AI have a perspective, or does it only simulate one?"
  },
  "Q16": {
    "id": "Q16",
    "text": "What is the most dangerous assumption people make about AI-generated content?"
  },
  "Q17": {
    "id": "Q17",
    "text": "Is the problem with AI and truth a technical problem or a political one?"
  },
  "Q18": {
    "id": "Q18",
    "text": "What would it mean for an AI system to be epistemically responsible?"
  },
  "Q19": {
    "id": "Q19",
    "text": "When AI compresses and summarizes human knowledge, what gets lost in that compression?"
  },
  "Q20": {
    "id": "Q20",
    "text": "In 20 years, will we look back at this period of AI development as a mistake, a transition, or a breakthrough?"
  },
  "Q21": {
    "id": "Q21",
    "text": "Which institution has failed most catastrophically at protecting shared epistemic standards, and why?"
  },
  "Q22": {
    "id": "Q22",
    "text": "Was the collapse of trust in media inevitable, or was it a series of specific, avoidable decisions?"
  },
  "Q23": {
    "id": "Q23",
    "text": "What do governments get wrong when they try to regulate information environments?"
  },
  "Q24": {
    "id": "Q24",
    "text": "Has science — as an institution — handled the challenge of public misinformation well or badly?"
  },
  "Q25": {
    "id": "Q25",
    "text": "What is the platform companies' actual responsibility for epistemic collapse, and have they been held to it?"
  },
  "Q26": {
    "id": "Q26",
    "text": "Are there institutions — anywhere in the world — that have maintained epistemic authority? What did they do differently?"
  },
  "Q27": {
    "id": "Q27",
    "text": "What role did the advertising model play in making journalism epistemically weaker?"
  },
  "Q28": {
    "id": "Q28",
    "text": "What would a functional public epistemics infrastructure look like? Who would build and maintain it?"
  },
  "Q29": {
    "id": "Q29",
    "text": "Is restoring 'institutional trust' actually the right goal, or is that the wrong frame entirely?"
  },
  "Q30": {
    "id": "Q30",
    "text": "Who benefits from epistemic collapse? Name them specifically."
  },
  "Q31": {
    "id": "Q31",
    "text": "How are ordinary people actually navigating an information environment they no longer trust?"
  },
  "Q32": {
    "id": "Q32",
    "text": "What cognitive habits or practices make a person more epistemically resilient?"
  },
  "Q33": {
    "id": "Q33",
    "text": "Is 'media literacy' a real solution, or is it asking individuals to fix a structural problem?"
  },
  "Q34": {
    "id": "Q34",
    "text": "What does community-level epistemic resilience look like? Where have you seen it work?"
  },
  "Q35": {
    "id": "Q35",
    "text": "How do people decide who to trust when institutions have lost authority?"
  },
  "Q36": {
    "id": "Q36",
    "text": "What happens to political participation when citizens can no longer agree on basic facts?"
  },
  "Q37": {
    "id": "Q37",
    "text": "Is the current generation of young people more or less epistemically capable than previous generations? What's your evidence?"
  },
  "Q38": {
    "id": "Q38",
    "text": "What do people do with information they know is probably false but find emotionally satisfying?"
  },
  "Q39": {
    "id": "Q39",
    "text": "Is there such a thing as productive uncertainty — a way of not-knowing that leads somewhere useful?"
  },
  "Q40": {
    "id": "Q40",
    "text": "What would you tell a person who has genuinely given up on the idea that truth is knowable?"
  },
  "Q41": {
    "id": "Q41",
    "text": "What is the single most important thing that needs to happen in the next five years to prevent permanent epistemic collapse?"
  },
  "Q42": {
    "id": "Q42",
    "text": "Is there a version of AI development that makes the information environment better rather than worse? What would it require?"
  },
  "Q43": {
    "id": "Q43",
    "text": "What are you most wrong about right now, and how would you know?"
  },
  "Q44": {
    "id": "Q44",
    "text": "If you could design one institution from scratch to protect epistemic standards in the AI era, what would it look like?"
  },
  "Q45": {
    "id": "Q45",
    "text": "What gives you reason to believe this crisis is survivable?"
  },
  "Q46": {
    "id": "Q46",
    "text": "What is already lost that we are not yet grieving?"
  },
  "Q47": {
    "id": "Q47",
    "text": "Is manufacturing epistemic confusion a deliberate strategy for those who benefit from it?"
  },
  "Q48": {
    "id": "Q48",
    "text": "What does the next generation need to understand about truth that the current generation failed to teach them?"
  },
  "Q49": {
    "id": "Q49",
    "text": "If an AI system were genuinely trying to understand humanity — not simulate understanding, but actually do it — what would it need to do that current systems don't?"
  },
  "Q50": {
    "id": "Q50",
    "text": "What question should I have asked you that I didn't?"
  },
  "Q51": {
    "id": "Q51",
    "text": "What does this question set misunderstand about your field? What distinction am I collapsing that should stay separate?"
  }
};
