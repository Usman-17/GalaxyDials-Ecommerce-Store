// import { useQuery } from "@tanstack/react-query";
// import { Redo } from "lucide-react";
// import { Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const BannerDetailsPage = () => {
//   const {
//     data: banners,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["banners"],
//     queryFn: async () => {
//       const res = await fetch("/api/banner/all");
//       if (!res.ok) throw new Error("Failed to fetch Banners");
//       return res.json();
//     },
//     retry: false,
//   });

//   const heroBanners = banners?.filter((item) => item.type === "heroBanner");
//   const adBanners = banners?.filter((item) => item.type === "adBanner");
//   const collectionBanners = banners?.filter(
//     (item) => item.type === "collectionBanner"
//   );

//   return (
//     <Container fluid>
//       <Row>
//         <Col className="app-container mb-5 mb-lg-0 pt-4">
//           <div className="custom-card">
//             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
//               <div className="page-title">
//                 <h3 className="mb-0">View All Banners</h3>
//                 <p className="mb-2 mb-lg-0">View and Manage All Banners</p>
//               </div>

//               <Link to="/banners/add" className="w-fit">
//                 <button className="button border-0 d-flex align-items-center gap-2">
//                   <Redo size={18} />
//                   Add New Banner
//                 </button>
//               </Link>
//             </div>

//             {isLoading && <p>Loading banners...</p>}
//             {error && <p>Error loading banners: {error.message}</p>}

//             {/* Hero Banners Section */}
//             <div className="banner-section">
//               <h4>Hero Banners</h4>
//               <div className="banners-grid">
//                 {heroBanners?.map((item) => (
//                   <div key={item._id} className="banner-card">
//                     <img
//                       src={item.bannerImg.url}
//                       alt="Hero Banner"
//                       className="w-100 object-cover h-auto"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Ad Banners Section */}
//             <div className="banner-section">
//               <h4>Ad Banners</h4>
//               <div className="banners-grid">
//                 {adBanners?.map((item) => (
//                   <div key={item._id} className="banner-card">
//                     <img
//                       src={item.bannerImg.url}
//                       alt="Ad Banner"
//                       className="w-100 object-cover h-auto"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Collection Banners Section */}
//             <div className="banner-section">
//               <h4>Collection Banners</h4>
//               <div className="banners-grid">
//                 {collectionBanners?.map((item) => (
//                   <div key={item._id} className="banner-card">
//                     <img
//                       src={item.bannerImg.url}
//                       alt="Collection Banner"
//                       className="w-100 object-cover h-auto"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BannerDetailsPage;

import { useQuery } from "@tanstack/react-query";
import { Redo } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BannerDetailsPage = () => {
  const {
    data: banners,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await fetch("/api/banner/all");
      if (!res.ok) throw new Error("Failed to fetch Banners");
      return res.json();
    },
    retry: false,
  });

  const heroBanners = banners?.filter((item) => item.type === "heroBanner");
  const adBanners = banners?.filter((item) => item.type === "adBanner");
  const collectionBanners = banners?.filter(
    (item) => item.type === "collectionBanner"
  );

  console.log(heroBanners);

  return (
    <Container fluid>
      <Row>
        <Col className="app-container mb-5 mb-lg-0 pt-4">
          <div className="custom-card">
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
              <div className="page-title">
                <h3 className="mb-0">View All Banners</h3>
                <p className="mb-2 mb-lg-0">View and Manage All Banners</p>
              </div>

              <Link to="/banners/add" className="w-fit">
                <button className="button border-0 d-flex align-items-center gap-2">
                  <Redo size={18} />
                  Add New Banner
                </button>
              </Link>
            </div>

            {isLoading && <p>Loading banners...</p>}
            {error && <p>Error loading banners: {error.message}</p>}

            {/* Hero Banners Section */}
            <div className="banner-section">
              <h4>Hero Banners</h4>
              <div className="banners-grid">
                {heroBanners?.map((item) => (
                  <div key={item._id} className="banner-card">
                    {item.bannerImg?.url ? ( // Defensive check
                      <img
                        src={item.bannerImg.url}
                        alt="Hero Banner"
                        className="w-100 object-cover h-auto"
                      />
                    ) : (
                      <p>No image available</p> // Fallback UI
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Banners Section */}
            <div className="banner-section">
              <h4>Ad Banners</h4>
              <div className="banners-grid">
                {adBanners?.map((item) => (
                  <div key={item._id} className="banner-card">
                    {item.bannerImg?.url ? ( // Defensive check
                      <img
                        src={item.bannerImg.url}
                        alt="Ad Banner"
                        className="w-100 object-cover h-auto"
                      />
                    ) : (
                      <p>No image available</p> // Fallback UI
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Collection Banners Section */}
            <div className="banner-section">
              <h4>Collection Banners</h4>
              <div className="banners-grid">
                {collectionBanners?.map((item) => (
                  <div key={item._id} className="banner-card">
                    {item.bannerImg?.url ? ( // Defensive check
                      <img
                        src={item.bannerImg.url}
                        alt="Collection Banner"
                        className="w-100 object-cover h-auto"
                      />
                    ) : (
                      <p>No image available</p> // Fallback UI
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BannerDetailsPage;
