import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNexoraArticleBySlug } from '../../../lib/nexora';

interface Props {
  params: {
    slug: string;
  };
}

// Geração de metadados dinâmicos para SEO em Inglês
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNexoraArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const canonical = article.canonicalUrl || undefined;

  return {
    title: `${title} | AIWorkSimple`,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.featuredImage ? [{ url: article.featuredImage, alt: article.featuredImageAlt }] : undefined,
    },
  };
}

// Sanitização básica nativa de segurança para o HTML
function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '');
}

export default async function NexoraArticlePage({ params }: Props) {
  const article = await getNexoraArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const contentHtml = article.content || article.body || '';
  const sanitizedContent = sanitizeHtml(contentHtml);

  return (
    <div className="page" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div className="two-col">
        <div className="col-main" style={{ padding: '30px', background: '#fff', border: '2.5px solid var(--ink)', borderRadius: '6px' }}>
          {article.category && (
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {article.category}
            </span>
          )}
          
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', lineHeight: '1.1', marginTop: '10px', marginBottom: '15px' }}>
            {article.title}
          </h1>

          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            {article.author && <span>By {article.author}</span>}
            {article.author && article.publishedAt && <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--red)' }}></div>}
            {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('en-US')}</span>}
          </div>

          {article.featuredImage && (
            <div style={{ marginBottom: '25px' }}>
              <img 
                src={article.featuredImage} 
                alt={article.featuredImageAlt || article.title} 
                style={{ width: '100%', borderRadius: '4px', border: '2px solid var(--ink)' }} 
              />
            </div>
          )}

          {article.excerpt && (
            <p style={{ fontFamily: 'var(--font-lora)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '30px', borderLeft: '3px solid var(--red)', paddingLeft: '15px' }}>
              {article.excerpt}
            </p>
          )}

          <div 
            style={{ fontFamily: 'var(--font-lora)', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--ink)' }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent.replace(/\n/g, '<br />') }}
          />

          {article.tags && article.tags.length > 0 && (
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="tag" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-side" style={{ padding: '20px', background: 'var(--warm)', height: 'fit-content', border: '2.5px solid var(--ink)', borderRadius: '6px' }}>
          <h4 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', marginBottom: '10px' }}>Integration Info</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: '1.5' }}>
            This page is generated in real-time by fetching article data from the Nexora CMS endpoint.
          </p>
          <div style={{ width: '100%', height: '1.5px', background: 'var(--border)', margin: '15px 0' }}></div>
          <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>
            Source: Nexora API
          </p>
        </div>
      </div>
    </div>
  );
}
