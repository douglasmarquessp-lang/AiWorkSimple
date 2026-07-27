'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveArticleAction, deleteArticleAction, getArticlesAction } from './actions';

export default function AdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'audit'>('content');
  
  // Form State
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [authorName, setAuthorName] = useState('Douglas Marques');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('⚡');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState('3 min');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [published, setPublished] = useState(true);

  // SEO & Audit State
  const [focusKeyword, setFocusKeyword] = useState('AI productivity tools');
  const [metaDescription, setMetaDescription] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [searchIntent, setSearchIntent] = useState('Informational');

  // Load articles on mount
  useEffect(() => {
    getArticlesAction().then((res: any) => setArticles(res || []));
    
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('id');
    if (editId) {
      getArticlesAction().then((res: any) => {
        const art = res.find((a: any) => a.id === editId);
        if (art) {
          setId(art.id);
          setTitle(art.title);
          setSlug(art.slug);
          setAuthorName(art.authorName || 'Douglas Marques');
          setCategory(art.category);
          setEmoji(art.emoji);
          setImageUrl(art.imageUrl || '');
          setReadTime(art.readTime);
          setExcerpt(art.excerpt);
          setContent(art.content);
          setMetaDescription(art.metaDescription || '');
          setIsFeatured(art.isFeatured);
          setIsTrending(art.isTrending);
          setPublished(art.published);
        }
      });
    }
  }, []);

  // REAL-TIME CLIENT-SIDE SEO AUDIT ALGORITHM (Zero-Cost)
  const auditKeywordInTitle = title.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  const auditKeywordInIntro = content.slice(0, 200).toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  const auditKeywordInMeta = metaDescription.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  
  // Keyword density calculation
  const words = content.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const keywordMatches = focusKeyword ? (content.match(new RegExp(focusKeyword, 'gi')) || []).length : 0;
  const keywordDensity = totalWords > 0 ? parseFloat(((keywordMatches / totalWords) * 100).toFixed(1)) : 0;
  const isDensityHealthy = keywordDensity >= 0.8 && keywordDensity <= 2.5;

  // Link counters
  const internalLinks = (content.match(/href="\/(articles|noticias|\?)/gi) || []).length;
  const externalLinks = (content.match(/href="https?:\/\/(?!aiworksimple\.com)[^"]+"/gi) || []).length;

  // Dynamic SEO Score Calculation
  let seoScore = 30;
  if (auditKeywordInTitle) seoScore += 20;
  if (auditKeywordInIntro) seoScore += 15;
  if (auditKeywordInMeta) seoScore += 15;
  if (isDensityHealthy) seoScore += 10;
  if (internalLinks >= 2) seoScore += 5; else if (internalLinks === 1) seoScore += 2;
  if (externalLinks >= 3) seoScore += 5;

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveArticleAction({
      id, title, slug, excerpt, content, category, emoji, imageUrl, authorName, metaDescription, published, readTime, isFeatured, isTrending
    });
    if (result?.success) {
      window.location.href = '/admin';
    } else {
      alert('Error: ' + result?.error);
    }
  };

  // Handle Delete
  const handleDelete = async (artId: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const result = await deleteArticleAction(artId);
      if (result?.success) {
        window.location.href = '/admin';
      }
    }
  };

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginBottom: '20px' }}>
        {id ? 'Advanced Article Editor ⚡' : 'Advanced SEO Publisher Dashboard ⚡'}
      </h1>

      <div className="two-col" style={{ gridTemplateColumns: '1fr 340px' }}>
        
        {/* MAIN COLUMN: TABBED EDITOR */}
        <div className="col-main" style={{ padding: '30px', background: '#fff', border: '2.5px solid var(--ink)', borderRadius: '6px' }}>
          
          {/* TABS */}
          <div style={{ display: 'flex', borderBottom: '2.5px solid var(--ink)', marginBottom: '25px' }}>
            <button type="button" onClick={() => setActiveTab('content')} style={{ flex: 1, padding: '12px', background: activeTab === 'content' ? 'var(--ink)' : 'none', color: activeTab === 'content' ? '#fff' : 'var(--ink)', border: 'none', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer' }}>
              📝 1. Content
            </button>
            <button type="button" onClick={() => setActiveTab('seo')} style={{ flex: 1, padding: '12px', background: activeTab === 'seo' ? 'var(--ink)' : 'none', color: activeTab === 'seo' ? '#fff' : 'var(--ink)', borderLeft: '2.5px solid var(--ink)', borderRight: '2.5px solid var(--ink)', borderBottom: 'none', borderTop: 'none', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer' }}>
              🔍 2. SEO Meta
            </button>
            <button type="button" onClick={() => setActiveTab('audit')} style={{ flex: 1, padding: '12px', background: activeTab === 'audit' ? 'var(--ink)' : 'none', color: activeTab === 'audit' ? '#fff' : 'var(--ink)', border: 'none', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer' }}>
              📊 3. SEO Audit ({seoScore}/100)
            </button>
          </div>

          <form onSubmit={handleSave}>
            
            {/* TAB 1: CONTENT */}
            {activeTab === 'content' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>Article Title (H1)</label>
                  <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Slug (URL Link)</label>
                  <input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label>Author</label>
                    <input type="text" className="form-input" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                  </div>
                  <div>
                    <label>Reading Time</label>
                    <input type="text" className="form-input" value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label>Category</label>
                    <input type="text" className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} required />
                  </div>
                  <div>
                    <label>Emoji Symbol</label>
                    <input type="text" className="form-input" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Featured Image URL (Postimages / Unsplash)</label>
                  <input type="text" className="form-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Excerpt / Summary (Italics Hook)</label>
                  <input type="text" className="form-input" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Main Body (Markdown / HTML)</label>
                  <textarea className="form-input" rows={12} value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
              </div>
            )}

            {/* TAB 2: SEO META */}
            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>Focus Keyword 🎯</label>
                  <input type="text" className="form-input" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="e.g. AI productivity tools" />
                </div>

                <div className="form-group">
                  <label>Secondary Keywords (Comma separated)</label>
                  <input type="text" className="form-input" value={secondaryKeywords} onChange={(e) => setSecondaryKeywords(e.target.value)} placeholder="e.g. best AI tools, workflow automation" />
                </div>

                <div className="form-group">
                  <label>Search Intent Type</label>
                  <select className="form-input" value={searchIntent} onChange={(e) => setSearchIntent(e.target.value)}>
                    <option value="Informational">Informational (User wants to learn)</option>
                    <option value="Transactional">Transactional (User wants to buy)</option>
                    <opt
