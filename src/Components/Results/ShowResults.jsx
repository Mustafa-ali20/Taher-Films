import React, { useState } from "react";
import {
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Instagram,
  Youtube,
} from "lucide-react";
import "./ResultsPage.css";

// TikTok Icon Component (since lucide-react doesn't have it)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function ResultsPage() {
  const [data] = useState([
    {
      photo: "/images/testi/Abdu.jpg",
      name: "Abdu Tayyib",
      instagram: "@brewwithabdu",
      youtube: "brewwithabdu",
      views: "1.5M+",
      averageViews: "300K",
      growthRate: "233%",
      collabPeriod: "2 years",
      keyRoles: ["Content Manager", "Production Manager"],
      associatedNames: [
        "Mansoor Al-Mansoor",
        "Khalid Al Zanki",
        "Mohammad Jafar",
      ],
      profession: "First English podcast in Kuwait",
    },
    {
      photo: "/images/testi/ak-crop.jpg",
      name: "Abdul Kareem",
      instagram: "@akfoodvlogg, @akvloggs, @akupdatesyou",
      views: "4M+",
      averageViews: "50K",
      growthRate: "44.45%",
      collabPeriod: "5 months",
      keyRoles: ["Scriptwriting", "Creative", "Direction", "Editing"],
      associatedBrands: [
        { name: "Tim Hortons", logo: "/images/brands/Tim_Hortons.png" },
        { name: "Chery", logo: "/images/brands/chery.png" },
        { name: "Exeed", logo: "/images/brands/exeed.png" },
        { name: "Caesars", logo: "/images/brands/caesers.png" },
        { name: "Nesto", logo: "/images/brands/nesto.png" },
      ],
      profession: "Top Indian food vlogger in Kuwait.",
    },
    {
      photo: "/images/testi/hk.jpg",
      name: "Hussain Hakim",
      instagram: "@hussainhk",
      tiktok: "@its_hussainhk",
      views: "7M+",
      averageViews: "86.5K",
      growthRate: "40%",
      collabPeriod: "9 months",
      collabPeriodOngoing: true,
      keyRoles: ["Scriptwriting", "Creative", "Direction", "Editing"],
      associatedBrands: [
        { name: "Ooredoo", logo: "/images/brands/Ooredoo.png" },
        { name: "Lulu Exchange", logo: "/images/brands/lulu.png" },
        { name: "Xcite Alghanim", logo: "/images/brands/xcite.png" },
        { name: "Vivo", logo: "/images/brands/vivo.png" },
        { name: "Oppo", logo: "/images/brands/oppo.png" },
      ],
      profession: "#1 Indian creator in Kuwait.",
    },
    {
      photo: "/images/testi/anwar.jpg",
      name: "Anwar Hakim",
      instagram: "@smb_anwarhakim",
      views: "180K",
      averageViews: "46K",
      growthRate: "N/A",
      collabPeriod: "2 months",
      collabPeriodOngoing: true,
      keyRoles: ["Content Strategy", "Production Lead"],
      work: ["Exhibtions", "Luxurious Chalet's", "Office makeovers"],
      profession: "Interior Architect",
    },
    
  ]);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    unit,
    colorClass,
    isOngoing,
  }) => (
    <div
      className={`results-page__stats-card results-page__stats-card--${colorClass}`}
    >
      <div className="results-page__stats-card-overlay" />
      <div className="results-page__stats-card-content">
        <div className="results-page__stats-card-header">
          <span className="results-page__stats-card-label">{label}</span>
          <div className="results-page__stats-card-icon-wrapper">
            <Icon />
          </div>
        </div>
        <div className="results-page__stats-card-value-container">
          <p className="results-page__stats-card-value">
            {value}{" "}
            {isOngoing && (
              <span className="results-page__stats-card-ongoing">Ongoing</span>
            )}
          </p>
          <p className="results-page__stats-card-unit">{unit}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="results-page">
      {/* Client Results Heading */}
      <div className="text-center py-12 md:py-16 lg:pt-20 lg:pb-5">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white">
          <span className="font-[villo]">Clients' </span>
          <span className="font-[apple]">Results.</span>
        </h1>
      </div>

      {data.map((creator, index) => (
        <div key={index} className="results-page__container">
          <div className="results-page__content">
            {/* Left Side - Profile */}
            <div className="results-page__profile">
              <div className="results-page__profile-sticky">
                <div className="results-page__profile-wrapper">
                  <div className="results-page__profile-image-container">
                    <img src={creator.photo} alt={creator.name} />
                  </div>
                </div>

                <div className="results-page__profile-info">
                  <h1 className="results-page__profile-name">{creator.name}</h1>
                  <p className="results-page__profile-profession">
                    {creator.profession}
                  </p>

                  <div className="results-page__profile-social-links">
                    {/* Instagram Link */}
                    {creator.instagram && (
                      <a
                        href={`https://instagram.com/${creator.instagram
                          .split(",")[0]
                          .trim()
                          .replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="results-page__profile-social-link results-page__profile-social-link--instagram"
                      >
                        <Instagram />
                        <span>{creator.instagram.split(",")[0].trim()}</span>
                      </a>
                    )}

                    {/* YouTube Link */}
                    {creator.youtube && (
                      <a
                        href={`https://youtube.com/@${creator.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="results-page__profile-social-link results-page__profile-social-link--youtube"
                      >
                        <Youtube />
                        <span>@{creator.youtube}</span>
                      </a>
                    )}

                    {/* TikTok Link */}
                    {creator.tiktok && (
                      <a
                        href={`https://tiktok.com/@${creator.tiktok.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="results-page__profile-social-link results-page__profile-social-link--tiktok"
                      >
                        <TikTokIcon />
                        <span>{creator.tiktok}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Stats Grid */}
            <div className="results-page__stats">
              <div className="results-page__stats-grid">
                <StatCard
                  icon={Eye}
                  label="Total Views"
                  value={creator.views}
                  unit="impressions"
                  colorClass="purple"
                />
                <StatCard
                  icon={Heart}
                  label="Average Views"
                  value={creator.averageViews}
                  unit="per content"
                  colorClass="pink"
                />
                <StatCard
                  icon={Share2}
                  label="Collab Period"
                  value={creator.collabPeriod}
                  unit="duration"
                  colorClass="blue"
                  isOngoing={creator.collabPeriodOngoing}
                />
                <StatCard
                  icon={TrendingUp}
                  label="Growth Rate"
                  value={creator.growthRate}
                  unit="increase"
                  colorClass="green"
                />
              </div>

              {/* Summary Section */}
              <div className="results-page__summary">
                <div className="results-page__summary-content">
                  {/* Key Responsibilities Heading */}
                  <h3 className="results-page__summary-main-title">
                    Key Responsibilities
                  </h3>

                  {/* Key Roles as separate items */}
                  <div className="results-page__summary-roles">
                    {creator.keyRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="results-page__summary-role-item"
                      >
                        {role}
                      </div>
                    ))}
                  </div>

                  {/* Associated Content Below */}
                  <div className="results-page__summary-details">
                    {/* Associated Brands with Logos */}
                    {creator.associatedBrands && (
                      <div className="results-page__summary-section">
                        <h3 className="results-page__summary-section-title">
                          Associated Brands
                        </h3>
                        <div className="results-page__summary-brand-logos">
                          {creator.associatedBrands.map((brand, idx) => (
                            <div
                              key={idx}
                              className="results-page__summary-brand-logo"
                            >
                              <img src={brand.logo} alt={brand.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Work Highlights */}
                    {creator.work && (
                      <div className="results-page__summary-section">
                        <h3 className="results-page__summary-section-title">
                          Work Highlights
                        </h3>
                        <div className="results-page__summary-tags">
                          {creator.work.map((item, idx) => (
                            <span
                              key={idx}
                              className="results-page__summary-tag"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Featured Guests */}
                    {creator.associatedNames && (
                      <div className="results-page__summary-section">
                        <h3 className="results-page__summary-section-title">
                          Featured Guests
                        </h3>
                        <div className="results-page__summary-tags">
                          {creator.associatedNames.map((name, idx) => (
                            <span
                              key={idx}
                              className="results-page__summary-tag"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
