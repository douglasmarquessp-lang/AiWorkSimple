'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveArticleAction, deleteArticleAction, getArticlesAction } from './actions';

export default function AdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'audit'>('content');
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
  const [focusKeyword, setFocusKeyword] = useState('AI productivity tools');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    getArticlesAction().then((res: any) => setArticles(res || []));
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('id');
    if (editId) {
      getArticlesAction().then((res: any) => {
        const art = res.find((a: any) => a.id === editId);
        if (art) {
          setId(art.id); setTitle(art.title); setSlug(art.slug);
          setAuthorName(art.authorName || 'Douglas Marques'); setCategory(art.category);
          setEmoji(art.emoji); setImageUrl(art.imageUrl || ''); setReadTime(art.readTime);
          setExcerpt(art.excerpt); setContent(art.content); setMetaDescription(art.metaDescription || '');
          setIsFeatured(art.isFeatured); setIsTrending(art.isTrending); setPublished(art.published);
        }
      });
    }
  }, []);

  // SEO REAL-TIME AUDIT
  const auditKeywordInTitle = title.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  const auditKeywordInIntro = content.slice(0, 200).toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  const auditKeywordInMeta = metaDescription.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword !== '';
  const words = content.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const keywordMatches = focusKeyword ? (content.match(new RegExp(focusKeyword, 'gi')) || []).length : 0;
  const keywordDensity = totalWords > 0 ? parseFloat(((keywordMatches / totalWords) * 100).toFixed(1)) : 0;
  const isDensityHealthy = keywordDensity >= 0.8 && keywordDensity <= 2.5;
  const internalLinks = (content.match(/href="\/(articles|noticias|\?)/gi) || []).length;
  const externalLinks = (content.match(/href="https?:\/\/(?!aiworksimple\.com)[^"]+"/gi) || []).length;

  let seoScore = 30;
  if (auditKeywordInTitle) seoScore += 20;
  if (auditKeywordInIntro) seoScore += 15;
  if (auditKeywordInMeta) seoScore += 15;
  if (isDensityHealthy) seoScore += 10;
  if (internalLinks >= 2) seoScore += 5;
  if (externalLinks >= 3) seoScore += 5;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveArticleAction({ id, title, slug, excerpt, content, category, emoji, imageUrl, authorName, metaDescription, published, readTime, isFeatured, isTrending });
    if (result?.success) window.location.href = '/admin';
    else alert('Error: ' + result?.error);
  };

  const handleDelete = async (artId: string) => {
    if (confirm('Delete this article?')) {
      const result = await deleteArticleAction(artId);
      if (result?.success) window.location.href = '/admin';
    }
  };

  return (
    <div className="page" style={{ marginTop: '30px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', marginBottom: '20px' }}>
        {id ? 'Advanced Article Editor ⚡' : 'Advanced SEO Publisher Dashboard ⚡'}
      </h1>

      <div className="two-col" style={{ gridTemplateColumns: '1fr 340px' }}>
        <div className="col-main" style={{ padding: '30px', background: '#fff', border: '2.5px solid var(--ink)', borderRadius: '6px' }}>
          
          {/* TABS */}
          <div style={{ display: 'flex', borderBottom: '2.5px solid var(--ink)', marginBottom: '25px' }}>
            <button type="button" onClick={() => setActiveTab('content')} style={{ flex: 1, padding: '12px', background: activeTab === 'content' ? 'var(--ink)' : 'none', color: activeTab === 'content' ? '#fff' : 'var(--ink)', border: 'none', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>📝 1. Content</button>
            <button type="button" onClick={() => setActiveTab('seo')} style={{ flex: 1, padding: '12px', background: activeTab === 'seo' ? 'var(--ink)' : 'none', color: activeTab === 'seo' ? '#fff' : 'var(--ink)', borderLeft: '2.5px solid var(--ink)', borderRight: '2.5px solid var(--ink)', borderBottom: 'none', borderTop: 'none', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>🔍 2. SEO Meta</button>
            <button type="button" onClick={() => setActiveTab('audit')} style={{ flex: 1, padding: '12px', background: activeTab === 'audit' ? 'var(--ink)' : 'none', color: activeTab === 'audit' ? '#fff' : 'var(--ink)', border: 'none', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>📊 3. SEO Audit ({seoScore}/100)</button>
          </div>

          <form onSubmit={handleSave}>
            <input type="hidden" name="id" value={id} />

            {activeTab === 'content' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group"><label>Article Title (H1)</label><input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="form-group"><label>Slug (URL Link)</label><input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} required /></div>
                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div><label>Author</label><input type="text" className="form-input" value={authorName} onChange={(e) => setAuthorName(e.target.value)} /></div>
                  <div><label>Reading Time</label><input type="text" className="form-input" value={readTime} onChange={(e) => setReadTime(e.target.value)} /></div>
                </div>
                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div><label>Category</label><input type="text" className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} required /></div>
                  <div><label>Emoji Symbol</label><input type="text" className="form-input" value={emoji} onChange={(e) => setEmoji(e.target.value)} /></div>
                </div>
                <div className="form-group"><label>Featured Image URL</label><input type="text" className="form-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /></div>
                <div className="form-group"><label>Excerpt / Summary</label><input type="text" className="form-input" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required /></div>
                <div className="form-group"><label>Main Body</label><textarea className="form-input" rows={10} value={content} onChange={(e) => setContent(e.target.value)} required></textarea></div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group"><label>Focus Keyword 🎯</label><input type="text" className="form-input" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} /></div>
                <div className="form-group"><label>SEO Meta Description (Google snippet)</label><textarea className="form-input" rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}></textarea></div>
                <div className="form-group" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label className="form-checkbox"><input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publish Article</label>
                  <label className="form-checkbox"><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} /> Featured</label>
                  <label className="form-checkbox"><input type="checkbox" checked={isTrending} onChange={(e) => setIsTrending(e.target.checked)} /> Trending</label>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '15px', background: 'var(--warm)', border: '2px solid var(--ink)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div><strong>Live Audit Summary</strong><p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Calculated dynamically as you type.</p></div>
                  <div style={{ background: 'var(--ink)', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}><strong>{seoScore}</strong></div>
                </div>
                <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>Focus keyword in Title: {auditKeywordInTitle ? '✅ Yes' : '❌ Missing'}</div>
                  <div>Focus keyword in Intro: {auditKeywordInIntro ? '✅ Yes' : '❌ Missing'}</div>
                  <div>Focus keyword in Meta Desc: {auditKeywordInMeta ? '✅ Yes' : '❌ Missing'}</div>
                  <div>Keyword density: <strong>{keywordDensity}%</strong> {isDensityHealthy ? '✅ Ideal' : '⚠️ Unbalanced'}</div>
                  <div>Links: {internalLinks} Internal · {externalLinks} External</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
              <button type="submit" className="admin-btn">{id ? 'Save Changes' : 'Publish Article'}</button>
              {id && <button type="button" onClick={() => window.location.href = '/admin'} className="admin-btn" style={{ background: '#72728a' }}>Cancel</button>}
            </div>
          </form>
        </div>

        {/* SIDEBAR LIST */}
        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)', border: '2.5px solid var(--ink)', borderRadius: '6px', height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', marginBottom: '15px' }}>Articles ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {articles.map((art: any) => (
              <div key={art.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 800 }}>{art.category}</span>
                  <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '2px', background: art.published ? 'rgba(0,184,122,0.1)' : 'rgba(114,112,138,0.1)', color: art.published ? 'var(--green)' : 'var(--muted)' }}>{art.published ? 'Published' : 'Draft'}</span>
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0 4px 0' }}>{art.title}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>👁️ {art.views} views</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => window.location.href = `/admin?id=${art.id}`} className="admin-btn" style={{ background: 'var(--cyan)', color: 'var(--ink)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', border: 'none', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(art.id)} className="admin-btn" style={{ background: 'var(--red)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', border: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
              }
