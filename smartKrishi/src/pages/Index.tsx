
import { ArrowRight, Leaf, LineChart, Cpu, Droplet, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/LanguageContext";

const features = [
  {
    icon: Leaf,
    titleKey: "home.features.soilMonitoring",
    descriptionKey: "home.features.soilMonitoringDesc",
  },
  {
    icon: LineChart,
    titleKey: "home.features.dataAnalytics",
    descriptionKey: "home.features.dataAnalyticsDesc",
  },
  {
    icon: Cpu,
    titleKey: "home.features.aiRecommendations",
    descriptionKey: "home.features.aiRecommendationsDesc",
  },
  {
    icon: Droplet,
    titleKey: "home.features.moistureManagement",
    descriptionKey: "home.features.moistureManagementDesc",
  },
  {
    icon: MapPin,
    titleKey: "home.features.fieldMapping",
    descriptionKey: "home.features.fieldMappingDesc",
  },
];

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-10">
        <div className="inline-block p-2 px-4 bg-soil-50 rounded-full text-soil-600 text-sm font-medium mb-4">
          {t("home.hero.tagline")}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          {t("home.hero.title")}
        </h1>
        <p className="text-xl text-soil-600 max-w-2xl mx-auto">
          {t("home.hero.description")}
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link to="/login">
            <Button size="lg" className="bg-soil-600 hover:bg-soil-700">
              {t("home.cta.viewDashboard")} <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="border-soil-200 text-soil-700">
              {t("home.cta.login")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-soil-800">
          {t("home.features.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 card-hover border-soil-100">
              <div className="w-14 h-14 rounded-full bg-soil-50 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-soil-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-soil-800">{t(feature.titleKey)}</h3>
              <p className="text-soil-600">{t(feature.descriptionKey)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-soil-50 to-leaf-50 rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-soil-800">
          {t("home.bottomCta.title")}
        </h2>
        <p className="text-soil-600 max-w-xl mx-auto">
          {t("home.bottomCta.description")}
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-soil-600 hover:bg-soil-700">
            {t("home.bottomCta.getStarted")} <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
