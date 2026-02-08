'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Search } from 'lucide-react';

const DATA: Record<string, { title: string; emoji: string; googleQuery: string; items: { name: string; desc: string; url: string }[] }> = {
  restaurants: {
    title: 'Top Restaurants',
    emoji: '🍽️',
    googleQuery: 'best+restaurants+Palm+Desert+CA',
    items: [
      { name: 'Pacifica Seafood Restaurant', desc: 'Upscale seafood with Pacific Rim flavors and desert views', url: 'https://www.pacificarestaurants.com' },
      { name: 'Catalan Mediterranean', desc: 'Elegant Mediterranean cuisine in a chic setting on El Paseo', url: 'https://www.catalanpd.com' },
      { name: 'Mastro\'s Steakhouse', desc: 'High-end steakhouse with live music and a lively bar', url: 'https://www.mastrosrestaurants.com' },
      { name: 'The Nest', desc: 'Classic American steakhouse with live entertainment since 1956', url: 'https://www.thenestpd.com' },
      { name: 'Sullivan\'s Steakhouse', desc: 'Prime steaks, fresh seafood, and hand-shaken cocktails', url: 'https://www.sullivanssteakhouse.com' },
      { name: 'Jillian\'s', desc: 'Farm-to-table California cuisine with seasonal menus', url: 'https://www.google.com/search?q=Jillians+Palm+Desert' },
      { name: 'Tommy Bahama Restaurant', desc: 'Island-inspired cuisine and tropical cocktails on El Paseo', url: 'https://www.tommybahama.com/restaurants' },
      { name: 'Eureka!', desc: 'Craft burgers, local craft beers, and creative American fare', url: 'https://www.eurekarestaurantgroup.com' },
      { name: 'Cork Tree California Cuisine', desc: 'Creative California fare with seasonal ingredients', url: 'https://www.corktreerestaurant.com' },
      { name: 'Mario\'s Italian Cafe', desc: 'Beloved local Italian with generous portions and warm atmosphere', url: 'https://www.google.com/search?q=Marios+Italian+Cafe+Palm+Desert' },
    ],
  },
  activities: {
    title: 'Things to Do',
    emoji: '🌵',
    googleQuery: 'things+to+do+Palm+Desert+CA',
    items: [
      { name: 'The Living Desert Zoo & Gardens', desc: 'World-class desert zoo with 500+ animals and botanical gardens', url: 'https://www.livingdesert.org' },
      { name: 'Joshua Tree National Park', desc: 'Iconic desert park with unique rock formations, just 45 min away', url: 'https://www.nps.gov/jotr' },
      { name: 'Palm Springs Aerial Tramway', desc: 'Rotating tram car ascending 2.5 miles to Mt. San Jacinto', url: 'https://www.pstramway.com' },
      { name: 'El Paseo Shopping District', desc: 'The "Rodeo Drive of the Desert" with galleries, boutiques, and dining', url: 'https://www.google.com/search?q=El+Paseo+Palm+Desert' },
      { name: 'Indian Canyons', desc: 'Stunning desert hiking with palm oases and ancient rock art', url: 'https://www.indian-canyons.com' },
      { name: 'Sunnylands Center & Gardens', desc: 'Historic Annenberg estate with beautiful desert gardens', url: 'https://www.sunnylands.org' },
      { name: 'Coachella Valley Preserve', desc: 'Pristine desert preserve with hiking trails and palm oases', url: 'https://www.google.com/search?q=Coachella+Valley+Preserve' },
      { name: 'Desert Hills Premium Outlets', desc: 'Massive outlet mall with 180+ designer and name-brand stores', url: 'https://www.premiumoutlets.com/outlet/desert-hills' },
      { name: 'Hot Air Balloon Rides', desc: 'Scenic balloon flights over the Coachella Valley at sunrise', url: 'https://www.google.com/search?q=hot+air+balloon+Palm+Desert' },
      { name: 'McCallum Theatre', desc: 'Premier performing arts venue with Broadway shows and concerts', url: 'https://www.mccallumtheatre.com' },
    ],
  },
  golf: {
    title: 'Golf Courses',
    emoji: '⛳',
    googleQuery: 'golf+courses+near+Palm+Desert+CA',
    items: [
      { name: 'Desert Willow Golf Resort', desc: 'Two award-winning public courses with stunning mountain views', url: 'https://www.desertwillow.com' },
      { name: 'Indian Wells Golf Resort', desc: 'Two championship courses, home of the Skins Game', url: 'https://www.indianwellsgolfresort.com' },
      { name: 'PGA West', desc: 'Legendary courses including the Stadium Course', url: 'https://www.pgawest.com' },
      { name: 'La Quinta Resort & Club', desc: 'Historic resort with multiple championship courses', url: 'https://www.laquintaresort.com/golf' },
      { name: 'Classic Club', desc: 'Arnold Palmer-designed course, former home of the Bob Hope Classic', url: 'https://www.classicclub.com' },
      { name: 'SilverRock Resort', desc: 'Arnold Palmer signature course in La Quinta', url: 'https://www.silverrock.org' },
      { name: 'Escena Golf Club', desc: 'Nicklaus-designed course with spectacular mountain backdrops', url: 'https://www.escenagolf.com' },
      { name: 'Indian Canyon Golf Resort', desc: 'Two courses near downtown Palm Springs, great value', url: 'https://www.indiancanyonsgolf.com' },
      { name: 'The Golf Center at Palm Desert', desc: 'Practice facility with driving range and short course', url: 'https://www.google.com/search?q=Golf+Center+Palm+Desert' },
      { name: 'Marriott\'s Shadow Ridge', desc: 'Nick Faldo-designed course at the Marriott resort', url: 'https://www.google.com/search?q=Marriotts+Shadow+Ridge+golf' },
    ],
  },
  shopping: {
    title: 'Shopping',
    emoji: '🛍️',
    googleQuery: 'shopping+Palm+Desert+CA',
    items: [
      { name: 'El Paseo', desc: 'The "Rodeo Drive of the Desert" — galleries, boutiques, dining', url: 'https://www.google.com/search?q=El+Paseo+Palm+Desert+shopping' },
      { name: 'Desert Hills Premium Outlets', desc: '180+ stores including Gucci, Prada, Nike, Coach', url: 'https://www.premiumoutlets.com/outlet/desert-hills' },
      { name: 'The River at Rancho Mirage', desc: 'Open-air shopping, dining, and entertainment complex', url: 'https://www.theriveratranchomirage.com' },
      { name: 'Westfield Palm Desert', desc: 'Major mall with Macy\'s, JCPenney, and 150+ shops', url: 'https://www.google.com/search?q=Westfield+Palm+Desert' },
      { name: 'Palm Desert Antique Mall', desc: 'Treasure trove of vintage finds and antique collections', url: 'https://www.google.com/search?q=Palm+Desert+Antique+Mall' },
      { name: 'College of the Desert Street Fair', desc: 'Huge weekly outdoor market (Sat & Sun) with 200+ vendors', url: 'https://www.google.com/search?q=College+Desert+Street+Fair' },
      { name: 'Cabazon Outlets', desc: 'Discount outlet shopping right off I-10', url: 'https://www.cabazonoutlets.com' },
      { name: 'Palm Springs Vintage Market', desc: 'Monthly vintage market with mid-century modern finds', url: 'https://www.google.com/search?q=Palm+Springs+Vintage+Market' },
      { name: 'Trader Joe\'s Palm Desert', desc: 'Perfect for snacks, wine, and essentials for the house', url: 'https://www.google.com/search?q=Trader+Joes+Palm+Desert' },
      { name: 'Total Wine & More', desc: 'Huge selection of wine, beer, and spirits', url: 'https://www.totalwine.com' },
    ],
  },
  nightlife: {
    title: 'Nightlife & Entertainment',
    emoji: '🎶',
    googleQuery: 'nightlife+entertainment+Palm+Desert+CA',
    items: [
      { name: 'The Nest', desc: 'Live music and comedy shows nightly, a Palm Desert institution', url: 'https://www.thenestpd.com' },
      { name: 'Agua Caliente Casino', desc: 'Casino, resort, spa with live entertainment and dining', url: 'https://www.aguacalientecasinos.com' },
      { name: 'Fantasy Springs Resort Casino', desc: 'Gaming, bowling, concerts, and great restaurants', url: 'https://www.fantasyspringsresort.com' },
      { name: 'Spotlight 29 Casino', desc: 'Gaming and big-name concerts in the Coachella Valley', url: 'https://www.spotlight29.com' },
      { name: 'McCallum Theatre', desc: 'Broadway, comedy, music, and dance performances', url: 'https://www.mccallumtheatre.com' },
      { name: 'Ace Hotel & Swim Club', desc: 'Hip poolside scene with DJs and live music (Palm Springs)', url: 'https://www.acehotel.com/palmsprings' },
      { name: 'Village Pub', desc: 'Chill pub with craft beers, cocktails, and pub food', url: 'https://www.google.com/search?q=Village+Pub+Palm+Springs' },
      { name: 'Copa Nightclub', desc: 'Popular nightclub in Cathedral City with theme nights', url: 'https://www.google.com/search?q=Copa+Nightclub+Palm+Springs' },
      { name: 'Desert Fox Lounge', desc: 'Upscale cocktail lounge with a mid-century modern vibe', url: 'https://www.google.com/search?q=Desert+Fox+Lounge+Palm+Springs' },
      { name: 'The Purple Room', desc: 'Supper club with live jazz and Rat Pack-era ambiance', url: 'https://www.purpleroompalmsprings.com' },
    ],
  },
};

export default function ExplorePage() {
  const params = useParams();
  const category = (params?.category || '') as string;
  const data = DATA[category];

  if (!data) {
    return (
      <div className="pd-space-y" style={{ textAlign: 'center', padding: 64 }}>
        <p style={{ color: 'var(--pd-text3)' }}>Category not found</p>
        <Link href="/palm-desert" style={{ color: 'var(--pd-gold)' }}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pd-space-y">
      <div>
        <Link href="/palm-desert" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--pd-text3)', textDecoration: 'none', fontSize: 14, marginBottom: 8 }}>
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>
          {data.emoji} {data.title}
        </h1>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Palm Desert & Coachella Valley</p>
      </div>

      <div className="pd-space-y-sm">
        {data.items.map((item, i) => (
          <div key={i} className="pd-card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--pd-gold), var(--pd-gold2))', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--pd-text2)', marginTop: 4 }}>{item.desc}</div>
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                   className="pd-btn pd-btn-secondary" style={{ marginTop: 10, fontSize: 13, padding: '6px 12px' }}>
                  <ExternalLink size={14} /> Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a href={`https://www.google.com/search?q=${data.googleQuery}`} target="_blank" rel="noopener noreferrer"
         className="pd-btn pd-btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 14 }}>
        <Search size={16} /> Search for More on Google
      </a>
    </div>
  );
}
