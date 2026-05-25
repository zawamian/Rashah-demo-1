import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitInquiryApi } from '../data/products';
import { InquiryFormInput } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, Globe, Clock, Building, User, PenTool, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Connect() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<InquiryFormInput>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'stockist',
    message: ''
  });

  // Track touches to enable interactive instant "inline" validation on blur or change
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Simple validate helper that returns current errors
  const getErrors = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = t('err_name_required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = t('err_email_required');
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t('err_email_invalid');
    }

    if (!formData.company.trim()) {
      errors.company = t('err_company_required');
    }

    if (!formData.message.trim()) {
      errors.message = t('err_msg_required');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('err_msg_length');
    }

    return errors;
  };

  const errors = getErrors();

  const handleBlur = (field: keyof InquiryFormInput) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof InquiryFormInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // TanStack Query Mutation for Inquiry submission
  const mutation = useMutation({
    mutationFn: submitInquiryApi,
    onSuccess: () => {
      // Clear states on success
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'stockist',
        message: ''
      });
      setTouched({});
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched to display errors if any
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);

    if (Object.keys(errors).length === 0) {
      mutation.mutate(formData);
    }
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#151515] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Page title */}
        <div className="border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-8 mb-16 text-left">
          <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-2">
            {t('connect_partnerships')}
          </span>
          <h2 id="connect-page-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
            {t('connect_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column - Logistics & Credentials (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8 border-b lg:border-b-0 pb-12 lg:pb-0 border-brand-charcoal/10 dark:border-brand-cream/10 text-left">
            <div>
              <span className="font-mono-data text-[10px] tracking-[0.2em] text-brand-ochre uppercase font-bold block mb-4">
                {t('connect_stockist_registry')}
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-cream mb-6">
                {t('connect_rep_excellence')}
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed max-w-sm mb-8 text-justify">
                {t('connect_rep_desc')}
              </p>

              {/* Specifications block */}
              <div className="flex flex-col gap-6 font-sans">
                
                {/* Channel 1 */}
                <div className="flex gap-4 items-start pb-5 border-b border-brand-charcoal/5 dark:border-brand-cream/5">
                  <Mail className="text-brand-terracotta shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                  <div>
                    <span className="block text-[10px] tracking-widest text-brand-ochre uppercase font-bold">{t('connect_digital_inbox')}</span>
                    <a href="mailto:curated@rashah.com" className="text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream font-medium hover:underline">
                      curated@rashah.sa
                    </a>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex gap-4 items-start pb-5 border-b border-brand-charcoal/5 dark:border-brand-cream/5">
                  <Globe className="text-brand-terracotta shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                  <div>
                    <span className="block text-[10px] tracking-widest text-brand-ochre uppercase font-bold">{t('connect_logistics_centre')}</span>
                    <span className="text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream font-medium block">
                      {t('connect_logistics_addr')}
                    </span>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex gap-4 items-start">
                  <Clock className="text-brand-terracotta shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                  <div>
                    <span className="block text-[10px] tracking-widest text-brand-ochre uppercase font-bold">{t('connect_timing_lbl')}</span>
                    <span className="text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream font-medium">
                      {t('connect_timing_val')}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Subtle editorial notice design */}
            <div className="bg-brand-cream dark:bg-brand-charcoal/30 border border-brand-charcoal/10 dark:border-brand-cream/10 p-5 mt-4 text-justify">
              <span className="text-[11px] text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans block italic">
                {t('connect_bespoke_note')}
              </span>
            </div>
          </div>

          {/* Right Column - Beautiful aligned inquiry form (Span 7) */}
          <div className="lg:col-span-7 bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 dark:border-brand-cream/10 p-8 sm:p-10 relative">
            
            <AnimatePresence mode="wait">
              {mutation.isSuccess ? (
                /* Beautiful success confirmation view */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <CheckCircle2 size={48} className="text-brand-terracotta mx-auto mb-6" strokeWidth={1.5} />
                  <h4 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-cream mb-4">
                    {t('connect_form_verification')}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed max-w-md mx-auto mb-8 text-center">
                    {t('form_success_desc')}
                  </p>
                  
                  <button
                    id="submit-another-btn"
                    onClick={() => {
                      mutation.reset();
                    }}
                    className="px-6 py-3 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream font-sans text-xs tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer"
                  >
                    {t('connect_submit_another')}
                  </button>
                </motion.div>
              ) : (
                /* Primary Contact Form */
                <form id="contact-inquiry-form" onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
                  
                  <div className="flex items-center gap-2 mb-4 border-b border-brand-charcoal/5 dark:border-brand-cream/5 pb-4">
                    <ClipboardCheck className="text-brand-ochre" size={16} />
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-extrabold uppercase">
                      {t('connect_dossier_spec')}
                    </span>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label id="lbl-name" className="block text-[10px] font-mono-data tracking-widest text-brand-ochre font-extrabold uppercase mb-2">
                      {t('connect_lbl_name')}
                    </label>
                    <div className="relative">
                      <User size={13} className="absolute left-3.5 top-3.5 text-brand-charcoal/40 dark:text-brand-cream/40" />
                      <input
                        id="form-name"
                        type="text"
                        placeholder={t('connect_placeholder_name')}
                        value={formData.name}
                        onBlur={() => handleBlur('name')}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-brand-cream/35 dark:bg-brand-charcoal/30 border-b ${
                          touched.name && errors.name 
                            ? 'border-[#A82E2E] focus:outline-none focus:border-[#A82E2E]' 
                            : 'border-brand-charcoal/20 dark:border-brand-cream/20 focus:outline-none focus:border-brand-terracotta'
                        } text-xs font-sans text-brand-charcoal dark:text-brand-cream transition-colors duration-200 placeholder-brand-charcoal/30 dark:placeholder-brand-cream/30`}
                      />
                    </div>
                    {/* Instant Inline validation error printed in deep dry red as explicitly instructed */}
                    {touched.name && errors.name && (
                      <span id="err-name" className="block text-[10px] text-[#A82E2E] font-medium mt-1.5 font-sans leading-none">
                        ✦ {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label id="lbl-email" className="block text-[10px] font-mono-data tracking-widest text-brand-ochre font-extrabold uppercase mb-2">
                      {t('connect_lbl_email')}
                    </label>
                    <div className="relative">
                      <Mail size={13} className="absolute left-3.5 top-3.5 text-brand-charcoal/40 dark:text-brand-cream/40" />
                      <input
                        id="form-email"
                        type="email"
                        placeholder={t('connect_placeholder_email')}
                        value={formData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-brand-cream/35 dark:bg-brand-charcoal/30 border-b ${
                          touched.email && errors.email 
                            ? 'border-[#A82E2E] focus:outline-none focus:border-[#A82E2E]' 
                            : 'border-brand-charcoal/20 dark:border-brand-cream/20 focus:outline-none focus:border-brand-terracotta'
                        } text-xs font-sans text-brand-charcoal dark:text-brand-cream transition-colors duration-200 placeholder-brand-charcoal/30 dark:placeholder-brand-cream/30`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <span id="err-email" className="block text-[10px] text-[#A82E2E] font-medium mt-1.5 font-sans leading-none">
                        ✦ {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Company/Establishment Input */}
                  <div>
                    <label id="lbl-company" className="block text-[10px] font-mono-data tracking-widest text-brand-ochre font-extrabold uppercase mb-2">
                      {t('connect_lbl_company')}
                    </label>
                    <div className="relative">
                      <Building size={13} className="absolute left-3.5 top-3.5 text-brand-charcoal/40 dark:text-brand-cream/40" />
                      <input
                        id="form-company"
                        type="text"
                        placeholder={t('connect_placeholder_company')}
                        value={formData.company}
                        onBlur={() => handleBlur('company')}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-brand-cream/35 dark:bg-brand-charcoal/30 border-b ${
                          touched.company && errors.company
                            ? 'border-[#A82E2E] focus:outline-none focus:border-[#A82E2E]'
                            : 'border-brand-charcoal/20 dark:border-brand-cream/20 focus:outline-none focus:border-brand-terracotta'
                        } text-xs font-sans text-brand-charcoal dark:text-brand-cream transition-colors duration-200 placeholder-brand-charcoal/30 dark:placeholder-brand-cream/30`}
                      />
                    </div>
                    {touched.company && errors.company && (
                      <span id="err-company" className="block text-[10px] text-[#A82E2E] font-medium mt-1.5 font-sans leading-none">
                        ✦ {errors.company}
                      </span>
                    )}
                  </div>

                  {/* Inquiry Type Slider / Selector */}
                  <div>
                    <label id="lbl-type" className="block text-[10px] font-mono-data tracking-widest text-brand-ochre font-extrabold uppercase mb-2">
                      {t('connect_lbl_type')}
                    </label>
                    <select
                      id="form-inquiry-type"
                      value={formData.inquiryType}
                      onChange={(e) => handleChange('inquiryType', e.target.value)}
                      className="w-full px-4 py-3 bg-brand-cream dark:bg-brand-charcoal border-b border-brand-charcoal/20 dark:border-brand-cream/20 text-xs font-sans text-brand-charcoal dark:text-brand-cream focus:outline-none focus:border-brand-terracotta cursor-pointer"
                    >
                      <option value="stockist">{t('connect_opt_stockist')}</option>
                      <option value="custom">{t('connect_opt_custom')}</option>
                      <option value="general">{t('connect_opt_general')}</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label id="lbl-message" className="block text-[10px] font-mono-data tracking-widest text-brand-ochre font-extrabold uppercase mb-2">
                      {t('connect_lbl_msg')}
                    </label>
                    <div className="relative">
                      <PenTool size={13} className="absolute left-3.5 top-3.5 text-brand-charcoal/40 dark:text-brand-cream/40" />
                      <textarea
                        id="form-message"
                        rows={4}
                        placeholder={t('connect_placeholder_msg')}
                        value={formData.message}
                        onBlur={() => handleBlur('message')}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-brand-cream/35 dark:bg-brand-charcoal/30 border-b ${
                          touched.message && errors.message
                            ? 'border-[#A82E2E] focus:outline-none focus:border-[#A82E2E]'
                            : 'border-brand-charcoal/20 dark:border-brand-cream/20 focus:outline-none focus:border-brand-terracotta'
                        } text-xs font-sans text-brand-charcoal dark:text-brand-cream transition-colors duration-200 placeholder-brand-charcoal/30 dark:placeholder-brand-cream/30 resize-none`}
                      />
                    </div>
                    {touched.message && errors.message && (
                      <span id="err-message" className="block text-[10px] text-[#A82E2E] font-medium mt-1.5 font-sans leading-none">
                        ✦ {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit CTA button with dynamic loading query state */}
                  <div className="pt-4">
                    <button
                      id="submit-form-btn"
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full text-center py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream disabled:bg-brand-charcoal/50 text-xs tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer uppercase flex items-center justify-center gap-3"
                    >
                      {mutation.isPending ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border border-brand-cream dark:border-brand-charcoal border-t-transparent animate-spin" />
                          <span>{t('connect_transmitting')}</span>
                        </>
                      ) : (
                        t('connect_submit_btn')
                      )}
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
