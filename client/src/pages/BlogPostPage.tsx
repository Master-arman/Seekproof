import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  User, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/badge';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';
import { getPostBySlug } from '../lib/data/blogData';
import { formatDate } from '../lib/utils';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      {/* Page Hero */}
      <PageHero
        badge={`Intelligence Briefing • ${post.category}`}
        title={post.title}
        subtitle={`Published on ${formatDate(post.publishedAt)} • ${post.readTime} • Author: ${post.author.name}`}
        breadcrumbs={[
          { label: 'Intelligence Blog', path: '/blog' },
          { label: post.title }
        ]}
        actions={
          <Link to="/blog">
            <SecondaryButton size="sm" className="font-mono text-xs rounded-sm shadow-none">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" aria-hidden="true" strokeWidth={2} /> Back to All Briefings
            </SecondaryButton>
          </Link>
        }
      />

      {/* Article Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="md" className="space-y-8">
          {/* Key Takeaways Box */}
          <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 space-y-3 shadow-none">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F1E2E] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} /> Key Intelligence Takeaways
            </h3>
            <ul className="space-y-2 pt-1">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Paragraphs */}
          <div className="bg-white p-6 sm:p-10 rounded-md border border-slate-200 space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed shadow-none">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Bio & Consultation CTA */}
          <div className="rounded-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-800 bg-white border border-slate-300 shadow-none">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                Authored by
              </span>
              <h4 className="text-base font-bold text-[#0F1E2E]">{post.author.name}</h4>
              <p className="text-xs text-slate-600 font-normal">{post.author.role}</p>
            </div>

            <Link to="/contact">
              <PrimaryButton size="md" className="shrink-0 font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
                Inquire on this Subject
              </PrimaryButton>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default BlogPostPage;
