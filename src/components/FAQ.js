import React from "react";
import "./FAQ_Stylish_Final.css";

function FAQ() {
    const faqs = [
        {
            category: "General FAQs",
            questions: [
                {
                    question: "What is PsyCare?",
                    answer: "PsyCare is a mental health initiative aimed at making psychotherapeutic and Psychiatric help accessible and affordable globally, tackling issues like  strained relationships, stress and anxiety-induced suicides, alcohol-related deaths, and productivity losses.",
                },
                {
                    question: "Who can benefit from PsyCare's services?",
                    answer: "Our services are designed for individuals - both adults and students and also for organizations seeking mental health support for their employees in today's high pressure work environment.",
                },
                {
                    question: "How is PsyCare different from other mental health platforms?",
                    answer: "PsyCare focuses on affordability, accessibility, and evidence-based mental health care, ensuring that everyone can get the help they need without financial barriers from the comfort of their homes without any stigma.",
                },
            ],
        },
        {
            category: "Service-Related FAQs",
            questions: [
                {
                    question: "What services does PsyCare provide?",
                    answer: "We offer holistic care which may involve psychotherapeutic care and /or psychiatric treatment as the majority of mental disorders involve either some kind of flawed thinking process or chemical imbalance which can only be restored through medical intervention.",
                },
                {
                    question: "How do I book an appointment?",
                    answer: "You can book an appointment through 'Book appointment' button on our website or by sending a hello on  our WhatsApp helpline number 9818296388.",
                },
                {
                    question: "Do you offer services for organizations?",
                    answer: "Yes, we do provide employee wellness programs and consultation services for organizations. Infact this is the major pillar of our portfolio of services. Please see Services tab for more details on the same.",
                },
            ],
        },
        {
            category: "Cost and Accessibility FAQs",
            questions: [
                {
                    question: "How much do your services cost?",
                    answer: "For individuals - PsyCare charges a nominal and standard fee of Rs 1200 for one-time consultation with our trained clinical psychologists to ensure affordability. Subsequent charges would depend upon the customized plan offered. For corporates and institutions - we have two models; 1) per employee or per student per annum charges  2) Therapist in a box where we offer full time services of one or more psychotherapists for lump sum fee per annum. For more details, get in touch with us at contactus@psy-care.in",
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
                    question: "Can I use PsyCare on my mobile phone?",
                    answer: "Yes, our website is fully mobile-friendly for seamless access on all devices.",
                },
            ],
        },
        {
            category: "Feedback and Involvement FAQs",
            questions: [
                {
                    question: "How can I provide feedback about PsyCare?",
                    answer: "We value your feedback! Please use the form on the \"Send us a message\" page to share your thoughts or suggestions.",
                },
                {
                    question: "How can I support PsyCare's mission?",
                    answer: "You can donate, volunteer, or partner with us to help make mental health support accessible to everyone. Check our \"Join Us\" section for details.",
                },
            ],
        },
    ];

    return (
        <div className="faq-container">
            <h1 className="faq-title">FAQs</h1>
            {faqs.map((section, index) => (
                <div key={index} className="faq-section">
                    <h2 className="faq-category" style={{color:"#4285F4"}}>{section.category}</h2>
                    <div className="faqQuestions">
                        {section.questions.map((faq, i) => (
                            <details key={i} className="faq-item">
                                <summary className="faq-question">{faq.question}</summary>
                                <p className="faq-answer">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FAQ;