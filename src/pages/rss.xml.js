import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'TechZentrale',
    description: 'Moderne Tech‑Insights, kompakt erklärt.',
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      pubDate: new Date(post.data.date),
    })),
  });
}
