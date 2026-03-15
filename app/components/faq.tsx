import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "How do I book a service?",
    answer:
      "Simply search for the service you need, browse verified professionals in your area, and send a booking request with your job details. The provider will receive your request via email and their dashboard, then contact you to confirm the appointment.",
  },
  {
    id: "item-2",
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, card payments, and mobile money (USSD). All payments are processed securely through our platform. You can pay before or after the service is completed, depending on the provider's preference.",
  },
  {
    id: "item-3",
    question: "What is your cancellation policy?",
    answer:
      "You can cancel a booking up to 4 hours before the scheduled time without any charges. Cancellations made less than 4 hours before may incur a small fee. Emergency cancellations are handled on a case-by-case basis.",
  },
  {
    id: "item-4",
    question: "What if I'm not satisfied with the service?",
    answer:
      "Your satisfaction is our priority. If you're unhappy with the work, contact our support team within 24 hours. We'll work with the provider to resolve the issue or offer a full refund under our money-back guarantee.",
  },
  {
    id: "item-5",
    question: "How are workers verified?",
    answer:
      "All professionals undergo a thorough verification process including identity confirmation, background checks, skills assessment, and reference verification. We also monitor ongoing performance through customer ratings and reviews.",
  },
  {
    id: "item-6",
    question: "How quickly can I get someone?",
    answer:
      "Many of our professionals are available for same-day bookings. Emergency services are available 24/7. Typical response time is within 2-4 hours, though this varies by service type and location.",
  },
  {
    id: "item-7",
    question: "Do I need to provide materials or tools?",
    answer:
      "Most professionals come with their own tools and basic materials. For larger jobs requiring specific materials, the provider will discuss this with you during the booking confirmation and may request that you purchase materials beforehand.",
  },
  {
    id: "item-8",
    question: "Are the prices negotiable?",
    answer:
      "Providers set their own rates based on their experience and service quality. While some may be open to negotiation for larger projects, we encourage fair pricing that reflects the professional's skills and expertise.",
  },
];

export const Faq = () => {
  return (
    <section className=" my-10">
      <div className=" mb-5">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Everything you need to know about using HireMe
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {faqs.map((item, index) => (
          <AccordionItem value={item.id} key={index}>
            <AccordionTrigger className=" font-semibold text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className=" text-sm font-medium">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
