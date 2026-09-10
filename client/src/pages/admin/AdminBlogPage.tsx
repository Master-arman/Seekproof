import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, ExternalLink, Search, 
  FileText, Clock, User, Calendar, CheckCircle2, 
  XCircle, AlertTriangle, RefreshCw, X, Save,
  Eye, Globe, Sparkles, Send, Archive, Check
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button, PrimaryButton, SecondaryButton } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Alert } from '../../components/ui/alert';
import { BlogPost, BlogPostStatus } from '../../types';
import blogService from '../../services/blogService';
import { formatDate } from '../../lib/utils';

export function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | 'published' | 'draft' | 'archived'>('all');

  // Modal / Drawer state for Create / Edit
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Editor Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Corporate Fraud');
  const [authorName, setAuthorName] = useState('Senior Investigative Analyst');
  const [featuredImage, setFeaturedImage] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(6);
  const [status, setStatus] = useState<BlogPostStatus>('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

  // Live Preview Modal
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Delete Confirmation Modal
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Notification Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.getAdminPosts();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Unable to retrieve blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('Corporate Intelligence');
    setAuthorName('Senior Investigative Analyst');
    setFeaturedImage('');
    setReadTimeMinutes(6);
    setStatus('draft');
    setMetaTitle('');
    setMetaDescription('');
    setEditorError(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category);
    setAuthorName(post.author_name);
    setFeaturedImage(post.featured_image || '');
    setReadTimeMinutes(post.read_time_minutes || 5);
    setStatus(post.status);
    setMetaTitle(post.meta_title || '');
    setMetaDescription(post.meta_description || '');
    setEditorError(null);
    setEditorOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      const genSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSlug(genSlug);
      if (!metaTitle) {
        setMetaTitle(`${val} | SeekProof Intelligence`);
      }
    }
  };

  const handleSavePost = async (explicitStatus?: BlogPostStatus) => {
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      setEditorError('Title, Slug, Excerpt, and Article Content are required.');
      return;
    }

    setSaving(true);
    setEditorError(null);

    const chosenStatus = explicitStatus || status;

    const payload: Partial<BlogPost> = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      author_name: authorName.trim(),
      featured_image: featuredImage.trim() || undefined,
      read_time_minutes: Number(readTimeMinutes) || 5,
      status: chosenStatus,
      published_at: chosenStatus === 'published' ? new Date().toISOString() : null,
      meta_title: metaTitle.trim() || undefined,
      meta_description: metaDescription.trim() || undefined
    };

    try {
      if (editingPost) {
        const updated = await blogService.updatePost(editingPost.id, payload);
        setPosts(prev => prev.map(p => p.id === editingPost.id ? updated : p));
        showToast('success', `Intelligence briefing "${updated.title}" updated.`);
      } else {
        const created = await blogService.createPost(payload);
        setPosts(prev => [created, ...prev]);
        showToast('success', `New briefing "${created.title}" published as ${chosenStatus}.`);
      }
      setEditorOpen(false);
    } catch (err: any) {
      setEditorError(err.message || 'Failed to save briefing.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setDeleteLoading(true);
    try {
      await blogService.deletePost(postToDelete.id);
      setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
      showToast('success', `Briefing "${postToDelete.title}" permanently deleted.`);
      setPostToDelete(null);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete briefing.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleQuickStatusChange = async (post: BlogPost, newStatus: BlogPostStatus) => {
    try {
      const updated = await blogService.updatePost(post.id, {
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : post.published_at
      });
      setPosts(prev => prev.map(p => p.id === post.id ? updated : p));
      showToast('success', `Briefing status changed to ${newStatus}.`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update publication status.');
    }
  };

  // Filtered List
  const filteredPosts = posts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusTab === 'all' ? true : p.status === statusTab;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st: BlogPostStatus) => {
    switch (st) {
      case 'published':
        return <Badge variant="success" className="text-[10px]">Published</Badge>;
      case 'draft':
        return <Badge variant="subtle" className="text-[10px]">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="text-[10px]">Archived</Badge>;
      default:
        return <Badge variant="navy" className="text-[10px]">{st}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900 pb-16">
      {/* Toast */}
      {toast && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all ${
            toast.type === 'success' 
              ? 'bg-[#0F1E2E] text-white border-[#C5A059]' 
              : 'bg-red-900 text-white border-red-500'
          }`}
          role="alert"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
          ) : (
            <XCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono tracking-tight flex items-center gap-2">
            Intelligence Briefings & Publications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish thought-leadership articles, cyber threat intelligence bulletins, and legal evidentiary guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchPosts} 
            disabled={loading}
            className="text-xs border-slate-300 text-slate-700"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <PrimaryButton size="sm" onClick={handleOpenCreate} className="font-mono text-xs shadow-sm">
            <Plus className="h-4 w-4 mr-1" /> New Intelligence Briefing
          </PrimaryButton>
        </div>
      </div>

      {/* Search & Status Filter Tabs */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs w-full md:w-auto">
          {(['all', 'published', 'draft', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-all ${
                statusTab === tab 
                  ? 'bg-white text-[#0F1E2E] shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? `All (${posts.length})` : `${tab} (${posts.filter(p => p.status === tab).length})`}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search briefings by title, author, or excerpt..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-[#C5A059] mb-3" />
            <p className="text-xs font-mono uppercase tracking-wider">Loading intelligence briefs...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p className="font-semibold text-sm">{error}</p>
            <Button size="sm" onClick={fetchPosts} className="mt-4 text-xs">Try Again</Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="h-10 w-10 mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No Briefings Found</h3>
            <p className="text-xs text-slate-500 mt-1">Get started by authoring a new thought leadership piece.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] bg-slate-50">
                <tr>
                  <th className="py-3.5 px-4">Title & Briefing Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status & Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Title and Excerpt */}
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-[#0F1E2E] text-sm line-clamp-1">{post.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>/blog/{post.slug}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.read_time_minutes || 5} min read
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <Badge variant="navy" className="text-[10px]">
                        {post.category}
                      </Badge>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#0F1E2E] text-[#C5A059] flex items-center justify-center font-bold text-[10px] shrink-0">
                          {post.author_name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800 text-xs">{post.author_name}</span>
                      </div>
                    </td>

                    {/* Status & Date */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div>{getStatusBadge(post.status)}</div>
                        <div className="font-mono text-[10px] text-slate-400">
                          {post.published_at ? formatDate(post.published_at) : 'Not published'}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-[#0F1E2E] hover:bg-slate-100 transition-colors"
                          title="Quick Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {post.status === 'published' && (
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md text-slate-500 hover:text-[#0F1E2E] hover:bg-slate-100 transition-colors"
                            title="View Public Briefing"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(post)}
                          className="h-7 text-[10px] border-slate-300 text-slate-700 hover:bg-slate-100 px-2"
                        >
                          <Edit2 className="h-3 w-3 mr-1" /> Edit
                        </Button>
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Briefing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal / Drawer */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-base font-bold font-mono text-[#0F1E2E]">
                  {editingPost ? `Edit Briefing: ${editingPost.title}` : 'Compose Intelligence Briefing'}
                </h3>
                <p className="text-[11px] text-slate-500">Draft or publish thought leadership for client advisories.</p>
              </div>
              <button 
                onClick={() => setEditorOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {editorError && (
                <Alert variant="destructive" title="Validation Error">
                  {editorError}
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Article Title *"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Uncovering Offshore Conduits: Forensic Asset Tracing"
                  required
                />

                <Input
                  label="URL Slug *"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. forensic-asset-tracing-methods"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                  >
                    <option value="Corporate Fraud">Corporate Fraud</option>
                    <option value="Cyber & OSINT">Cyber & OSINT</option>
                    <option value="Asset Recovery">Asset Recovery</option>
                    <option value="Due Diligence">Due Diligence</option>
                    <option value="Legal & Forensics">Legal & Forensics</option>
                    <option value="Personal Security">Personal Security</option>
                  </select>
                </div>

                <Input
                  label="Author Name *"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Senior Investigative Analyst"
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={readTimeMinutes}
                    onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                    min={1}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                  />
                </div>
              </div>

              <Textarea
                label="Executive Excerpt (Summary for Cards) *"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="2-3 sentence overview highlighting the investigative challenge and findings..."
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Full Article Content (Markdown or Structured Text) *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Detailed investigative report, methodology, case evidence breakdown, and conclusions..."
                  className="flex w-full rounded-md border border-slate-300 bg-white p-3 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Featured Image URL"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live to Public)</option>
                    <option value="archived">Archived (Delisted)</option>
                  </select>
                </div>
              </div>

              {/* SEO Meta */}
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#C5A059]" /> Search Engine Optimization (SEO)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="SEO Meta Title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="e.g. Offshore Asset Tracing Guide | SeekProof"
                  />
                  <Input
                    label="SEO Meta Description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="In-depth forensic briefing on asset recovery..."
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono">
                Status: <strong className="uppercase text-[#0F1E2E]">{status}</strong>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditorOpen(false)}>
                  Cancel
                </Button>
                <SecondaryButton 
                  size="sm" 
                  onClick={() => handleSavePost('draft')} 
                  disabled={saving}
                  className="text-xs font-mono"
                >
                  <Save className="h-3.5 w-3.5 mr-1" /> Save Draft
                </SecondaryButton>
                <PrimaryButton 
                  size="sm" 
                  onClick={() => handleSavePost('published')} 
                  disabled={saving}
                  className="text-xs font-mono"
                >
                  <Send className="h-3.5 w-3.5 mr-1" /> {saving ? 'Publishing...' : 'Publish Live'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Badge variant="gold">{previewPost.category}</Badge>
                {getStatusBadge(previewPost.status)}
              </div>
              <button 
                onClick={() => setPreviewPost(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[#0F1E2E] leading-tight">{previewPost.title}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono border-b border-slate-100 pb-3">
                <span>By {previewPost.author_name}</span>
                <span>•</span>
                <span>{previewPost.published_at ? formatDate(previewPost.published_at) : 'Draft'}</span>
                <span>•</span>
                <span>{previewPost.read_time_minutes || 5} min read</span>
              </div>

              <p className="text-sm font-semibold text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded border border-slate-100">
                "{previewPost.excerpt}"
              </p>

              <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {previewPost.content}
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewPost(null)}>
                Close Preview
              </Button>
              <PrimaryButton size="sm" onClick={() => { setPreviewPost(null); handleOpenEdit(previewPost); }}>
                <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit Briefing
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 p-6 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900">Delete Intelligence Briefing?</h3>
            <p className="text-xs text-center text-slate-500 mt-2">
              Are you sure you want to delete <strong className="text-slate-800">"{postToDelete.title}"</strong>? 
              This will permanently delist the article and remove its public URL.
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPostToDelete(null)}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Deletion'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlogPage;
