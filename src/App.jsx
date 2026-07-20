import React, { useState, useMemo } from 'react';
import { MessageSquareText, Sparkles, ImagePlus, Mic, UserSearch, ShieldCheck, AlertTriangle, ArrowRight, Download, Check } from 'lucide-react';

const EU_BLUE = '#0033A0';
const INK = '#0F1729';
const SLATE = '#697386';
const MUTE = '#9AA3B2';
const LINE = '#EBEEF3';
const BG = '#FFFFFF';
const PANEL = '#F8F9FB';
const DANGER = '#C0392B';
const SUCCESS = '#1E8E5A';

const TOOL_LIBRARY = [
  { id: 'chatbot', label: 'Customer support chatbot', icon: MessageSquareText, article: 'Art. 50(1)', tier: 'transparency', obligation: 'Disclose to users they are interacting with AI, unless obvious from context.', disclosureTemplate: (c) => `${c} uses an AI chatbot for customer support. In line with Article 50(1) of the EU AI Act, users are told at the start of the conversation that they are speaking with an AI system, not a human. Suggested text: "You're chatting with an AI assistant. Type 'agent' to reach a person."` },
  { id: 'content', label: 'AI-written marketing copy', icon: Sparkles, article: 'Art. 50(4)', tier: 'transparency', obligation: 'Label AI-generated text on matters of public interest.', disclosureTemplate: (c) => `Some content published by ${c} is generated or assisted by AI. As required under Article 50(4), this content carries a label. Suggested footer: "Drafted with AI assistance and reviewed by our team."` },
  { id: 'image', label: 'AI-generated product images', icon: ImagePlus, article: 'Art. 50(2)', tier: 'transparency', obligation: 'Mark image as AI-generated in machine-readable form.', disclosureTemplate: (c) => `Images produced using generative AI are marked as AI-generated, per Article 50(2). ${c} embeds this in image metadata and, where public-facing, a visible "AI-generated image" label.` },
  { id: 'voice', label: 'AI voice / IVR system', icon: Mic, article: 'Art. 50(1)', tier: 'transparency', obligation: 'Inform callers at the start they are speaking with AI.', disclosureTemplate: (c) => `${c}'s phone line uses an AI voice system. Per Article 50(1), callers are informed at call start. Suggested script: "You've reached ${c}. You're speaking with an automated assistant. Say 'representative' to be transferred."` },
  { id: 'hiring', label: 'CV screening tool', icon: UserSearch, article: 'Annex III', tier: 'high-risk', obligation: 'High-risk: requires human oversight, logging, conformity record.', disclosureTemplate: (c) => `${c} uses AI to support CV screening. This is high-risk under Annex III. ${c} maintains human oversight of hiring decisions, logs system activity, and keeps a conformity record for review.` },
];

function ToolRow({ tool, selected, onToggle }) {
  const Icon = tool.icon;
  const danger = tool.tier === 'high-risk';
  return (
    <button onClick={onToggle} className="w-full text-left group">
      <div
        className="flex items-center gap-4 py-4 px-4 rounded-xl transition-all"
        style={{
          background: selected ? PANEL : 'transparent',
          border: `1px solid ${selected ? LINE : 'transparent'}`,
        }}
      >
        <div
          className="w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-colors"
          style={{ borderColor: selected ? (danger ? DANGER : EU_BLUE) : '#C7CEDE', background: selected ? (danger ? DANGER : EU_BLUE) : 'transparent' }}
        >
          {selected && <Check size={13} color="white" strokeWidth={3} />}
        </div>
        <Icon size={18} strokeWidth={1.7} color={selected ? INK : MUTE} />
        <span className="text-[14.5px] flex-1" style={{ color: selected ? INK : SLATE, fontWeight: selected ? 500 : 400 }}>
          {tool.label}
        </span>
        <span className="text-[11.5px] font-medium tabular-nums" style={{ color: selected ? (danger ? DANGER : EU_BLUE) : MUTE }}>
          {tool.article}
        </span>
      </div>
    </button>
  );
}

export default function Transpara() {
  const [selectedIds, setSelectedIds] = useState(['chatbot', 'content']);
  const [companyName, setCompanyName] = useState('Nordvale Retail O\u00dc');

  const toggle = (id) => setSelectedIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const results = useMemo(() => TOOL_LIBRARY.filter((t) => selectedIds.includes(t.id)), [selectedIds]);
  const highRisk = results.filter((r) => r.tier === 'high-risk');
  const transparency = results.filter((r) => r.tier === 'transparency');
  const allClear = results.length > 0 && highRisk.length === 0;

  const downloadPack = () => {
    const content = results.map((r) => `${r.label} (${r.article})\n${'-'.repeat(40)}\n${r.disclosureTemplate(companyName)}\n`).join('\n\n');
    const header = `TRANSPARA \u2014 AI ACT DISCLOSURE PACK\nGenerated for: ${companyName}\nDate: ${new Date().toLocaleDateString('en-GB')}\n\n${'='.repeat(50)}\n\n`;
    const blob = new Blob([header + content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName.replace(/\s+/g, '_')}_AI_Act_Disclosure_Pack.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Inter', ui-sans-serif, system-ui" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .tabular-nums { font-variant-numeric: tabular-nums; }`}</style>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: EU_BLUE }}>
              <ShieldCheck size={15} color="white" strokeWidth={2.2} />
            </div>
            <span className="font-bold tracking-tight text-[15px]" style={{ color: INK }}>Transpara</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]" style={{ color: SLATE }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: SUCCESS }} />
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-transparent outline-none text-right"
              style={{ color: SLATE, width: `${Math.max(companyName.length, 8)}ch` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-14">
        {/* Single hero metric — the trust-building focal point */}
        <div className="flex items-end justify-between mb-14 pb-10" style={{ borderBottom: `1px solid ${LINE}` }}>
          <div>
            <div className="text-[13px] font-medium mb-3" style={{ color: SLATE }}>Article 50 enforcement begins in</div>
            <div className="flex items-baseline gap-3">
              <span className="text-[64px] font-bold tracking-tight leading-none tabular-nums" style={{ color: INK }}>13</span>
              <span className="text-[16px] font-medium" style={{ color: SLATE }}>days</span>
            </div>
            <div className="text-[13px] mt-2" style={{ color: MUTE }}>2 August 2026 · binding across all 27 EU member states</div>
          </div>
          <div className="text-right hidden sm:block">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
              style={{
                background: allClear ? '#EAF7EF' : results.length === 0 ? PANEL : '#FDF2F1',
                color: allClear ? SUCCESS : results.length === 0 ? MUTE : DANGER,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: allClear ? SUCCESS : results.length === 0 ? MUTE : DANGER }} />
              {results.length === 0 ? 'No tools selected' : allClear ? 'Transparency only' : `${highRisk.length} high-risk flagged`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Left: selection */}
          <div className="lg:col-span-3">
            <div className="text-[12px] font-semibold uppercase tracking-wider mb-1" style={{ color: MUTE }}>01 — Your AI tools</div>
            <h2 className="text-[21px] font-bold mb-1" style={{ color: INK }}>What does {companyName.split(' ')[0]} run today?</h2>
            <p className="text-[13.5px] mb-6" style={{ color: SLATE }}>Select everything that applies.</p>
            <div className="space-y-1">
              {TOOL_LIBRARY.map((tool) => (
                <ToolRow key={tool.id} tool={tool} selected={selectedIds.includes(tool.id)} onToggle={() => toggle(tool.id)} />
              ))}
            </div>
          </div>

          {/* Right: obligations, calm single-column list */}
          <div className="lg:col-span-2">
            <div className="text-[12px] font-semibold uppercase tracking-wider mb-1" style={{ color: MUTE }}>02 — Your obligations</div>
            <h2 className="text-[21px] font-bold mb-5" style={{ color: INK }}>What you need to do</h2>

            {results.length === 0 ? (
              <div className="rounded-xl py-10 text-center" style={{ background: PANEL }}>
                <p className="text-[13px]" style={{ color: MUTE }}>Select a tool on the left to begin.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {results.map((r, i) => {
                  const danger = r.tier === 'high-risk';
                  return (
                    <div key={r.id} className="py-4" style={{ borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        {danger ? <AlertTriangle size={14} color={DANGER} /> : <ShieldCheck size={14} color={EU_BLUE} />}
                        <span className="text-[13.5px] font-semibold" style={{ color: INK }}>{r.label}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed pl-6" style={{ color: SLATE }}>{r.obligation}</p>
                      <p className="text-[12.5px] leading-relaxed pl-6 mt-2 py-2.5 px-3 rounded-lg" style={{ color: '#3B4256', background: PANEL }}>{r.disclosureTemplate(companyName)}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {results.length > 0 && (
              <button
                onClick={downloadPack}
                className="w-full mt-6 rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold text-[14px] text-white transition-opacity hover:opacity-90"
                style={{ background: EU_BLUE }}
              >
                <Download size={15} />
                Generate disclosure pack
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
