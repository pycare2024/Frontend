import React from "react";
import "./FAQ.css";

function FAQ() {
    const faqs = [
        {
            category: "General FAQs",
            questions: [
                {
                    question: "What is Psycare?",
                    answer: "Psycare is a mental health initiative aimed at making psychiatric help accessible and affordable globally, tackling issues like stress and anxiety-induced suicides, alcohol-related deaths, and productivity losses.",
                },
                {
                    question: "Who can benefit from Psycare's services?",
                    answer: "Our services are designed for individuals, families, and organizations seeking mental health support.",
                },
                {
                    question: "How is Psycare different from other mental health platforms?",
                    answer: "Psycare focuses on affordability, accessibility, and evidence-based psychiatric care, ensuring that everyone can get the help they need without financial barriers from the comfort of their homes without any stigma.",
                },
            ],
        },
        {
            category: "Service-Related FAQs",
            questions: [
                {
                    question: "What services does Psycare provide?",
                    answer: "We offer psychiatric consultation and treatment as the majority of mental disorders involve some kind of chemical imbalance which can only be restored through medical intervention.",
                },
                {
                    question: "How do I book an appointment?",
                    answer: "You can book an appointment through our “Send us a message\" section by filling out a simple form or contacting our helpline on WhatsApp.",
                },
                {
                    question: "Do you offer services for organizations?",
                    answer: "Yes, we provide employee wellness programs and consultation services for organizations.",
                },
            ],
        },
        {
            category: "Cost and Accessibility FAQs",
            questions: [
                {
                    question: "How much do your services cost?",
                    answer: "Psycare charges a very low fee of Rs 300 for one-time consultation services to ensure affordability.",
                },
                {
                    question: "Are your services available in rural areas?",
                    answer: "Yes, we aim to reach underserved areas through telehealth services and collaborations with local organizations.",
                },
            ],
        },
        {
            category: "Confidentiality and Privacy FAQs",
            questions: [
                {
                    question: "Are my consultations confidential?",
                    answer: "Absolutely. We follow strict privacy policies to ensure all your information remains secure and confidential.",
                },
                {
                    question: "Do you share my data with anyone?",
                    answer: "No, your data is never shared with third parties without your explicit consent, except in situations where it is legally required.",
                },
            ],
        },
        {
            category: "Emergency Support FAQs",
            questions: [
                {
                    question: "What should I do in a mental health crisis?",
                    answer: "If you or someone you know is in immediate danger, you will need to reach out to a psychiatrist in your area as currently we don’t offer any emergency service due to our low-cost business model.",
                },
            ],
        },
        {
            category: "Technical Support FAQs",
            questions: [
                {
                    question: "I’m having trouble accessing the website. What should I do?",
                    answer: "Please clear your browser cache or try accessing the site from another device. If the problem persists, contact our support team at support@psy-care.in.",
                },
                {
                    question: "Can I use Psycare on my mobile phone?",
                    answer: "Yes, our website is fully mobile-friendly for seamless access on all devices.",
                },
            ],
        },
        {
            category: "Feedback and Involvement FAQs",
            questions: [
                {
                    question: "How can I provide feedback about Psycare?",
                    answer: "We value your feedback! Please use the form on the \"Send us a message\" page to share your thoughts or suggestions.",
                },
                {
                    question: "How can I support Psycare's mission?",
                    answer: "You can donate, volunteer, or partner with us to help make mental health support accessible to everyone. Check our \"Join Us\" section for details.",
                },
            ],
        },
    ];

    return (
        <div className="faqContainer">
            <h1 className="faqTitle">FAQs</h1>
            {faqs.map((section, index) => (
                <div key={index} className="faqSection">
                    <h2 className="faqCategory">{section.category}</h2>
                    <div className="faqQuestions">
                        {section.questions.map((faq, i) => (
                            <details key={i} className="faqItem">
                                <summary className="faqQuestion">{faq.question}</summary>
                                <p className="faqAnswer">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FAQ;