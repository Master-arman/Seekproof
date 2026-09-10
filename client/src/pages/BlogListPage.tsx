import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ChevronRight, User, BookOpen } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { ResponsiveGrid } from '../components/ui/ResponsiveGrid';
import { Badge } from '../components/ui/badge';
import { blogPosts } from '../lib/data/blogData';
import { formatDate } from '../lib/utils';

export function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Forensics', 'Corporate', 'Asset Tracing', 'Security'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      {/* Page Hero */}
      <PageHero
        badge="Intelligence & Analysis"
        title="Forensic Insights & Intelligence Briefings"
        subtitle="Analyses, case breakdowns, and technical perspectives on digital forensics, cross-border asset tracing, and corporate intelligence."
        breadcrumbs={[{ label: 'Intelligence Blog' }]}
      />

      {/* Filter and Articles Grid */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="xl" className="space-y-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search briefings..."
                aria-label="Search briefings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-sm bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] shadow-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0F1E2E] text-white font-bold'
                      : 'bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <ResponsiveGrid columns={3} gap="lg">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-md border border-slate-200 p-6 flex flex-col justify-between shadow-none hover:border-slate-400 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] rounded-sm">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Clock className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0F1E2E] hover:underline transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono">
                    {post.author.name}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#0F1E2E] hover:underline flex items-center gap-1 transition-colors"
                  >
                    Read Briefing <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  </Link>
                </div>
              </article>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>
    </div>
  );
}

export default BlogListPage;
