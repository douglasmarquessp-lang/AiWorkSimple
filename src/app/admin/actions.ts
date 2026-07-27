'use server';

import { db } from '../../lib/db';
import { revalidatePath } from 'next/cache';

// Ação para criar ou atualizar artigos
export async function saveArticleAction(data: any) {
  const { id, title, slug, excerpt, content, category, emoji, imageUrl, authorName, metaDescription, published, readTime, isFeatured, isTrending } = data;

  if (!title || !slug) return { success: false, error: 'Title and Slug are required.' };

  const articleData = {
    title,
    slug,
    excerpt,
    content,
    category,
    emoji,
    imageUrl: imageUrl || null,
    authorName: authorName || "Douglas Marques",
    metaDescription: metaDescription || null,
    published: !!published,
    readTime,
    isFeatured: !!isFeatured,
    isTrending: !!isTrending,
  };

  try {
    if (id) {
      await db.article.update({
        where: { id },
        data: articleData,
      });
    } else {
      await db.article.create({
        data: articleData,
      });
    }
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Ação para excluir artigos
export async function deleteArticleAction(id: string) {
  if (!id) return { success: false, error: 'ID is required.' };

  try {
    await db.article.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Ação para obter a lista de artigos atualizada
export async function getArticlesAction() {
  try {
    return await db.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}
