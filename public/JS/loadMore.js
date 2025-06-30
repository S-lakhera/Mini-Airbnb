let offset = 8;

document.getElementById("load-more-btn").addEventListener("click", async () => {
    const container = document.getElementById("listing-container");


  const res = await fetch(`/listings/load?offset=${offset}`);
  const listings = await res.json();


  listings.forEach(listing => {
    const card = document.createElement("a");
    card.href = `/listings/${listing._id}`;
    card.innerHTML = `
      <div class="card listing-card">
        <img src="${listing.image.url}" class="card-img-top" style="height: 18rem;">
        <div class="card-body">
          <b>${listing.title}</b>
          <p class="card-text">₹ ${listing.price?.toLocaleString("en-IN") || "N/A"}/Night</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  offset += listings.length;

  // Hide button if no more data
  if (listings.length < 8) {
    document.getElementById("load-more-btn").style.display = "none";
  }
});
