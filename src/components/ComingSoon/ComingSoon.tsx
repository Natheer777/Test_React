import './ComingSoon.css';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  showNewsletter?: boolean;
  showTimeline?: boolean;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  subtitle = "We're working on something amazing!",
  description = "This feature is currently under development. Stay tuned for updates!",
 
}) => {
  return (
    <div className="coming-soon-container">
      {/* Hero Section */}
      <div className="coming-soon-hero">
        <div className="hero-content">
          <div className="coming-soon-icon hidden">
            ⌛
          </div>
          <h1 className="coming-soon-title top">{title}</h1>
          <p className="coming-soon-subtitle top">{subtitle}</p>
          <div className="coming-soon-description top">
            <p>{description}</p>
          </div>
        </div>
      
      </div>

    </div>
  );
};
