// components/CarouselBanner.jsx
export default function CarouselBanner() {
  const slides = [
    {
      title: "Latest Fashion Trends",
      subtitle: "Upgrade your style with our new collection",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?crop=entropy&cs=tinysrgb&fit=max&h=500&w=1600",
    },
    {
      title: "Top Electronics",
      subtitle: "Best gadgets for your lifestyle",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&h=500&w=1600",
    },
    {
      title: "Shop Everything You Need",
      subtitle: "From essentials to luxury, we got it all",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&h=500&w=1600",
    },
  ];

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.title}
              style={{ objectFit: "cover", height: "500px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-banner.jpg"; // fallback image
              }}
            />
            {/* Overlay text */}
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>{slide.title}</h5>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  );
}