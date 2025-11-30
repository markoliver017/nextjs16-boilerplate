# Background Image Usage Guide

## 📸 Overview

Both `HeroSection` and `HeroSlider` components now support background images with optional gradient overlays.

---

## 🎨 HeroSection Component

### **Basic Usage (Color Gradient Only)**
```tsx
import { HeroSection } from "@/components/hero-section";

export default function Page() {
  return <HeroSection />;
}
```

### **With Background Image**
```tsx
import { HeroSection } from "@/components/hero-section";

export default function Page() {
  return (
    <HeroSection 
      backgroundImage="/slides-1.jpg"
    />
  );
}
```

### **With Background Image (No Gradient Overlay)**
```tsx
import { HeroSection } from "@/components/hero-section";

export default function Page() {
  return (
    <HeroSection 
      backgroundImage="/slides-1.jpg"
      useGradientOverlay={false}
    />
  );
}
```

### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | `string` | `undefined` | Path to image in `/public` folder |
| `useGradientOverlay` | `boolean` | `true` | Whether to apply gradient overlay on image |

---

## 🎬 HeroSlider Component

### **Default Usage (With Your Images)**
The slider is already configured to use your images from the public folder:
- Slide 1: `/slides-1.jpg`
- Slide 2: `/slides-2.jpg`
- Slide 3: `/slides-3.jpg`

```tsx
import { HeroSlider } from "@/components/hero-slider";

export default function Page() {
  return <HeroSlider />;
}
```

### **Customizing Slides**

Edit the `slides` array in `components/hero-slider.tsx`:

```tsx
const slides: Slide[] = [
  {
    id: 1,
    title: "Your Title",
    subtitle: "Your Subtitle",
    description: "Your description",
    ctaText: "Your CTA",
    ctaLink: "/your-link",
    overlay: "from-blue-900/80 to-indigo-900/70",
    image: "/your-image.jpg", // Optional
  },
  // Add more slides...
];
```

### **Slide Properties**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique slide identifier |
| `title` | `string` | ✅ | Main heading text |
| `subtitle` | `string` | ✅ | Subtitle text |
| `description` | `string` | ✅ | Description text |
| `ctaText` | `string` | ✅ | Call-to-action button text |
| `ctaLink` | `string` | ✅ | CTA button link |
| `overlay` | `string` | ✅ | Gradient overlay classes |
| `image` | `string` | ❌ | Path to background image |

---

## 🖼️ Image Requirements

### **Recommended Specifications**
- **Format:** JPG, PNG, or WebP
- **Resolution:** 1920x1080 or higher
- **Aspect Ratio:** 16:9 (landscape)
- **File Size:** < 500KB (optimized)
- **Location:** `/public` folder

### **Example File Structure**
```
public/
├── slides-1.jpg
├── slides-2.jpg
├── slides-3.jpg
└── hero-bg.jpg
```

---

## 🎨 Gradient Overlay Options

### **Pre-configured Overlays**

#### **Blue-Indigo**
```tsx
overlay: "from-blue-900/80 to-indigo-900/70"
```

#### **Purple-Pink**
```tsx
overlay: "from-purple-900/80 to-pink-900/70"
```

#### **Red-Orange**
```tsx
overlay: "from-red-900/80 to-orange-900/70"
```

#### **Green-Teal**
```tsx
overlay: "from-green-900/80 to-teal-900/70"
```

#### **Custom Overlay**
```tsx
overlay: "from-your-color/80 to-your-color/70"
```

### **Overlay Opacity Levels**
- `/80` = 80% opacity (default for first color)
- `/70` = 70% opacity (default for second color)
- Adjust as needed: `/50`, `/60`, `/90`, etc.

---

## 💡 Usage Examples

### **Example 1: Home Page with Static Hero**
```tsx
// app/page.tsx
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection backgroundImage="/slides-1.jpg" />
      {/* Other content */}
    </>
  );
}
```

### **Example 2: About Page with Slider**
```tsx
// app/about/page.tsx
import { HeroSlider } from "@/components/hero-slider";

export default function About() {
  return (
    <div>
      <HeroSlider />
      {/* Other content */}
    </div>
  );
}
```

### **Example 3: Landing Page with No Overlay**
```tsx
// app/landing/page.tsx
import { HeroSection } from "@/components/hero-section";

export default function Landing() {
  return (
    <HeroSection 
      backgroundImage="/hero-bg.jpg"
      useGradientOverlay={false}
    />
  );
}
```

---

## 🔧 Advanced Customization

### **Changing Image Quality**
Edit the `quality` prop in the Image component:
```tsx
<Image
  src={backgroundImage}
  quality={90} // 1-100, default is 90
  // ...
/>
```

### **Changing Object Fit**
Modify the `className` in the Image component:
```tsx
<Image
  className="object-cover -z-20" // Default: cover
  // Options: object-contain, object-fill, object-none, object-scale-down
/>
```

### **Adding Image Position**
```tsx
<Image
  className="object-cover object-center -z-20" // Center
  // Options: object-top, object-bottom, object-left, object-right
/>
```

---

## 🚀 Performance Tips

1. **Optimize Images:**
   - Use tools like TinyPNG or ImageOptim
   - Convert to WebP format for better compression
   - Aim for < 500KB file size

2. **Use Priority Loading:**
   - First slide/hero uses `priority` prop
   - Subsequent slides load normally

3. **Lazy Loading:**
   - Images outside viewport load on-demand
   - Handled automatically by Next.js Image component

4. **Responsive Images:**
   - Next.js automatically generates multiple sizes
   - Serves optimal size based on device

---

## 🎯 Fallback Behavior

### **HeroSection**
- **No `backgroundImage` prop:** Uses color gradient overlay
- **Invalid image path:** Falls back to color gradient

### **HeroSlider**
- **No `image` property:** Uses color gradient for that slide
- **Invalid image path:** Falls back to color gradient
- **Mixed slides:** Some with images, some without (works perfectly)

---

## 📝 Example: Mixed Slider Configuration

```tsx
const slides: Slide[] = [
  {
    id: 1,
    title: "With Image",
    // ... other props
    image: "/slides-1.jpg", // Has image
  },
  {
    id: 2,
    title: "Without Image",
    // ... other props
    // No image property - uses gradient only
  },
  {
    id: 3,
    title: "With Different Image",
    // ... other props
    image: "/slides-3.jpg", // Has image
  },
];
```

---

## ✅ Current Setup

Your components are already configured with:
- ✅ HeroSection: Supports optional background image
- ✅ HeroSlider: Uses `/slides-1.jpg`, `/slides-2.jpg`, `/slides-3.jpg`
- ✅ Gradient overlays on all images
- ✅ Next.js Image optimization
- ✅ Responsive design
- ✅ Fallback to color gradients

---

**Ready to use! Just make sure your images are in the `/public` folder.**
