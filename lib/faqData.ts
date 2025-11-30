// lib/faqData.ts
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
}

export const faqData: FAQ[] = [
  {
    id: "1",
    question: "What are your business hours?",
    answer:
      "We are open Monday to Friday from 9:00 AM to 6:00 PM PST. We are closed on weekends and major holidays.",
    category: "general",
    keywords: ["hours", "time", "open", "closed", "schedule"],
  },
  {
    id: "2",
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a reset link within 5 minutes.",
    category: "account",
    keywords: ["password", "reset", "forgot", "login", "email"],
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Cryptocurrency payments are also supported.",
    category: "payment",
    keywords: [
      "payment",
      "credit card",
      "paypal",
      "bank transfer",
      "cryptocurrency",
    ],
  },
  {
    id: "4",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) and international shipping (7-14 days) are also available.",
    category: "shipping",
    keywords: ["shipping", "delivery", "time", "express", "international"],
  },
  {
    id: "5",
    question: "Can I cancel my order?",
    answer:
      "You can cancel your order within 24 hours of placing it. After that, if the order hasn't shipped yet, please contact customer support for assistance.",
    category: "orders",
    keywords: ["cancel", "order", "refund", "customer support"],
  },
  {
    id: "6",
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer full refunds within 30 days of purchase. Items must be unused and in original packaging. Digital products are non-refundable after download.",
    category: "refunds",
    keywords: ["refund", "return", "money back", "30 days", "digital products"],
  },
];

// Function to search FAQs by keywords
export function searchFAQs(query: string, limit: number = 3): FAQ[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 2);

  if (queryWords.length === 0) return [];

  const scored = faqData.map((faq) => {
    let score = 0;

    // Check question match
    if (faq.question.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Check individual word matches in question
    queryWords.forEach((word) => {
      if (faq.question.toLowerCase().includes(word)) {
        score += 3;
      }
      if (faq.answer.toLowerCase().includes(word)) {
        score += 2;
      }
      if (faq.keywords?.some((keyword) => keyword.includes(word))) {
        score += 5;
      }
    });

    return { faq, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.faq);
}

// Function to format FAQs for context
export function formatFAQsForContext(faqs: FAQ[]): string {
  if (faqs.length === 0) return "";

  const formatted = faqs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join("\n\n");

  return `Here are some relevant FAQs that might help answer the user's question:\n\n${formatted}\n\n---\n\n`;
}
