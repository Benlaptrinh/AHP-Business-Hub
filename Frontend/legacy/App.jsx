import { AnimatePresence, motion } from "framer-motion";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import CareersSection from "./components/CareersSection";
import ClientsPartners from "./components/ClientsPartners";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import NewsList from "./components/NewsList";
import ProjectsCarousel from "./components/ProjectsCarousel";
import ScrollToTop from "./components/ScrollToTop";
import StatsSection from "./components/StatsSection";
import VideosSection from "./components/VideosSection";
import AboutLayout from "./layout/AboutLayout";
import CareersLayout from "./layout/CareersLayout";
import ConstructionLayout from "./layout/ConstructionLayout";
import NewsLayout from "./layout/NewsLayout";
import ProjectsLayout from "./layout/ProjectsLayout";
import AboutAwards from "./page/About/AboutAwards";
import AboutLeaders from "./page/About/AboutLeaders";
import AboutMessage from "./page/About/AboutMessage";
import AboutOverview from "./page/About/AboutOverview";
import AboutPartners from "./page/About/AboutPartners";
import AboutVisionValues from "./page/About/AboutVisionValues";
import CareersCulture from "./page/Careers/CareersCulture";
import CareersDevelopment from "./page/Careers/CareersDevelopment";
import CareersJobs from "./page/Careers/CareersJobs";
import CareersPolicies from "./page/Careers/CareersPolicies";
import JobDetail from "./page/Careers/JobDetail";
import ConstructionBIM from "./page/Construction/ConstructionBIM";
import ConstructionDnb from "./page/Construction/ConstructionDnb";
import ConstructionERP from "./page/Construction/ConstructionERP";
import ConstructionSectors from "./page/Construction/ConstructionSectors";
import Newinternal from "./page/new/Newinternal";
import NewsDetail from "./page/new/NewsDetail";
import NewsListPage from "./page/new/NewsListPage";
import Newtrain from "./page/new/Newtrain";
import ProfilePage from "./page/Profile/ProfilePage";
import ProjectHOTEL from "./page/Projects/ProjectHOTEL";
import ProjectRESIDENTIAL from "./page/Projects/ProjectRESIDENTIAL";
import ProjectRESORT from "./page/Projects/ProjectRESORT";
import ProjectsAll from "./page/Projects/ProjectsAll";
import ProjectDetail from "./page/Projects/ProjectsDetail";

const MotionMain = motion.main;

const withPageTransition = (node) => (
  <MotionMain
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -24 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    {node}
  </MotionMain>
);

function HomePage() {
  return (
    <>
      <div className="h-[72px] md:h-[108px]" />
      <HeroSlider />
      <StatsSection />
      <ProjectsCarousel />
      <NewsList />
      <CareersSection />
      <VideosSection />
      <ClientsPartners />
    </>
  );
}

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<RootLayout />}>
            <Route path="/" element={withPageTransition(<HomePage />)} />

            <Route path="/gioi-thieu" element={withPageTransition(<AboutLayout />)}>
              <Route index element={<AboutOverview />} />
              <Route path="tong-quan" element={<AboutOverview />} />
              <Route path="thong-diep-chu-tich" element={<AboutMessage />} />
              <Route path="tam-nhin-gia-tri" element={<AboutVisionValues />} />
              <Route path="nhan-su-cap-cao" element={<AboutLeaders />} />
              <Route path="chung-nhan-giai-thuong" element={<AboutAwards />} />
              <Route path="doi-tac-khach-hang" element={<AboutPartners />} />
            </Route>

            <Route path="/nang-luc-thi-cong" element={withPageTransition(<ConstructionLayout />)}>
              <Route index element={<ConstructionDnb />} />
              <Route path="trung-tam-dnb" element={<ConstructionDnb />} />
              <Route path="linh-vuc-hoat-dong" element={<ConstructionSectors />} />
              <Route path="cong-nghe-bim" element={<ConstructionBIM />} />
              <Route path="quan-ly-erp" element={<ConstructionERP />} />
            </Route>

            <Route path="/du-an" element={withPageTransition(<ProjectsLayout />)}>
              <Route index element={<ProjectsAll />} />
              <Route path="noi-khu" element={<ProjectRESORT />} />
              <Route path="khu-dan-cu" element={<ProjectRESIDENTIAL />} />
              <Route path="khach-san-tttm" element={<ProjectHOTEL />} />
              <Route path=":id" element={<ProjectDetail />} />
            </Route>

            <Route path="/tin-tuc" element={withPageTransition(<NewsLayout />)}>
              <Route index element={<NewsListPage category="tin-du-an" />} />
              <Route path="tin-du-an" element={<NewsListPage category="tin-du-an" />} />
              <Route path="hoat-dong-noi-bo" element={<Newinternal category="noi-bo" />} />
              <Route path="hoat-dong-dao-tao" element={<Newtrain category="dao-tao" />} />
              <Route path=":idOrSlug" element={<NewsDetail />} />
            </Route>

            <Route path="/tuyen-dung" element={withPageTransition(<CareersLayout />)}>
              <Route index element={<CareersJobs />} />
              <Route path="co-hoi-nghe-nghiep" element={<CareersJobs />} />
              <Route path="chinh-sach-nhan-su" element={<CareersPolicies />} />
              <Route path="phat-trien-nguon-nhan-luc" element={<CareersDevelopment />} />
              <Route path="van-hoa" element={<CareersCulture />} />
              <Route path="co-hoi-nghe-nghiep/:idOrSlug" element={<JobDetail />} />
            </Route>

            <Route path="/profile" element={withPageTransition(<ProfilePage />)} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
