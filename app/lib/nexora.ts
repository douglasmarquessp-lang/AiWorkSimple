export interface NexoraArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  body?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
}

const mockTestArticle: NexoraArticle = {
  id: "test-nexora-123",
  title: "Test Article: Nexora Integration Success",
  slug: "test-article",
  excerpt: "This is a successful proof-of-concept integration test demonstrating that the AIWorkSimple server-side layer can receive and render data from the external Nexora CMS.",
  content: "<h3>Welcome to the Integration Test</h3><p>If you can read this text, the server-side Next.js route has successfully processed the article payload. The styling matches your custom brutalist layout, utilizing organic forest greens and robust borders.</p><h3>Next Steps</h3><p>Configure the real NEXORA_API_URL and NEXORA_API_KEY environment variables in your server settings to connect your live production database feed.</p>",
  category: "Integration",
  tags: ["Nexora", "Nextjs", "API", "Test"],
  author: "Nexora System",
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800",
  featuredImageAlt: "Nexora Integration Server Room",
  metaTitle: "Nexora CMS Integration Test",
  metaDescription: "Verify your server-side Next.js integration with the Nexora CMS.",
  canonicalUrl: "https://aiworksimple.com/articles/test-article"
};

export async function getNexoraArticleBySlug(slug: string): Promise<NexoraArticle | null> {
  const apiUrl = process.env.NEXORA_API_URL;
  const apiKey = process.env.NEXORA_API_KEY;

  if (slug === 'test-article' && (!apiUrl || apiUrl.includes('YOUR-NEXORA-API-ENDPOINT'))) {
    return mockTestArticle;
  }

  if (!apiUrl || apiUrl.includes('YOUR-NEXORA-API-ENDPOINT')) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      next: { revalidate: 60 },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Nexora API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data as NexoraArticle;
  } catch (error) {
    console.error('Error fetching article from Nexora:', error);
    return null;
  }
}
