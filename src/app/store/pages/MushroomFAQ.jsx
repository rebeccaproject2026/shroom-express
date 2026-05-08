import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const faqs = [
    { q: "What are psilocybin mushrooms?", a: "Psilocybin mushrooms are fungi that contain psilocybin, a naturally occurring psychedelic compound. When ingested, psilocybin is converted to psilocin in the body, which interacts with serotonin receptors in the brain to produce altered states of consciousness." },
    { q: "How do psilocybin mushrooms affect the brain?", a: "Psilocybin primarily affects the serotonin system, particularly the 5-HT2A receptors. It increases neural connectivity across brain regions that don't normally communicate, leading to altered perception, mood changes, and introspective experiences." },
    { q: "Are psilocybin mushrooms addictive?", a: "Research indicates that psilocybin mushrooms have a very low potential for addiction. They do not cause physical dependence, and tolerance builds rapidly, making repeated use in short periods ineffective." },
    { q: "What is the typical duration of a psilocybin mushroom trip?", a: "A typical psilocybin experience lasts between 4 to 6 hours, with effects beginning 20–60 minutes after ingestion. The peak usually occurs around 2–3 hours in, followed by a gradual comedown." },
    { q: "Can psilocybin mushrooms be used to treat depression?", a: "Clinical research, including studies from Johns Hopkins and Imperial College London, has shown promising results for psilocybin-assisted therapy in treating treatment-resistant depression. However, this should only be done under professional medical supervision." },
    { q: "What is microdosing, and how does it relate to psilocybin?", a: "Microdosing involves taking sub-perceptual doses of psilocybin (typically 0.1–0.3g) every few days. Many users report improved focus, creativity, and mood without experiencing full psychedelic effects." },
    { q: "Are there risks associated with psilocybin mushroom use?", a: "Risks include psychological distress, anxiety, and in rare cases, triggering latent mental health conditions. Set, setting, and dosage are critical factors. Those with a personal or family history of psychosis should avoid use." },
    { q: "How should one prepare for a psilocybin experience?", a: "Preparation includes choosing a safe, comfortable environment, having a trusted sober sitter if possible, setting a clear intention, avoiding mixing with other substances, and ensuring you are in a stable mental and physical state." },
    { q: "Can psilocybin mushrooms cause hallucinations?", a: "Yes, at moderate to high doses psilocybin can cause visual and auditory hallucinations, as well as synesthesia (mixing of senses). These effects are dose-dependent and typically resolve as the compound is metabolized." },
    { q: "Is it legal to possess psilocybin mushrooms?", a: "Legality varies by jurisdiction. In Canada, psilocybin remains a controlled substance under the Controlled Drugs and Substances Act, though exemptions exist for medical and research purposes. Always check your local laws." },
    { q: "What is the difference between psilocybin and psilocin?", a: "Psilocybin is the prodrug found in mushrooms. After ingestion, the body converts it to psilocin through dephosphorylation. Psilocin is the active compound that crosses the blood-brain barrier and produces psychedelic effects." },
    { q: "Can psilocybin mushrooms be toxic?", a: "Psilocybin mushrooms themselves have very low physiological toxicity. The primary danger is misidentification — confusing them with toxic look-alike species. Always source from reputable, verified suppliers." },
    { q: "How are psilocybin mushrooms consumed?", a: "Common methods include eating dried mushrooms directly, brewing them as a tea, grinding into capsules, or incorporating into food. Tea is often preferred as it reduces nausea and allows for more controlled onset." },
    { q: "What is ego dissolution?", a: "Ego dissolution is a phenomenon at high doses where the sense of a separate self temporarily dissolves. Users describe merging with their surroundings or experiencing a sense of unity. It is often described as profoundly meaningful." },
    { q: "Can psilocybin mushrooms treat anxiety?", a: "Studies show psilocybin-assisted therapy may significantly reduce anxiety, particularly in patients with life-threatening illnesses. Research at NYU and Johns Hopkins has demonstrated lasting reductions in anxiety after just one or two sessions." },
    { q: "What are the physical effects of psilocybin mushrooms?", a: "Physical effects can include dilated pupils, a slight increase in heart rate and blood pressure, nausea, tremors, and yawning. Some users also report a feeling of heaviness or lightness in the limbs, and changes in sensory perception such as enhanced colors or movement in stationary objects." },
    { q: "How does psilocybin affect creativity?", a: "Many users report enhanced creativity and divergent thinking during and after a psilocybin experience. Research suggests that by increasing neural connectivity and allowing different parts of the brain to communicate more freely, psilocybin can help break rigid thought patterns and foster novel perspectives." },
    { q: "Can psilocybin mushrooms help with addiction?", a: "Promising clinical trials suggest that psilocybin-assisted therapy can be highly effective in treating addictions to nicotine, alcohol, and other substances. It is thought to work by promoting neuroplasticity and providing a psychological 'reset' that helps individuals break addictive cycles." },
    { q: "What is the onset time for psilocybin effects?", a: "Effects typically begin 20 to 60 minutes after ingestion, depending on the method of consumption and whether it's taken on an empty stomach. Peak effects usually occur between 2 to 3 hours, with the entire experience lasting around 4 to 6 hours." },
    { q: "Are there any long-term effects?", a: "Most users do not experience negative long-term physical effects. In fact, many report lasting positive changes in personality traits like openness. However, rare conditions like HPPD (Hallucinogen Persisting Perception Disorder) can occur, and those with a history of psychosis should be extremely cautious." },
    { q: "What is the default mode network (DMN)?", a: "The DMN is a network of brain regions that is most active when we are self-reflecting or mind-wandering. It is closely tied to our sense of 'ego'. Psilocybin temporarily reduces activity and connectivity within the DMN, which is believed to facilitate the experience of ego dissolution and mystical states." },
    { q: "Can psilocybin mushrooms cause flashbacks?", a: "While 'flashbacks' (HPPD) are rare, some individuals may experience brief recurrences of visual distortions long after the substance has left their system. This is more common with frequent, high-dose use and typically diminishes over time without further psychedelic use." },
    { q: "How does psilocybin compare to LSD?", a: "Both are classic psychedelics, but psilocybin has a shorter duration (4-6 hours) compared to LSD (8-12 hours). Users often describe the psilocybin experience as more 'earthy' and 'emotional', whereas LSD is often felt as more 'electric', 'stimulating', and 'analytical'." },
    { q: "Is it safe to mix psilocybin with other substances?", a: "Mixing psilocybin with other substances, including alcohol and certain medications (like SSRIs), is generally discouraged as it can lead to unpredictable effects or reduced efficacy. Always consult with a healthcare professional regarding potential interactions with existing medications." },
    { q: "Can psilocybin mushrooms be used spiritually?", a: "Psilocybin has been used for thousands of years by indigenous cultures for spiritual and healing purposes. Many modern users report profound mystical experiences that provide a sense of interconnectedness with nature, humanity, and the universe." },
    { q: "How many species of psilocybin mushrooms exist?", a: "There are over 200 species of mushrooms known to contain psilocybin. They are found on every continent except Antarctica. The most common species for cultivation and use is Psilocybe cubensis, though others like P. semilanceata grow widely in the wild." },
    { q: "Do drug tests detect psilocybin?", a: "Standard employment drug tests (like the 5-panel or 10-panel tests) do not typically screen for psilocybin. However, it can be detected in specialized tests for about 24 hours in blood and up to 3 days in urine after consumption." },
    { q: "What is the history of psilocybin mushroom use?", a: "Psilocybin mushrooms have a rich history, with evidence of use in ritual and religious contexts dating back thousands of years in Mesoamerica. They were brought to global attention in the 1950s by R. Gordon Wasson and have since become a central focus of both counterculture and modern neuroscience." },
    { q: "Who should avoid psilocybin?", a: "Individuals with a personal or family history of psychosis, schizophrenia, or bipolar disorder should avoid psilocybin. It is also generally recommended that pregnant or breastfeeding women, and those with serious heart conditions, consult with medical professionals before any psychedelic use." },
    { q: "How does psilocybin affect time perception?", a: "Psilocybin often causes significant alterations in time perception. Minutes can feel like hours, or time may seem to stop entirely. This phenomenon is linked to changes in the brain's integration of sensory information and internal biological clocks during the experience." },
    { q: "Can psilocybin be used recreationally?", a: "While often associated with recreational use, many users approach psilocybin with a focus on personal insight or spiritual exploration. Regardless of the intent, safety precautions regarding dosage, set, and setting remain critical for a positive experience." },
    { q: "What is 'set and setting'?", a: "'Set' refers to your internal state (mindset, expectations, and mood), while 'setting' refers to the physical and social environment. Together, they are considered the most important factors in determining the quality and safety of a psychedelic experience." },
    { q: "Can psilocybin mushrooms be cultivated at home?", a: "In many jurisdictions, cultivating psilocybin mushrooms is illegal even if the spores themselves are legal to possess. However, the technology and information for home cultivation are widely available. Always research the specific laws in your area before attempting cultivation." },
    { q: "Can psilocybin help with PTSD?", a: "Emerging research suggests that psilocybin, when used in a therapeutic setting, may help individuals with PTSD process traumatic memories by reducing fear responses and increasing emotional flexibility. Several clinical trials are currently investigating this potential." },
    { q: "How does psilocybin affect empathy?", a: "Many users report increased feelings of empathy and social connectedness during and after using psilocybin. Research indicates it may temporarily enhance emotional empathy and reduce the processing of social exclusion in the brain." },
    { q: "Should you fast before taking mushrooms?", a: "Many users prefer to fast for 4-6 hours before consuming mushrooms to reduce potential nausea and ensure a consistent onset. A light, healthy meal several hours before is often recommended to maintain energy levels." },
    { q: "Can it be combined with therapy?", a: "Yes, psilocybin-assisted therapy is a structured approach where the substance is used as a tool within a broader therapeutic process. This typically involves preparation sessions, a supervised dosing session, and integration sessions to process the experience." },
    { q: "Is psilocybin research ongoing?", a: "Yes, we are currently in a 'psychedelic renaissance' with hundreds of clinical trials and research studies ongoing globally. Institutions like Johns Hopkins, Imperial College London, and NYU are leading the way in exploring its medical and psychological applications." },
    { q: "Does it increase neuroplasticity?", a: "Research has shown that psilocybin can stimulate the growth of new neural connections (synaptogenesis) and increase the 'plasticity' of the brain. This may explain its long-lasting effects on mood and behavior after even a single dose." },
    { q: "Are there drug interactions?", a: "Psilocybin can interact with various medications, particularly SSRIs and other antidepressants, which may reduce its effects or increase the risk of serotonin syndrome. It is vital to consult with a healthcare provider before mixing psilocybin with any prescription medication." },
    { q: "How does psilocybin help in end-of-life care?", a: "Clinical trials have shown that psilocybin can significantly reduce end-of-life anxiety and depression in patients with terminal illnesses. It often helps patients achieve a sense of peace, acceptance, and a changed perspective on death." },
    { q: "Can psilocybin be used for personal growth?", a: "Many people use psilocybin for 'the betterment of well people,' seeking increased self-awareness, creativity, and a deeper understanding of their own thought patterns and behaviors. It can serve as a powerful catalyst for personal development." },
    { q: "What's the safest environment to use psilocybin?", a: "The safest environment is typically a quiet, comfortable, and familiar space where you won't be interrupted. Having a sober, trusted 'trip sitter' present is highly recommended, especially for high doses or first-time experiences." },
    { q: "Are there signs of a 'bad trip' starting?", a: "Signs can include rising anxiety, physical discomfort, repetitive negative thought loops, or a sense of impending doom. If this happens, it's helpful to change the music, move to a different room, or focus on deep, steady breathing." },
    { q: "What tools help during integration after a trip?", a: "Effective integration tools include journaling, meditation, creative expression (like drawing or music), talking with a therapist or trusted friend, and spending time in nature. The goal is to incorporate the insights gained into your daily life." }
];

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-[#FAFAFA] transition-colors"
            >
                <span className="text-[#181211] font-medium text-sm sm:text-base pr-4">{question}</span>
                <Icon
                    icon={open ? "mdi:minus" : "mdi:plus"}
                    width={20}
                    className="text-[#181211] shrink-0"
                />
            </button>
            {open && (
                <div className="px-6 pb-5 bg-white">
                    <p className="text-[#636363] text-sm leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
};

const MushroomFAQ = () => {
    return (
        <div className="w-full bg-[#F8F6F6] font-sans min-h-screen py-12 md:py-16 px-6 sm:px-10 lg:px-20">
            <div className="max-w-[1700px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <span className="text-[#E93E2B] text-sm md:text-base font-extrabold uppercase mb-3 block">FAQ</span>
                    <h1 className="text-[#181211] font-extrabold text-4xl tracking-tight mb-2.5">
                        Shroom Express FAQ Psilocybin Mushrooms
                    </h1>
                    <p className="text-[#636363] text-sm sm:text-base leading-relaxed">
                        At Shroom Express, we understand that curiosity and safety go hand-in-hand when it comes to psilocybin mushrooms.
                        That's why we've compiled the top 50 real questions asked daily by our community. Whether you're exploring microdosing,
                        curious about effects, or want clarity on legal and shipping details, this FAQ section is built for you. With clear,
                        straightforward answers, we aim to support both first-time users and experienced psychonauts. Our team constantly updates
                        this section to reflect the latest insights and concerns around psilocybin. Browse below and get trusted answers to help
                        guide your journey with confidence and peace of mind.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-3">
                    {faqs.map((item, idx) => (
                        <FAQItem key={idx} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MushroomFAQ;
