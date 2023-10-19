import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };

  const updateFeedback = type => {
    if (type == 'good') {
      setGood(good + 1);
    } else if (type == 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  const totalFeedback = Object.values(options).reduce(
    (total, value) => total + value,
    0
  );

  const percentage = (good / totalFeedback) * 100;
  const positiveFeedbackPercentage = totalFeedback ? Math.round(percentage) : 0;

  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        marginLeft: '40px',
      }}
    >
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={updateFeedback} />
      </Section>
      <Section title={'Statistics'}>
        {totalFeedback === 0 && <Notification message="There is no feedback" />}
        {totalFeedback > 0 && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        )}
      </Section>
    </div>
  );
};
