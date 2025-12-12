
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageView } from '../App';

import { FeatureHero } from './FeatureHero';
import { MultiPlatformFeature } from './MultiPlatformFeature';
import { HumanBehaviorFeature } from './HumanBehaviorFeature';
import { AdaptiveSequencesFeature } from './AdaptiveSequencesFeature';
import { CRMSyncFeature } from './CRMSyncFeature';
import { WorkflowBuilderFeature } from './WorkflowBuilderFeature';
import { PrivacyFeature } from './PrivacyFeature';
import { AnalyticsFeature } from './AnalyticsFeature';
import { IntegrationShowcase } from './IntegrationShowcase';
import { ComparisonTable } from './ComparisonTable';
import { FeaturesCTA } from './FeaturesCTA';

interface FeaturesPageProps {
  onNavigate: (page: PageView) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      {/* Global Background Grid for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      </div>

      <FeatureHero onNavigate={onNavigate} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-32 pb-20 mt-12 md:mt-24">
        <div id="outreach"><MultiPlatformFeature /></div>
        <div id="behavior"><HumanBehaviorFeature /></div>
        <div id="sequences"><AdaptiveSequencesFeature /></div>
        <div id="crm"><CRMSyncFeature /></div>
        <div id="workflow"><WorkflowBuilderFeature /></div>
        <div id="privacy"><PrivacyFeature /></div>
        <div id="analytics"><AnalyticsFeature /></div>
        <div id="integrations"><IntegrationShowcase /></div>
        <ComparisonTable />
        <FeaturesCTA />
      </div>
    </div>
  );
};
