import React, { useEffect, useState } from 'react';
import './Articles.css';

const Articles = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top of page on mount
    }, []);

    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="articles-page">
            <h1 className="articles-heading">Mental Health Articles</h1>
            <div className="articles-grid">
                {articlesData.map((article) => (
                    <div className="article-card" key={article.id}>
                        <h2 style={{textAlign: "center" }}>{article.title}</h2>
                        <p style={{textAlign:"justify"}}>{article.excerpt}</p>
                        <button
                            className="read-more-btn"
                            onClick={() => handleReadMore(article)}
                        >
                            Read More
                        </button>
                    </div>
                ))}
            </div>

            {selectedArticle && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedArticle.title}</h2>
                        <pre>{selectedArticle.content}</pre>
                        <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const articlesData = [
    {
        id: 1,
        title: "The WHO Definition of Mental",
        excerpt:
            "Mental health is a state of mental well-being that enables people to cope with the stresses...",
        content: `The WHO states that mental health is “more than the absence of mental disorders.” Peak mental health is about managing active conditions and maintaining wellness and happiness.

The organization also emphasizes that preserving and restoring mental health is important at individual, community, and societal levels.

In the United States, the National Alliance on Mental Illness estimates that almost 1 in 5 adults experience mental health problems each year.

In 2021, an estimated 14.1 million adultsTrusted Source in the U.S., about 5.5% of the adult population, had a serious psychological condition, according to the National Institute of Mental Health (NIMH).`,
    },
    {
        id: 2,
        title: "Ten Top Tips for Good Sleep",
        excerpt:
            "Regularly getting a good night’s sleep is crucial to ensuring we enjoy good mental health...",
        content: `Regularly getting a good night’s sleep is crucial to ensuring we enjoy good mental health.\n
When we don’t get good sleep, it can contribute to various problems, including depression and anxiety. But it can sometimes feel hard to achieve amid the pressures of daily life. To help, we have come up with these top ten tips on how to get a good night’s sleep.

1. Tech-free bedtime
The bedroom should be somewhere that we associate with sleep. Where possible, you should try to remove distractions from your bedroom. It is better to watch TV, check social media and eat in another room. This will allow you to relax with no distractions in your bedroom.

Be mindful of the presence of gadgets and electronics, such as computers, phones, tablets and TVs. The backlit 'blue light' displays suppress melatonin production – the hormone that helps you sleep; the suppression of melatonin causes sleep disruption. You should stop using these devices two hours before you go to sleep to reduce their impact on your sleeping.

2. Prioritise managing physical symptoms
Anyone who has tried to get to sleep with a blocked nose or headache knows that physical health problems can stop you from getting a good night's sleep. It can be easy to forget minor symptoms, but you will thank yourself when night falls if you prioritise speaking to a pharmacist about appropriate medication for symptom management.

3. Light, sound and temperature
It may sound common sense, but too much light and background noise can prevent you from falling asleep or staying asleep. Eye masks or earplugs are wonderful investments for light and noise sources that you can’t control.

Temperature is also important, and if you share a bed with a partner with different temperature preferences, consider separate blankets or other solutions that compromise less sleep.

4. Dealing with worry
Thinking about sleeping too much or forcing yourself to sleep will only keep you awake. Learning how to relax your body and mind instead will help you get to sleep much more easily.

Progressive relaxation techniques can help you to relax and unwind at these times.

5. Foods that help and hinder
Eating rice, oats and dairy products can produce chemicals that increase our desire to sleep. As well as the obvious caffeine, in terms of food and drink to avoid, things high in sugar can keep you awake if consumed late in the day. A big meal after mid-evening can also stop you from sleeping.

6. Alcohol alert
Although it can make you feel tired and can help you get to sleep, alcohol often impairs the quality of your sleep and makes you more likely to wake up during the night as the effects wear off, and you may need to go to the toilet frequently or wake up dehydrated to drink water.

7. Time your exercise
Exercising regularly can help us sleep, helping to reduce anxiety and relieve stress. Exercising earlier in the day is better, as exercise increases the body’s adrenaline production, making it more difficult to sleep if done just before bedtime.

8. No napping!
If you have trouble sleeping, you may be tempted to catch up on sleep by napping. However, unless you’re feeling dangerously sleepy (while driving or operating machinery, for instance), this usually does more harm than good as it makes it more difficult to sleep at night.

If you feel tired during the day, get up and walk around, get some fresh air, or do something challenging for a short while, like a crossword or sudoku.

9. If you’re not tired, get up
If you’re finding it difficult to get to sleep, don't just lie there worrying. Get up for a while and drink (no sugar or caffeine, remember!). Try reading for a little while and go back to bed when you feel a bit sleepier.

10. Keep a sleep diary
Keeping a sleep diary to note the conditions when you went to bed the night before can be useful for letting you look back and see what has and what hasn’t worked for you. It also helps you to see how your sleep varies from night to night and might help you note sleep patterns.`,
    },
    {
        id: 3,
        title: "What advice would you give to someone lacking in motivation?",
        excerpt:
            "Lack of motivation is a feeling we may experience from time to time as individuals...",
        content: `Lack of motivation is a feeling we may experience from time to time as individuals. For people living with mental health problems, this can exacerbate this.

From meeting up with friends to starting a new project or engaging in a hobby we know and love, it can sometimes be hard to find the motivation to actively get involved with activities that are good for your mental health. This can become even harder when we are struggling with mental health problems. Tasks that may seem simple to others, such as having a shower or making breakfast, can become overwhelming.

So, we thought it would be a good idea to ask the general public for their top tips on overcoming a lack of motivation so we can share them with our online community. Read on to find out more about what the general public had to say.

Break tasks in to manageable chunks
Breaking tasks into smaller chunks leading up to the ultimate goal can help manage thoughts about the process. Focusing on the individual tasks needed to complete a project can help stay present and in the moment.
Even a crumb looks enormous if you're an ant or feel like one - Viv

Write down each positive thing you experience throughout the day
Many people feel that writing down positive things can be handy when aiming to stay hopeful when struggling emotionally, serving as a reminder of memorable moments. This can be motivating in itself.
Spend time watching or seeing good things - Krishnannarayanan

Give yourself credit for the small things you do
Notice the little things by praising yourself for each task completed - it can add up quickly! Practising mindfulness can also help you focus and appreciate every moment and the 'small' things you do, such as getting out of bed or brushing your teeth in the morning. Each evening, why don't you try noting three small wins that you have achieved that day, remembering that whatever you achieve, no matter how small, is always something to be proud of.
Take any opportunity to praise yourself and not focus on the things you haven't done but look at the things you have - Sharon

Have some 'me time'
Take time out to do more of what you love and enjoy. From sightseeing around your local city to spending time alone in a scenic park, taking time out to look after yourself can support your mental health and may provide some inspiration.
Put yourself as number one priority and do whatever it takes that you think will help to make you feel better - Linda

Be gentle with yourself
Accept the current state of how you feel, acknowledge the feeling and look for ways to reach out for support if needed. Practising self-care and being gentle with yourself can be a great help when experiencing a lack of motivation.
It's okay not to be okay all of the time.

Try to be present
Remaining present and in the moment can help to focus on the now, which may help when experiencing a lack of motivation. Whether it is walking your dog or trying new food, focusing on the present moment is good.
See our guide on How to look after your mental health using mindfulness for more.
Attend helpful events
Self-help books, courses and events are all tools that can support your knowledge of mental health - learning ways to improve your self-esteem or perhaps stay inspired may help when experiencing a lack of motivation.`,
    },
    {
        id: 4,
        title: "Relationships at work: our top tips for managers",
        excerpt:
            "Relationships and the workplace conjures up an image of stationery cupboard trysts and forms for HR that declare that two colleagues are ‘an item’...",
        content: `Relationships and the workplace conjures up an image of stationery cupboard trysts and forms for HR that declare that two colleagues are ‘an item’. 

We know that work that is challenging, rewarding and validating is one of the most valuable ways to improve our mental health. We also know that work-related stress, poor line management, badly managed change, bullying and discrimination quickly take a toll on our mental health.

Work gives us a purpose, a role, financial means and status. It also gives us social relationships, and, as this week’s report on 21st Century relationships shows, social contact may be as important a mediator of health outcomes as obesity or smoking.

Luckily, the principles of good management and good business practice are, by and large, principles which contribute to the development of a mentally healthy workplace.

So how do the top tips for healthy relationships apply to working life, and in particular to the line management relationship?

Give time
Time is money. Time is precious. There’s not enough time in the day. Time is a constant theme in modern workplaces. As managers, we are now under more pressure than ever to deliver, develop and to ensure delivery from our teams.

There has never been a more important time to create an environment in which people can succeed, and feel supported.

Top tips
Make time in your diary for staff to come to you or you to go to them - and chat.
You’ll be able to spot any problems earlier.
If you have an open-door policy, people who have concerns will feel more able to engage and sort problems.
Have regular, brief staff meetings with clear agendas.
Everybody likes to feel the pulse of the organisation and to feel connected to the work others are doing and the successes and challenges the team faces.
Make time for networking.
Keep a coffee slot free each week and use it to meet business contacts you haven’t seen for a while, to mentor others or be mentored.
Imagine supervision and appraisal processes not as a chore, but as a gift.
Authentic feedback is one of the best things you can give a member of staff. Set times in advance and never, ever deprioritise this in favour of another meeting.
Practice self-care.
Give time to yourself and time to your friends and family, no matter how committed to work you are.
Be present
We all recognise the pull of the smartphone vibrating on the table or the creeping thoughts of the next meeting.

It is key to focus on the task in hand, especially when that is investing in one-to-one time with colleagues, or attending a meeting or presentation.

Top tips
Try and turn your phone off.
There’s a difference between tweeting key points at a conference and writing emails on your iPhone throughout a staff meeting with your team. It shows, and it sends a message to the person you are with that they aren’t top priority.
You could consider phone-free sessions.
Try getting everyone to put all their devices in a box during work sessions.
If you find it difficult to focus and be present, work on toning your ’attention muscles’ to work on that.
Mindfulness is an evidence-based method for learning to recognise and appreciate what is happening as it happens, you can do a course or use an app.
If you are in a meeting and losing concentration, try grounding yourself to keep focus.
Place your feet flat on the floor, notice the feel of your feet in your shoes. Sit up straight. Notice your breath. If you find yourself becoming angry or frustrated, try the same technique and let the anger subside.
Try using a pen and paper to make notes.
You can always keep any sudden flashes of inspiration in the margins so they don’t get lost or distract you. If you do need to type during meetings go full screen, and disable notifications so you aren’t dragged into emails or social media.
Try and take a proper lunch break, and get outside.
A key aspect of being present in your work relationships is turning off and recharging. Alternatively, try a walking meeting. You will get some fresh air and pay more attention to the conversation you are having.`,
    },
    {
        id: 5,
        title: "Young people’s mental health is finally getting the attention it needs",
        excerpt:
            "Worldwide, at least 13% of people between the ages of 10 and 19 live with a diagnosed mental-health disorder, according to the latest State of the World’s Children report...",
        content: `Worldwide, at least 13% of people between the ages of 10 and 19 live with a diagnosed mental-health disorder, according to the latest State of the World’s Children report, published this week by the United Nations children’s charity UNICEF. It’s the first time in the organization’s history that this flagship report has tackled the challenges in and opportunities for preventing and treating mental-health problems among young people. It reveals that adolescent mental health is highly complex, understudied — and underfunded. These findings are echoed in a parallel collection of review articles published this week in a number of Springer Nature journals.

Anxiety and depression constitute more than 40% of mental-health disorders among young people (those aged 10–19). UNICEF also reports that, worldwide, suicide is the fourth most-common cause of death (after road injuries, tuberculosis and interpersonal violence) among adolescents (aged 15–19). In eastern Europe and central Asia, suicide is the leading cause of death for young people in that age group — and it’s the second-highest cause in western Europe and North America.


Collection: Promoting youth mental health

Sadly, psychological distress among young people seems to be rising. One study found that rates of depression among a nationally representative sample of US adolescents (aged 12 to 17) increased from 8.5% of young adults to 13.2% between 2005 and 20171. There’s also initial evidence that the coronavirus pandemic is exacerbating this trend in some countries. For example, in a nationwide study2 from Iceland, adolescents (aged 13–18) reported significantly more symptoms of mental ill health during the pandemic than did their peers before it. And girls were more likely to experience these symptoms than were boys.

Although most mental-health disorders arise during adolescence, UNICEF says that only one-third of investment in mental-health research is targeted towards young people. Moreover, the research itself suffers from fragmentation — scientists involved tend to work inside some key disciplines, such as psychiatry, paediatrics, psychology and epidemiology, and the links between research and health-care services are often poor. This means that effective forms of prevention and treatment are limited, and lack a solid understanding of what works, in which context and why.

This week’s collection of review articles dives deep into the state of knowledge of interventions — those that work and those that don’t — for preventing and treating anxiety and depression in young people aged 14–24. In some of the projects, young people with lived experience of anxiety and depression were co-investigators, involved in both the design and implementation of the reviews, as well as in interpretation of the findings.

Quest for new therapies
Worldwide, the most common treatment for anxiety and depression is a class of drug called selective serotonin reuptake inhibitors, which increase serotonin levels in the brain and are intended to enhance emotion and mood. But their modest efficacy and substantial side effects3 have spurred the study of alternative physiological mechanisms that could be involved in youth depression and anxiety, so that new therapeutics can be developed.


Mental health: build predictive models to steer policy

For example, researchers have been investigating potential links between depression and inflammatory disorders — such as asthma, cardiovascular disease and inflammatory bowel disease. This is because, in many cases, adults with depression also experience such disorders. Moreover, there’s evidence that, in mice, changes to the gut microbiota during development reduce behaviours similar to those linked to anxiety and depression in people4. That suggests that targeting the gut microbiome during adolescence could be a promising avenue for reducing anxiety in young people. Kathrin Cohen Kadosh at the University of Surrey in Guildford, UK, and colleagues reviewed existing reports of interventions in which diets were changed to target the gut microbiome. These were found to have had minimal effect on youth anxiety5. However, the authors urge caution before such a conclusion can be confirmed, citing methodological limitations (including small sample sizes) among the studies they reviewed. They say the next crop of studies will need to involve larger-scale clinical trials.`,
    },
];

export default Articles;