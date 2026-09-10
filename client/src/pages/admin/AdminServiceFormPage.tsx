import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Save, Eye, Plus, Trash2, CheckCircle2, 
  Search, Shield, Building2, Fingerprint, Compass, 
  FileCheck, Eye as EyeIcon, Scale, Cpu, Lock, 
  UserCheck, UserSearch, HeartHandshake, ShieldAlert,
  Camera, Briefcase, Key, Globe, Activity, MapPin,
  X, Sparkles
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button, PrimaryButton, SecondaryButton } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert } from '../../components/ui/alert';
import { Service } from '../../types';
import serviceService from '../../services/serviceService';
import { getServiceIcon } from '../../lib/iconMap';

const AVAILABLE_LUCIDE_ICONS = [
  { name: 'Search', label: 'Search / Investigation', icon: Search },
  { name: 'UserSearch', label: 'User Search / Locating', icon: UserSearch },
  { name: 'UserCheck', label: 'User Verification', icon: UserCheck },
  { name: 'HeartHandshake', label: 'Matrimonial / Trust', icon: HeartHandshake },
  { name: 'ShieldAlert', label: 'Infidelity / Threat', icon: ShieldAlert },
  { name: 'Building2', label: 'Corporate / Commercial', icon: Building2 },
  { name: 'Fingerprint', label: 'Due Diligence / Forensic', icon: Fingerprint },
  { name: 'Compass', label: 'Asset Recovery / Tracing', icon: Compass },
  { name: 'FileCheck', label: 'Background Check', icon: FileCheck },
  { name: 'Eye', label: 'Surveillance / TSCM', icon: EyeIcon },
  { name: 'Shield', label: 'Security / Defense', icon: Shield },
  { name: 'Scale', label: 'Legal / Litigation', icon: Scale },
  { name: 'Cpu', label: 'Cyber / Digital Forensics', icon: Cpu },
  { name: 'Lock', label: 'Confidentiality / Vault', icon: Lock },
  { name: 'Camera', label: 'Field Surveillance', icon: Camera },
  { name: 'Briefcase', label: 'Corporate Intelligence', icon: Briefcase },
  { name: 'Key', label: 'Authentication', icon: Key },
  { name: 'Globe', label: 'OSINT / Global Intel', icon: Globe },
  { name: 'Activity', label: 'Risk Telemetry', icon: Activity },
  { name: 'MapPin', label: 'Location Tracking', icon: MapPin },
];

const SERVICE_CATEGORIES = [
  'Personal',
  'Matrimonial',
  'Corporate',
  'Verification',
  'Security',
  'Legal Support'
];

export function AdminServiceFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Corporate');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [iconName, setIconName] = useState('Shield');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [features, setFeatures] = useState<string[]>(['']);
  
  // SEO Metadata
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      loadService(id);
    }
  }, [isEdit, id]);

  const loadService = async (serviceIdentifier: string) => {
    setLoading(true);
    setError(null);
    try {
      const allServices = await serviceService.getAdminServices();
      const match = allServices.find(s => String(s.id) === serviceIdentifier || s.slug === serviceIdentifier);
      if (match) {
        setTitle(match.title);
        setSlug(match.slug);
        setCategory(match.category);
        setShortDesc(match.short_description || '');
        setFullDesc(match.full_description || '');
        setIconName(match.icon_name || 'Shield');
        setFeaturedImage(match.featured_image || '');
        setIsFeatured(Boolean(match.is_featured));
        setIsActive(match.is_active !== false);
        setDisplayOrder(match.display_order ?? 1);
        setFeatures(match.features && match.features.length > 0 ? match.features : ['']);
        setMetaTitle(match.meta_title || '');
        setMetaDescription(match.meta_description || '');
      } else {
        setError('Requested service was not found in catalog.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load service details.');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
      if (!metaTitle) {
        setMetaTitle(`${val} | Private Investigation Services | SeekProof`);
      }
    }
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleUpdateFeature = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated.length > 0 ? updated : ['']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !shortDesc.trim()) {
      setError('Title, URL Slug, and Short Description are mandatory.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const cleanFeatures = features.map(f => f.trim()).filter(Boolean);

    const payload: Partial<Service> = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      short_description: shortDesc.trim(),
      full_description: fullDesc.trim() || undefined,
      icon_name: iconName,
      featured_image: featuredImage.trim() || undefined,
      is_featured: isFeatured,
      is_active: isActive,
      display_order: Number(displayOrder) || 1,
      features: cleanFeatures,
      meta_title: metaTitle.trim() || undefined,
      meta_description: metaDescription.trim() || undefined
    };

    try {
      if (isEdit && id) {
        await serviceService.updateService(Number(id) || (id as any), payload);
        setSuccessMessage('Investigation service updated successfully.');
      } else {
        await serviceService.createService(payload);
        setSuccessMessage('New investigation service created and published to catalog.');
      }
      setTimeout(() => {
        navigate('/admin/services');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to save investigation service.');
    } finally {
      setSubmitting(false);
    }
  };

  const SelectedIconComponent = getServiceIcon(iconName);

  const filteredIcons = AVAILABLE_LUCIDE_ICONS.filter(
    item => item.name.toLowerCase().includes(iconSearch.toLowerCase()) || 
            item.label.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-slate-900 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/services" className="text-slate-400 hover:text-slate-700">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono">
              {isEdit ? `Edit Service: ${title}` : 'Publish New Investigation Service'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure catalog details, Lucide icons, deliverables, image assets, and SEO search snippets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SecondaryButton
            size="sm"
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="text-xs font-mono"
          >
            <Eye className="h-3.5 w-3.5 mr-1" /> Preview Modal
          </SecondaryButton>
          <Link to="/admin/services">
            <Button variant="outline" size="sm" className="font-mono text-xs border-slate-300">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" title="Operation Failed">
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" title="Success">
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Core Service Attributes */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#0F1E2E] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="h-4 w-4 text-[#C5A059]" /> 1. Core Identification & Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Service Title *"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Corporate Fraud & Embezzlement Probes"
              required
            />

            <Input
              label="URL Slug *"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. corporate-fraud"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Discipline Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
              >
                {SERVICE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Lucide Icon
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIconPicker(true)}
                  className="flex items-center justify-between h-10 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 transition-colors text-xs"
                >
                  <span className="flex items-center gap-2">
                    <SelectedIconComponent className="h-4 w-4 text-[#C5A059]" />
                    <span className="font-mono text-slate-700">{iconName}</span>
                  </span>
                  <span className="text-[11px] text-blue-600 font-semibold">Change</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                min={1}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0F1E2E] focus:ring-[#0F1E2E]"
              />
              <span className="font-semibold">Active & Visible in Catalog</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0F1E2E] focus:ring-[#0F1E2E]"
              />
              <span className="font-semibold">Featured on Homepage</span>
            </label>
          </div>
        </div>

        {/* Section 2: Narrative & Scope */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#0F1E2E] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="h-4 w-4 text-[#C5A059]" /> 2. Descriptions & Scope of Investigation
          </h2>

          <Textarea
            label="Short Executive Summary (Catalog Teaser) *"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            rows={2}
            placeholder="High-impact 2-sentence summary visible in cards and service listings..."
            required
          />

          <Textarea
            label="Full Technical Methodology & Evidentiary Scope"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            rows={5}
            placeholder="Detailed narrative describing operational protocols, legal adherence, forensic standards, and chain of custody..."
          />

          <div className="space-y-1.5">
            <Input
              label="Featured Image Asset URL"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/... or /images/services/..."
            />
            {featuredImage && (
              <div className="mt-2 relative w-48 h-28 rounded-md overflow-hidden border border-slate-200 bg-slate-100">
                <img 
                  src={featuredImage} 
                  alt="Service Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Key Deliverables Builder */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#0F1E2E] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> 3. Key Investigation Deliverables
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddFeature}
              className="text-xs h-7 border-slate-300 text-slate-700"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Deliverable
            </Button>
          </div>

          <div className="space-y-2.5">
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-6 text-center">{index + 1}.</span>
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleUpdateFeature(index, e.target.value)}
                  placeholder="e.g. ISO 27037 Digital Forensics Evidence Docket"
                  className="flex-1 h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Remove Deliverable"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Search Engine Optimization (SEO) */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#0F1E2E] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="h-4 w-4 text-[#C5A059]" /> 4. SEO Search Snippet & OpenGraph
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="SEO Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="e.g. Corporate Fraud Investigation Services | SeekProof Mumbai"
            />

            <Textarea
              label="SEO Meta Description (150-160 chars)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              placeholder="Discreet forensic corporate fraud investigation services in Mumbai and across India..."
            />
          </div>

          {/* Google SERP Live Simulation */}
          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Google SERP Snippet Preview</span>
            <div className="mt-2 font-sans">
              <div className="text-xs text-slate-600 truncate">https://seekproof.in/services/{slug || 'service-slug'}</div>
              <div className="text-base text-blue-700 hover:underline cursor-pointer font-medium line-clamp-1 mt-0.5">
                {metaTitle || `${title || 'Service Title'} | SeekProof Private Investigations`}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                {metaDescription || shortDesc || 'Confidential and certified private investigation services by SeekProof Mumbai. Licensed investigators, evidentiary rigor, and 100% discretion.'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <Link to="/admin/services">
            <Button variant="ghost" size="md" type="button" className="text-slate-600 hover:text-slate-900">
              Cancel
            </Button>
          </Link>
          <PrimaryButton 
            type="submit" 
            size="md" 
            disabled={submitting}
            className="font-mono text-xs uppercase tracking-wider"
          >
            <Save className="h-4 w-4 mr-1.5" /> 
            {submitting ? 'Writing to Catalog...' : isEdit ? 'Save Changes' : 'Publish Service'}
          </PrimaryButton>
        </div>
      </form>

      {/* Lucide Icon Picker Modal */}
      {showIconPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 p-6 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold font-mono text-[#0F1E2E]">Select Lucide Service Icon</h3>
              <button 
                onClick={() => setShowIconPicker(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  placeholder="Filter icons by name or discipline..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto p-1">
              {filteredIcons.map((item) => {
                const IconComp = item.icon;
                const isSelected = iconName === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setIconName(item.name);
                      setShowIconPicker(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                      isSelected 
                        ? 'bg-[#0F1E2E] text-white border-[#C5A059] shadow-md ring-2 ring-[#C5A059]/40' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <IconComp className={`h-6 w-6 mb-1.5 ${isSelected ? 'text-[#C5A059]' : 'text-slate-600'}`} />
                    <span className="text-[10px] font-mono truncate w-full">{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowIconPicker(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Live Service Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Badge variant="navy">{category}</Badge>
                <span className="text-xs text-slate-500 font-mono">Live Service Dossier Preview</span>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F1E2E] text-[#C5A059] flex items-center justify-center shrink-0 shadow-sm">
                  <SelectedIconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0F1E2E]">{title || 'Service Title Placeholder'}</h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Slug: /services/{slug || 'untitled-service'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Executive Overview</h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {shortDesc || 'No short description provided yet.'}
                </p>
              </div>

              {fullDesc && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Methodology & Evidentiary Standards</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                    {fullDesc}
                  </p>
                </div>
              )}

              {features.filter(f => f.trim()).length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">Key Investigation Deliverables</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.filter(f => f.trim()).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowPreviewModal(false)}>
                Back to Editor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminServiceFormPage;
