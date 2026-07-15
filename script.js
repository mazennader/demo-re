/* =========================
   FAKE PROPERTIES
========================= */

const properties = [
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$850,000",
      type: "sale",
      beds: 4,
      baths: 3,
      area: "320m²",
      parking: 2,
      featured: "Yes",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1600&auto=format&fit=crop"
      ],
      description:
        "Stunning modern villa featuring contemporary architecture, high-end finishes, and a beautiful swimming pool. Perfect for families seeking luxury living in an exclusive neighborhood."
    },
    {
      id: 2,
      title: "Luxury Estate with Garden",
      location: "Miami Beach, FL",
      price: "$1,200,000",
      type: "sale",
      beds: 5,
      baths: 4,
      area: "450m²",
      parking: 3,
      featured: "Yes",
      images: [
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
      ],
      description:
        "Large luxury estate featuring a private garden, pool area, premium interior design, and spacious family areas."
    },
    {
      id: 3,
      title: "Elegant Downtown Apartment",
      location: "San Francisco, CA",
      price: "$2,800/mo",
      type: "rent",
      beds: 2,
      baths: 2,
      area: "120m²",
      parking: 1,
      featured: "No",
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop"
      ],
      description:
        "Modern downtown apartment with amazing city views, clean interiors, and a practical layout for comfortable living."
    },
  
    /* =========================
       LAND EXAMPLES
    ========================= */
  
    
    {
      id: 4,
      title: "Mountain View Land Plot",
      location: "Faqra, Lebanon",
      price: "$250,000",
      type: "land",
      area: "1,750m²",
      zoning: "Villa Zone",
      roadAccess: "Yes",
      view: "Mountain View",
      featured: "No",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1600&auto=format&fit=crop"
      ],
      description:
        "Beautiful land plot in Faqra surrounded by nature and mountain views. Ideal for a luxury chalet, private residence, or long-term investment."
    }
  ];
  
  /* =========================
     LOADER
  ========================= */
  
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
  
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 700);
    }
  });
  
  /* =========================
     HELPERS
  ========================= */
  
  function getBadgeText(type) {
    if (type === "sale") return "For Sale";
    if (type === "rent") return "For Rent";
    if (type === "land") return "Land For Sale";
    return "Property";
  }
  
  function getBadgeClass(type) {
    if (type === "sale") return "badge-sale";
    if (type === "rent") return "badge-rent";
    if (type === "land") return "badge-land";
    return "badge-sale";
  }
  
  function isLand(property) {
    return property.type === "land";
  }
  
  function getAreaNumber(area) {
    return area.replace("m²", "").trim();
  }
  
  /* =========================
     HOME PAGE
  ========================= */
  
  const propertiesGrid = document.getElementById("propertiesGrid");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const resultsText = document.getElementById("resultsText");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  let currentFilter = "all";
  
  function renderProperties() {
    if (!propertiesGrid || !searchInput || !resultsText) return;
  
    const searchTerm = searchInput.value.toLowerCase();
  
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm);
  
      const matchesFilter =
        currentFilter === "all" || property.type === currentFilter;
  
      return matchesSearch && matchesFilter;
    });
  
    resultsText.innerText = `${filtered.length} properties match your search`;
    propertiesGrid.innerHTML = "";
  
    filtered.forEach((property, index) => {
      const badgeText = getBadgeText(property.type);
      const badgeClass = getBadgeClass(property.type);
  
      const featureHtml = isLand(property)
        ? `
          <span><i class="fa-solid fa-expand"></i>${property.area}</span>
          <span><i class="fa-solid fa-map"></i>${property.zoning}</span>
          <span><i class="fa-solid fa-road"></i>Road Access</span>
        `
        : `
          <span><i class="fa-solid fa-bed"></i>${property.beds}</span>
          <span><i class="fa-solid fa-bath"></i>${property.baths}</span>
          <span><i class="fa-solid fa-expand"></i>${property.area}</span>
        `;
  
      const card = document.createElement("div");
      card.className = "property-card";
  
      card.innerHTML = `
        <div class="property-image">
          <img src="${property.images[0]}" alt="${property.title}">
          <div class="property-badge ${badgeClass}">
            ${badgeText}
          </div>
        </div>
  
        <div class="property-content">
          <h3 class="property-title">${property.title}</h3>
  
          <div class="property-location">
            <i class="fa-solid fa-location-dot"></i>
            ${property.location}
          </div>
  
          <div class="property-price">${property.price}</div>
  
          <div class="property-features">
            ${featureHtml}
          </div>
  
          <div class="card-buttons">
            <button class="details-btn">View Details</button>
  
            <a
              href="https://wa.me/03123123?text=Hello%20R%20E%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}"
              target="_blank"
              class="whatsapp-btn"
            >
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      `;
  
      card.addEventListener("click", () => {
        window.location.href = `property-details.html?id=${property.id}`;
      });
  
      const whatsappBtn = card.querySelector(".whatsapp-btn");
  
      whatsappBtn.addEventListener("click", (e) => {
        e.stopPropagation();
      });
  
      propertiesGrid.appendChild(card);
  
      setTimeout(() => {
        card.classList.add("show");
      }, 90 * index);
    });
  }
  
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
  
        button.classList.add("active");
        currentFilter = button.dataset.filter;
  
        renderProperties();
      });
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener("click", renderProperties);
  }
  
  if (searchInput) {
    searchInput.addEventListener("keyup", renderProperties);
  }
  
  renderProperties();
  
  /* =========================
     DETAIL PAGE
  ========================= */
  
  const detailsPage = document.querySelector(".details-page");
  
  if (detailsPage) {
    const params = new URLSearchParams(window.location.search);
    const propertyId = Number(params.get("id")) || 1;
  
    const property =
      properties.find((item) => item.id === propertyId) || properties[0];
  
    let currentImageIndex = 0;
  
    const breadcrumbTitle = document.getElementById("breadcrumbTitle");
    const detailsBadge = document.getElementById("detailsBadge");
    const mainPropertyImage = document.getElementById("mainPropertyImage");
    const thumbnailRow = document.getElementById("thumbnailRow");
    const galleryDots = document.getElementById("galleryDots");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");
  
    const detailTitle = document.getElementById("detailTitle");
    const detailLocation = document.getElementById("detailLocation");
    const detailPrice = document.getElementById("detailPrice");
    const detailBeds = document.getElementById("detailBeds");
    const detailBaths = document.getElementById("detailBaths");
    const detailAreaNumber = document.getElementById("detailAreaNumber");
    const detailParking = document.getElementById("detailParking");
    const detailDescription = document.getElementById("detailDescription");
  
    const sideType = document.getElementById("sideType");
    const sideBeds = document.getElementById("sideBeds");
    const sideBaths = document.getElementById("sideBaths");
    const sideArea = document.getElementById("sideArea");
    const sideParking = document.getElementById("sideParking");
    const detailsWhatsApp = document.getElementById("detailsWhatsApp");
  
    document.title = `${property.title} | RE Real Estate`;
  
    breadcrumbTitle.innerText = property.title;
    detailTitle.innerText = property.title;
    detailLocation.innerText = property.location;
    detailPrice.innerText = property.price;
    detailDescription.innerText = property.description;
  
    sideType.innerText =
      property.type === "sale"
        ? "Sale"
        : property.type === "rent"
        ? "Rent"
        : "Land";
  
    sideArea.innerText = property.area.replace("m²", " m²");
  
    detailsBadge.innerText = getBadgeText(property.type);
    detailsBadge.classList.remove("badge-sale", "badge-rent", "badge-land");
    detailsBadge.classList.add(getBadgeClass(property.type));
  
    detailsWhatsApp.href =
      `https://wa.me/70643404?text=Hello%20R%20E%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`;
  
    const detailStats = document.querySelector(".detail-stats");
    const infoList = document.querySelector(".info-list");
  
    if (isLand(property)) {
      detailStats.innerHTML = `
        <div class="detail-stat">
          <div class="stat-icon green">
            <i class="fa-solid fa-expand"></i>
          </div>
          <div>
            <strong>${getAreaNumber(property.area)}</strong>
            <span>m² Land</span>
          </div>
        </div>
  
        <div class="detail-stat">
          <div class="stat-icon orange">
            <i class="fa-solid fa-map"></i>
          </div>
          <div>
            <strong>${property.zoning}</strong>
            <span>Zoning</span>
          </div>
        </div>
  
        <div class="detail-stat">
          <div class="stat-icon blue">
            <i class="fa-solid fa-road"></i>
          </div>
          <div>
            <strong>${property.roadAccess}</strong>
            <span>Road Access</span>
          </div>
        </div>
  
        <div class="detail-stat">
          <div class="stat-icon purple">
            <i class="fa-solid fa-mountain-sun"></i>
          </div>
          <div>
            <strong>${property.view}</strong>
            <span>View</span>
          </div>
        </div>
      `;
  
      infoList.innerHTML = `
        <div class="info-row">
          <span>Property Type</span>
          <strong>Land</strong>
        </div>
  
        <div class="info-row">
          <span>Area</span>
          <strong>${property.area.replace("m²", " m²")}</strong>
        </div>
  
        <div class="info-row">
          <span>Zoning</span>
          <strong>${property.zoning}</strong>
        </div>
  
        <div class="info-row">
          <span>Road Access</span>
          <strong>${property.roadAccess}</strong>
        </div>
  
        <div class="info-row">
          <span>View</span>
          <strong>${property.view}</strong>
        </div>
  
        <div class="info-row">
          <span>Featured</span>
          <strong>${property.featured}</strong>
        </div>
      `;
    } else {
      detailBeds.innerText = property.beds;
      detailBaths.innerText = property.baths;
      detailAreaNumber.innerText = getAreaNumber(property.area);
      detailParking.innerText = property.parking;
  
      sideBeds.innerText = property.beds;
      sideBaths.innerText = property.baths;
      sideArea.innerText = property.area.replace("m²", " m²");
      sideParking.innerText = `${property.parking} spaces`;
    }
  
    function updateGallery() {
      mainPropertyImage.src = property.images[currentImageIndex];
  
      document.querySelectorAll(".thumbnail-img").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentImageIndex);
      });
  
      document.querySelectorAll(".gallery-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentImageIndex);
      });
    }
  
    property.images.forEach((image, index) => {
      const thumb = document.createElement("img");
      thumb.src = image;
      thumb.alt = property.title;
      thumb.className = "thumbnail-img";
  
      thumb.addEventListener("click", () => {
        currentImageIndex = index;
        updateGallery();
      });
  
      thumbnailRow.appendChild(thumb);
  
      const dot = document.createElement("button");
      dot.className = "gallery-dot";
  
      dot.addEventListener("click", () => {
        currentImageIndex = index;
        updateGallery();
      });
  
      galleryDots.appendChild(dot);
    });
  
    prevImage.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + property.images.length) %
        property.images.length;
  
      updateGallery();
    });
  
    nextImage.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex + 1) % property.images.length;
  
      updateGallery();
    });
  
    updateGallery();
  }
  
  /* =========================
     SCROLL ANIMATIONS
  ========================= */
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.15
    }
  );
  
  document
    .querySelectorAll(
      ".feature-box, .contact-card, .map-container, .details-card, .details-sidebar"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(35px)";
      el.style.transition = "0.7s ease";
      observer.observe(el);
    });